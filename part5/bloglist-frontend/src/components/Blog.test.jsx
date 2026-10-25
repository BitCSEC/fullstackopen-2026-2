import { getByText, render, screen } from "@testing-library/react"
import Blog from './Blog'
import { expect } from "vitest"

test('blog renders only title and author by default', () => {
    const blog = {
        title: 'myBlogPost',
        author: 'Me',
        url: 'http://localhost:3003/myBlogPost',
        likes: 10,
        user: {
            name: "Hernán Cisternas"
        }
    }

    const { container } = render(<Blog blog={blog} removeBlog={()=>{}} displayDelete={()=>{}} />)

    const element = screen.getByText('myBlogPost Me')
    expect(element).toBeDefined()

    const extraElement = container.querySelector('.extra')
    expect(extraElement).not.toBeVisible()
})
