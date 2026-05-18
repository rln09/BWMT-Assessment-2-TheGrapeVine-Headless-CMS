import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import ApiError from '../components/ApiError';

const API = import.meta.env.VITE_WP_API_URL;
const CPT = import.meta.env.VITE_CPT_SLUG;

function Home() {
  const [homePage, setHomePage] = useState(null);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [pageRes, eventsRes, postsRes] = await Promise.all([
          // ✅ FIX: fetch by slug (no more ID, no Kubio dependency)
          fetch(`${API}/pages?slug=home&_embed`),

          fetch(`${API}/${CPT}?_embed&per_page=3`),

          fetch(`${API}/posts?_embed&per_page=3`)
        ]);

        if (!pageRes.ok) throw new Error(`Page error: ${pageRes.status}`);
        if (!eventsRes.ok) throw new Error(`Events error: ${pageRes.status}`);
        if (!postsRes.ok) throw new Error(`Posts error: ${postsRes.status}`);

        const pageData = await pageRes.json();
        const eventsData = await eventsRes.json();
        const postsData = await postsRes.json();

        // ✅ slug query returns array → take first item
        setHomePage(pageData?.[0] || null);
        setFeaturedEvents(eventsData || []);
        setLatestPosts(postsData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading">Loading The Grape Vine experience...</p>
      </div>
    );
  }

  if (error) {
    return <ApiError error={error} context="home page content" />;
  }

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="hero">
        <div className="hero-content">

          {/* ALL CONTENT FROM WORDPRESS */}
          {homePage ? (
            <>
              <h1>{homePage.title.rendered}</h1>

              <div
                dangerouslySetInnerHTML={{
                  __html: homePage.content.rendered
                }}
              />
            </>
          ) : (
            <p>No homepage content found.</p>
          )}
        </div>
      </section>

      {/* ========== BLOG POSTS ========== */}
      <section className="latest-posts-section">
        <div className="container">
          <h2>Latest from Our Blog</h2>

          {latestPosts.length === 0 ? (
            <p>No blog posts found.</p>
          ) : (
            <div className="posts-grid">
              {latestPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========== EVENTS ========== */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Events</h2>

          {featuredEvents.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <div className="events-grid">
              {featuredEvents.map(event => (
                <div key={event.id} className="event-card">

                  {event._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <img
                      src={event._embedded['wp:featuredmedia'][0].source_url}
                      alt={event.title.rendered}
                      className="event-image"
                    />
                  )}

                  <h3>{event.title.rendered}</h3>

                  <p>
                    {event.excerpt?.rendered
                      ?.replace(/<[^>]+>/g, '')
                      .slice(0, 120)}...
                  </p>

                  <Link to={`/cpt/${event.id}`}>
                    View Event →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;