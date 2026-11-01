import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import blogService from './services/blogs'
import { expect } from 'vitest'

vi.mock('./services/blogs', () => ({
    default: {
        getAll: vi.fn()
    }
}))

// This test is a replacement for the Blog unit test that checked if the blog's details were showed when the view button was pressed
test('clicking the blog link show it\'s details', async () => {
    const blog = {
        id: '6ad2b416acbd05fffb92400',
        title: 'My Blog Post',
        author: 'Hernán Cisternas',
        url: 'http://localhost:3003/My-Blog-Post',
        likes: 10,
        user: {
            username: 'admin',
            name: 'Hernán Cisternas',
            blogs: [
                '6ad2b416acbd05fffb924007',
                '6ad49efc4e9af1c93ed6e36c'
            ]
        }
    }

    blogService.getAll.mockResolvedValue([blog])

    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    )

    const user = userEvent.setup()
    const blogLink = await screen.findByRole('link', { name: 'My Blog Post by Hernán Cisternas' })
    await user.click(blogLink)

    const title = screen.getByText('My Blog Post - Hernán Cisternas')
    expect(title).toBeDefined()

    const url = screen.getByText('http://localhost:3003/My-Blog-Post')
    expect(url).toBeDefined()

    const likes = screen.getByText('likes 10', { exact: false })
    expect(likes).toBeDefined()
})
