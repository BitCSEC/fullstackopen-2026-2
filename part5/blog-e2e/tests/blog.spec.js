const { test, expect, beforeEach, describe } = require('@playwright/test')
const { addBlog, loginUser, logoutUser } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:5173/api/testing/reset')
        await request.post('http://localhost:5173/api/users/', {
            data: {
                username: 'admin',
                name: 'Hernán',
                password: '12345'
            }
        })
        await request.post('http://localhost:5173/api/users/', {
            data: {
                username: 'user',
                name: 'Felipe',
                password: '67890'
            }
        })
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
    })

    describe('Login', () => {
        test('succeds with correct credentials', async ({ page }) => {
            await loginUser(page, 'admin', '12345')
            await expect(page.getByText('Hernán logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginUser(page, 'admin', 'wrong')
            await expect(page.getByText('wrong credentials')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginUser(page, 'admin', '12345')
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()
            await addBlog(page, 'Título', 'Autor', 'http://localhost:5173/Ejemplo')
            await expect(page.getByText('Título Autor')).toBeVisible()
        })

        describe('and there are some blogs', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'create new blog' }).click()
                await addBlog(page, 'Título', 'Autor', 'http://localhost:5173/Ejemplo')
                await addBlog(page, 'Title', 'Author', 'http://localhost:5173/Example')
            })

            test('they can be liked', async ({ page }) => {
                const first = page.getByText('Título Autor')
                await first.getByRole('button', { name: 'view' }).click()
                await first.getByRole('button', { name: 'like' }).click()
                await expect(first.getByText('likes 1')).toBeVisible()

                const second = page.getByText('Title Author')
                await second.getByRole('button', { name: 'view' }).click()
                await second.getByRole('button', { name: 'like' }).click()
                await expect(second.getByText('likes 1')).toBeVisible()

            })

            test('the user who posted them can delete them', async ({ page }) => {
                page.on('dialog', async dialog => {
                    expect(dialog.type()).toContain('confirm')
                    await dialog.accept()
                })

                await page.getByText('Título Autor').getByRole('button', { name: 'view' }).click()
                await page.getByRole('button', { name: 'delete' }).click()
                await expect(page.getByText('Título Autor')).toBeHidden()

                await page.getByText('Title Author').getByRole('button', { name: 'view' }).click()
                await page.getByRole('button', { name: 'delete' }).click()
                await expect(page.getByText('Title Author')).toBeHidden()
            })

            test('another user cannot delete them', async ({ page }) => {
                await logoutUser(page)
                await loginUser(page, 'user', '67890')

                const first = page.getByText('Título Autor')
                await first.getByRole('button', { name: 'view' }).click()
                await expect(first.getByRole('button', { name: 'delete' })).toBeHidden()

                const second = page.getByText('Title Author')
                await second.getByRole('button', { name: 'view' }).click()
                await expect(first.getByRole('button', { name: 'delete' })).toBeHidden()

            })
        })
    })
})
