import list_helper from '../utils/list_helper.js'

import testdata from './testdata.js'

describe('favoriteBlog', () => {
  const blogs = testdata.blogs

  test('empty bloglist returns empty object', () => {
    expect(list_helper.favoriteBlog([])).toEqual({})
  })

  test('single blog gets returned', () => {
    const singleBlog = [blogs[0]]
    expect(list_helper.favoriteBlog(singleBlog)).toEqual(singleBlog[0])
  })

  test('blog with most likes get returned', () => {
    const blogWithMostLikes = blogs[2]
    expect(list_helper.favoriteBlog(blogs)).toEqual(blogWithMostLikes)
  })
})
