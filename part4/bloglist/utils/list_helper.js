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

  const maxVal = Math.max(...Object.values(authors))
  const objKey = Object.keys(authors).find((key) => authors[key] === maxVal)
  return { author: objKey, blogs: maxVal }
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs }
