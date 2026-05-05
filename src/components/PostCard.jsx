import { Link } from 'react-router-dom'

function PostCard({ post }) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url

  // Strip HTML tags from the excerpt WordPress returns
  const excerpt = post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '').trim()

  return (
    <div className="post-card">
      {featuredImage && (
        <img src={featuredImage} alt={post.title.rendered} />
      )}
      <div className="post-card-body">
        <h2>{post.title.rendered}</h2>
        <p className="post-excerpt">{excerpt}</p>
        <Link to={`/post/${post.id}`} className="read-more">Read more →</Link>
      </div>
    </div>
  )
}

export default PostCard
