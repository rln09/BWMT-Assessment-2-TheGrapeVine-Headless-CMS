// CptList — displays all entries of your Custom Post Type.
//
// YOUR TASK:
// 1. Set VITE_CPT_SLUG in your .env file to match your WordPress CPT slug
// 2. Design how each CPT entry should be displayed (see the TODO below)
// 3. The fetch pattern here is identical to BlogList — study that first
//
// The CPT slug must match what you registered in WordPress exactly.
// e.g. if you registered "menu-items", set VITE_CPT_SLUG=menu-items

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ApiError from '../components/ApiError'

const API = import.meta.env.VITE_WP_API_URL
const CPT = import.meta.env.VITE_CPT_SLUG

function CptList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API}/${CPT}?_embed`)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const data = await response.json()
        setItems(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  if (loading) return <p className="loading">Loading...</p>
  if (error) return <ApiError error={error} context="custom post type" />

  return (
    <section>
      {/* TODO: Replace "Portfolio" with your CPT name */}
      <h1>Portfolio</h1>

      {items.length === 0 ? (
        <p>No items found. Add entries to your Custom Post Type in WordPress first.</p>
      ) : (
        <div className="posts-grid">
          {items.map(item => (
            // TODO: Replace this with a component or layout appropriate to your CPT
            // Consider: what fields does your CPT have? How should each item look?
            <div key={item.id} className="post-card">
              <div className="post-card-body">
                <h2>{item.title.rendered}</h2>
                <Link to={`/cpt/${item.id}`} className="read-more">View details →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default CptList
