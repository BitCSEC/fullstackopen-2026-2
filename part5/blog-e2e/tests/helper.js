const addBlog = async (page, title, author, url) => {
    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill(author)
    await page.getByLabel('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByText(`${title} ${author}`).waitFor()
}

const loginUser = async (page, username, password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const logoutUser = async (page) => {
    await page.getByRole('button', { name: 'log out' }).click()
}

module.exports = { addBlog, loginUser, logoutUser }
