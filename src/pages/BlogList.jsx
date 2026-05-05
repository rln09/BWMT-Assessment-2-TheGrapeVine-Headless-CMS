// BlogList — fetches all posts from WordPress and displays them.
// This is a complete reference implementation showing the fetch pattern.
// Study this before building your CPT components.

import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard'
import ApiError from '../components/ApiError'

const API = import.meta.env.VITE_WP_API_URL

function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // _embed includes featured media in a single request
        const response = await fetch(`${API}/posts?_embed&per_page=12`)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <p className="loading">Loading posts...</p>
  if (error) return <ApiError error={error} context="posts" />

  return (
    <section>
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <p>No posts found. Add some posts in WordPress first.</p>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogList
