const { test, expect, beforeEach, describe } = require('@playwright/test')

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
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
    })

    describe('Login', () => {
        test('succeds with correct credentials', async ({ page }) => {
            await page.getByLabel('username').fill('admin')
            await page.getByLabel('password').fill('12345')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Hernán logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByLabel('username').fill('admin')
            await page.getByLabel('password').fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('wrong credentials')).toBeVisible()
        })
    })
})
