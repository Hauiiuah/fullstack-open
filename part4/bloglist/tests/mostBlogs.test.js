import list_helper from '../utils/list_helper.js'

import testdata from './testdata.js'

describe('mostBlogs', () => {
  const blogs = testdata.blogs

  test('empty list', () => {
    expect(list_helper.mostBlogs([])).toEqual({})
  })

  test('list with one blog', () => {
    const mostBlog = {
      author: 'Michael Chan',
      blogs: 1,
    }
    expect(list_helper.mostBlogs([blogs[0]])).toEqual(mostBlog)
  })

  test('list with multiple blogs', () => {
    const mostBlog = {
      author: 'Robert C. Martin',
      blogs: 3,
    }

    expect(list_helper.mostBlogs(blogs)).toEqual(mostBlog)
  })
})
