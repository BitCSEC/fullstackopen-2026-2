import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

describe('CreateBlogForm behaviour', () => {
    test('event handler is called when new blog is created', async () => {
        const mockHandler = vi.fn()

        render(<CreateBlogForm createBlog={mockHandler} />)

        const user = userEvent.setup()

        const titleInput = screen.getByLabelText('title')
        await user.type(titleInput, 'My Title')

        const authorInput = screen.getByLabelText('author')
        await user.type(authorInput, 'Me')

        const urlInput = screen.getByLabelText('url')
        await user.type(urlInput, 'http://localhost:3003/My-Blog')

        const button = screen.getByText('create')
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][0].title).toBe('My Title')
        expect(mockHandler.mock.calls[0][0].author).toBe('Me')
        expect(mockHandler.mock.calls[0][0].url).toBe('http://localhost:3003/My-Blog')
    })
})
