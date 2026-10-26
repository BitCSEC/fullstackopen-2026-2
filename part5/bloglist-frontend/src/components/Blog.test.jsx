import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component behaviour', () => {
    const blog = {
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

    test('blog shows only title and author by default', () => {
        const mockRemove = vi.fn()
        const mockDisplay = vi.fn()
        const mockLikesHandler = vi.fn()

        const { container } = render(<Blog
            blog={blog}
            removeBlog={mockRemove}
            displayDelete={mockDisplay}
            updateLikes={mockLikesHandler}
        />)

        const element = screen.getByText('My Blog Post Hernán Cisternas')
        expect(element).toBeDefined()

        const extraDetails = container.querySelector('.extra')
        expect(extraDetails).not.toBeVisible()
    })

    test('clicking view button show url and likes', async () => {
        const mockRemove = vi.fn()
        const mockDisplay = vi.fn()
        const mockLikesHandler = vi.fn()

        const { container } = render(<Blog
            blog={blog}
            removeBlog={mockRemove}
            displayDelete={mockDisplay}
            updateLikes={mockLikesHandler}
        />)

        const extraDetails = container.querySelector('.extra')
        expect(extraDetails).not.toBeVisible()

        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        expect(extraDetails).toBeVisible()

    })

    test('clicking likes twice calls event handler twice', async () => {
        const mockRemove = vi.fn()
        const mockDisplay = vi.fn()
        const mockLikesHandler = vi.fn(() => blog)

        render(<Blog
            blog={blog}
            removeBlog={mockRemove}
            displayDelete={mockDisplay}
            updateLikes={mockLikesHandler}
        />)    

        const user = userEvent.setup()
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockLikesHandler.mock.calls).toHaveLength(2)
    })
})
