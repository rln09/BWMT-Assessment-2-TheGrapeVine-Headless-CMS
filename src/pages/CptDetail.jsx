// CptDetail — displays a single Custom Post Type entry.
//
// YOUR TASK:
// 1. Decide what fields from your CPT to display
// 2. If you used ACF (Advanced Custom Fields), your custom fields will be
//    in item.acf — e.g. item.acf.price, item.acf.date
// 3. Design the layout to suit your scenario

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ApiError from '../components/ApiError'

const API = import.meta.env.VITE_WP_API_URL
const CPT = import.meta.env.VITE_CPT_SLUG

function CptDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API}/${CPT}/${id}?_embed`)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const data = await response.json()
        setItem(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [id])

  if (loading) return <p className="loading">Loading...</p>
  if (error) return <ApiError error={error} context="custom post type entry" />
  if (!item) return <p className="error">Item not found.</p>

  const featuredImage = item._embedded?.['wp:featuredmedia']?.[0]?.source_url

  return (
    <article className="single-post">
      {/* TODO: Update link label to match your CPT name */}
      <Link to="/cpt" className="back-link">← Back to portfolio</Link>

      <h1>{item.title.rendered}</h1>

      {featuredImage && (
        <img src={featuredImage} alt={item.title.rendered} className="featured-image" />
      )}

      {/* TODO: Display your CPT's custom fields here */}
      {/* If using ACF: item.acf.your_field_name */}
      {/* If using default content: item.content.rendered */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: item.content.rendered }}
      />
    </article>
  )
}

export default CptDetail
