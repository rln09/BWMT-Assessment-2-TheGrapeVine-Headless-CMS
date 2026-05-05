// WpPage — fetches and displays a WordPress page by its slug.
// Used for standard pages like About and Contact.
//
// The slug comes from the URL — e.g. /page/about fetches the WordPress
// page with slug "about". Make sure your WordPress page slugs match.

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ApiError from '../components/ApiError'

const API = import.meta.env.VITE_WP_API_URL

function WpPage() {
  const { slug } = useParams()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPage = async () => {
      try {
        // WordPress pages API supports filtering by slug
        const response = await fetch(`${API}/pages?slug=${slug}`)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const data = await response.json()
        if (data.length === 0) throw new Error('Page not found')
        setPage(data[0])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [slug])

  if (loading) return <p className="loading">Loading...</p>
  if (error) return <ApiError error={error} context="page" />

  return (
    <article className="single-post">
      <h1>{page.title.rendered}</h1>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </article>
  )
}

export default WpPage
