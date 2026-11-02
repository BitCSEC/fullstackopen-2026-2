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
        await request.post('http://localhost:5173/api/testing/populate')
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await page.getByRole('link', { name: 'login' }).click()
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
    })

    describe('Login', () => {
        test('succeds with correct credentials', async ({ page }) => {
            await loginUser(page, 'admin', '12345')
            await expect(page.getByRole('heading', 'blogs')).toBeVisible()
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
            await addBlog(page, 'Título', 'Autor', 'http://localhost:5173/Ejemplo')
            await expect(page.getByText('Título by Autor')).toBeVisible()
        })

        describe('and there are some blogs', () => {
            beforeEach(async ({ page }) => {
                await addBlog(page, 'Título', 'Autor', 'http://localhost:5173/Ejemplo')
                await addBlog(page, 'Title', 'Author', 'http://localhost:5173/Example')
            })

            test('they can be liked', async ({ page }) => {
                await page.getByRole('link', { name: 'Título by Autor' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText('likes 1')).toBeVisible()

                await page.getByRole('link', { name: 'blogs' }).click()

                await page.getByRole('link', { name: 'Title by Author' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText('likes 1')).toBeVisible()

            })

            test('the user who posted them can delete them', async ({ page }) => {
                page.on('dialog', async dialog => {
                    expect(dialog.type()).toContain('confirm')
                    await dialog.accept()
                })

                await page.getByRole('link', { name: 'Título by Autor' }).click()
                await page.getByRole('button', { name: 'delete' }).click()
                await expect(page.getByText('Título by Autor')).toBeHidden()

                await page.getByRole('link', { name: 'Title by Author' }).click()
                await page.getByRole('button', { name: 'delete' }).click()
                await expect(page.getByText('Title by Author')).toBeHidden()
            })

            test('another user cannot delete them', async ({ page }) => {
                await logoutUser(page)
                await loginUser(page, 'user', '67890')

                await page.getByRole('link', { name: 'Título by Autor' }).click()
                await expect(page.getByRole('button', { name: 'delete' })).toBeHidden()

                await page.getByRole('link', { name: 'blogs' }).click()

                await page.getByRole('link', { name: 'Title by Author' }).click()
                await expect(page.getByRole('button', { name: 'delete' })).toBeHidden()
            })
        })
    })
    describe('Blogs are sorted', () => {
        beforeEach(async ({ page }) => {
            await loginUser(page, 'admin', '12345')
        })

        test('in descending order number of likes', async ({ page }) => {
            await page.getByRole('listitem').first().waitFor({ state: 'visible' });
            const likes = []

            for (const text of await page.getByRole('listitem').allTextContents()) {
                await page.getByRole('link', { name: text }).click()
                const blogLikes = await page.getByText(/likes \d+/).textContent()
                likes.push(Number(blogLikes.match(/\d+/)[0]))
                await page.goBack()
            }

            expect(likes).toEqual(likes.toSorted((a, b) => b - a))
        })
    })
})
