import list_helper from '../utils/list_helper.js'
import testdata from './testdata.js'

describe('mostLikes', () => {
  const blogs = testdata.blogs

  test('empty array', () => {
    expect(list_helper.mostLikes([])).toEqual({})
  })

  test('single item', () => {
    const mostLikesBlog = {
      author: 'Michael Chan',
      likes: 7,
    }
    expect(list_helper.mostLikes([blogs[0]])).toEqual(mostLikesBlog)
  })

  test('full blog list', () => {
    const mostLikesBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }

    expect(list_helper.mostLikes(blogs)).toEqual(mostLikesBlog)
  })
})
