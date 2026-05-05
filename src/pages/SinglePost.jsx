// SinglePost — fetches and displays one blog post by ID.
// The ID comes from the URL via React Router's useParams hook.

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ApiError from '../components/ApiError'

const API = import.meta.env.VITE_WP_API_URL

function SinglePost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API}/posts/${id}?_embed`)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) return <p className="loading">Loading post...</p>
  if (error) return <ApiError error={error} context="post" />
  if (!post) return <p className="error">Post not found.</p>

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url

  return (
    <article className="single-post">
      <Link to="/blog" className="back-link">← Back to blog</Link>

      <h1>{post.title.rendered}</h1>

      {featuredImage && (
        <img
          src={featuredImage}
          alt={post.title.rendered}
          className="featured-image"
        />
      )}

      {/* WordPress returns HTML content — dangerouslySetInnerHTML renders it correctly */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  )
}

export default SinglePost
