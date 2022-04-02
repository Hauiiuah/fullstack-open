import _ from 'lodash'

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return !blogs.length ? 0 : blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  let favBlog = blogs[0]
  blogs.map((blog) => {
    if (blog.likes > favBlog.likes) {
      favBlog = blog
    }
  })
  return favBlog
}

const maxValOfObject = (obj) => {
  const maxVal = Math.max(...Object.values(obj))
  const objKey = Object.keys(obj).find((key) => obj[key] === maxVal)

  return [objKey, maxVal]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authors = {}

  blogs.map((blog) => {
    if (authors[blog.author]) {
      authors[blog.author] += 1
    } else {
      authors[blog.author] = 1
    }
  })

  const [objKey, maxVal] = maxValOfObject(authors)
  return { author: objKey, blogs: maxVal }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authors = {}

  blogs.map((blog) => {
    if (authors[blog.author]) {
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  })

  const [objKey, maxVal] = maxValOfObject(authors)
  return { author: objKey, likes: maxVal }
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
