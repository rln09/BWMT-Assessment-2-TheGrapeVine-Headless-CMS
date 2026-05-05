// ApiError — distinguishes between "WordPress not reachable" and other API errors.
// Use this instead of a raw <p className="error"> whenever a fetch fails.

const API_URL = import.meta.env.VITE_WP_API_URL
const CPT_SLUG = import.meta.env.VITE_CPT_SLUG

const PLACEHOLDER_URL = 'http://your-site.local/wp-json/wp/v2'
const PLACEHOLDER_CPT = 'your-cpt-slug'

function ApiError({ error, context = 'content' }) {
  const isUnconfiguredUrl = !API_URL || API_URL === PLACEHOLDER_URL
  const isUnconfiguredCpt = !CPT_SLUG || CPT_SLUG === PLACEHOLDER_CPT

  if (isUnconfiguredUrl) {
    return (
      <div className="api-error api-error--setup">
        <h2>WordPress URL not configured</h2>
        <p>Your <code>.env</code> file is missing or hasn't been updated yet.</p>
        <ol>
          <li>Copy <code>.env.example</code> to <code>.env</code></li>
          <li>Replace <code>your-site.local</code> with your actual LocalWP site URL</li>
          <li>Restart the dev server (<code>npm run dev</code>)</li>
        </ol>
      </div>
    )
  }

  if (isUnconfiguredCpt && context.toLowerCase().includes('custom post type')) {
    return (
      <div className="api-error api-error--setup">
        <h2>Custom Post Type slug not configured</h2>
        <p><code>VITE_CPT_SLUG</code> in your <code>.env</code> is still set to the placeholder value.</p>
        <ol>
          <li>Open <code>.env</code></li>
          <li>Set <code>VITE_CPT_SLUG</code> to the slug you registered in WordPress (e.g. <code>menu-items</code>)</li>
          <li>Restart the dev server (<code>npm run dev</code>)</li>
        </ol>
      </div>
    )
  }

  const isNetworkError =
    error?.name === 'TypeError' || error?.message?.toLowerCase().includes('failed to fetch')

  const is404 = error?.message?.includes('404')

  if (isNetworkError) {
    return (
      <div className="api-error api-error--offline">
        <h2>WordPress is not connected</h2>
        <p>The React app cannot reach your WordPress backend.</p>
        <ul>
          <li>Check that LocalWP is running (green dot)</li>
          <li>Confirm <code>VITE_WP_API_URL</code> in your <code>.env</code> matches your LocalWP URL</li>
          <li>Try opening <code>{import.meta.env.VITE_WP_API_URL}</code> directly in your browser</li>
        </ul>
      </div>
    )
  }

  if (is404) {
    return (
      <div className="api-error api-error--missing">
        <h2>Content not found</h2>
        <p>The WordPress API returned a 404 for this {context}.</p>
        <ul>
          <li>If this is a Custom Post Type, check that <code>VITE_CPT_SLUG</code> matches what you registered in WordPress exactly</li>
          <li>If this is a page, check that the slug in the URL matches the page slug in WordPress</li>
          <li>Make sure the post type has REST API support enabled</li>
        </ul>
      </div>
    )
  }

  return (
    <div className="api-error">
      <h2>Something went wrong</h2>
      <p>{error?.message || 'An unexpected error occurred.'}</p>
    </div>
  )
}

export default ApiError
