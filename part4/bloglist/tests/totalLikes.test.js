import list_helper from '../utils/list_helper.js'

import testdata from './testdata.js'

describe('total likes', () => {
  const blogs = testdata.blogs

  test('of empty list is zero', () => {
    const emptyBlogs = []

    const result = list_helper.totalLikes(emptyBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const singleBlog = [blogs[0]]
    const result = list_helper.totalLikes(singleBlog)
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const result = list_helper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})
