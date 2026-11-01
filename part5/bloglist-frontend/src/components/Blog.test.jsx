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

    test('Blog information and the number of likes are displayed to unauthenticated users, buttons are not displayed', () => {
        const user = null

        const mockRemove = vi.fn()
        const mockDisplay = vi.fn((b, a = false) => {
            if (!user) {
                return false
            }

            if (a) {
                return true
            }

            return b.user.username === user.username
        })
        const mockLikesHandler = vi.fn()

        render(<Blog
            blog={blog}
            removeBlog={mockRemove}
            displayButton={mockDisplay}
            updateLikes={mockLikesHandler}
        />)

        const title = screen.getByText('My Blog Post - Hernán Cisternas')
        expect(title).toBeDefined()

        const url = screen.getByText('http://localhost:3003/My-Blog-Post')
        expect(url).toBeDefined()

        const likes = screen.getByText('likes 10', { exact: false })
        expect(likes).toBeDefined()

        const likeButton = screen.queryByRole('button', { name: 'like' })
        expect(likeButton).not.toBeInTheDocument()

        const deleteButton = screen.queryByRole('button', { name: 'delete' })
        expect(deleteButton).not.toBeInTheDocument()
    })

    test('Authenticated users who are not the blog’s creator are shown only the like button', () => {
        const user = {
            username: 'test01',
            name: 'Cosme Fulanito',
            blogs: []
        }

        const mockRemove = vi.fn()
        const mockDisplay = vi.fn((b, a = false) => {
            if (!user) {
                return false
            }

            if (a) {
                return true
            }

            return b.user.username === user.username
        })
        const mockLikesHandler = vi.fn()

        render(<Blog
            blog={blog}
            removeBlog={mockRemove}
            displayButton={mockDisplay}
            updateLikes={mockLikesHandler}
        />)


        const title = screen.getByText('My Blog Post - Hernán Cisternas')
        expect(title).toBeDefined()

        const url = screen.getByText('http://localhost:3003/My-Blog-Post')
        expect(url).toBeDefined()

        const likes = screen.getByText('likes 10', { exact: false })
        expect(likes).toBeDefined()

        const likeButton = screen.queryByRole('button', { name: 'like' })
        expect(likeButton).toBeDefined()

        const deleteButton = screen.queryByRole('button', { name: 'delete' })
        expect(deleteButton).not.toBeInTheDocument()
    })

    test('The blog’s creator is also shown the delete button', () => {
        const user = {
            username: 'admin',
            name: 'Hernán Cisternas',
            blogs: [
                '6ad2b416acbd05fffb924007',
                '6ad49efc4e9af1c93ed6e36c'
            ]
        }

        const mockRemove = vi.fn()
        const mockDisplay = vi.fn((b, a = false) => {
            if (!user) {
                return false
            }

            if (a) {
                return true
            }

            return b.user.username === user.username
        })
        const mockLikesHandler = vi.fn()

        render(<Blog
            blog={blog}
            removeBlog={mockRemove}
            displayButton={mockDisplay}
            updateLikes={mockLikesHandler}
        />)

        const title = screen.getByText('My Blog Post - Hernán Cisternas')
        expect(title).toBeDefined()

        const url = screen.getByText('http://localhost:3003/My-Blog-Post')
        expect(url).toBeDefined()

        const likes = screen.getByText('likes 10', { exact: false })
        expect(likes).toBeDefined()

        const likeButton = screen.queryByRole('button', { name: 'like' })
        expect(likeButton).toBeDefined()

        const deleteButton = screen.queryByRole('button', { name: 'delete' })
        expect(deleteButton).toBeVisible()
    })

    // test('clicking view button show url and likes', async () => {
    //     const mockRemove = vi.fn()
    //     const mockDisplay = vi.fn()
    //     const mockLikesHandler = vi.fn()
    //
    //     const { container } = render(<Blog
    //         blog={blog}
    //         removeBlog={mockRemove}
    //         displayButton={mockDisplay}
    //         updateLikes={mockLikesHandler}
    //     />)
    //
    //     const extraDetails = container.querySelector('.extra')
    //     expect(extraDetails).not.toBeVisible()
    //
    //     const user = userEvent.setup()
    //     const viewButton = screen.getByText('view')
    //     await user.click(viewButton)
    //
    //     expect(extraDetails).toBeVisible()
    // })

    test('clicking likes twice calls event handler twice', async () => {
        const mockRemove = vi.fn()
        const mockDisplay = vi.fn(() => true)
        const mockLikesHandler = vi.fn(() => blog)

        render(<Blog
            blog={blog}
            removeBlog={mockRemove}
            displayButton={mockDisplay}
            updateLikes={mockLikesHandler}
        />)

        const user = userEvent.setup()
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockLikesHandler.mock.calls).toHaveLength(2)
    })
})
