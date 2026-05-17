// Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import ApiError from '../components/ApiError';

const API = import.meta.env.VITE_WP_API_URL;
const CPT = import.meta.env.VITE_CPT_SLUG;

function Home() {
  // State for different data types
  const [homePage, setHomePage] = useState(null);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Fetch all three data sources in parallel for better performance
        const [pageRes, eventsRes, postsRes] = await Promise.all([
          fetch(`${API}/pages?slug=home`),           // Home page content
          fetch(`${API}/${CPT}?_embed&per_page=3`),  // Featured events (limit 3)
          fetch(`${API}/posts?_embed&per_page=3`)    // Latest blog posts (limit 3)
        ]);

        // Check for errors
        if (!pageRes.ok) throw new Error(`Page error: ${pageRes.status}`);
        if (!eventsRes.ok) throw new Error(`Events error: ${eventsRes.status}`);
        if (!postsRes.ok) throw new Error(`Posts error: ${postsRes.status}`);

        // Parse JSON responses
        const pageData = await pageRes.json();
        const eventsData = await eventsRes.json();
        const postsData = await postsRes.json();

        // Set state with fetched data
        setHomePage(pageData[0] || null);
        setFeaturedEvents(eventsData);
        setLatestPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading">Loading The Grape Vine experience...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return <ApiError error={error} context="home page content" />;
  }

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to The Grape Vine!</h1>
          <p className="hero-tagline">
            <h3>A venue designed for each occasion</h3>
          </p>
        </div>
      </section>

      {/* ========== WELCOME MESSAGE ========== */}
      <section className="welcome-section">
        <div className="container">
          {homePage ? (
            <>
              <h2>{homePage.title.rendered}</h2>
              <div 
                className="welcome-content"
                dangerouslySetInnerHTML={{ __html: homePage.content.rendered }}
              />
            </>
          ) : (
            <>
              <p>
                Our estate provides beautifully designed indoor and outdoor spaces suitable for weddings, corporate functions, private parties, celebrations, and seasonal events of all sizes.
                From elegant weddings to lively festivals, The Grape Vine offers a scenic and welcoming atmosphere designed to create lasting memories for every guest.
                We are committed to delivering personalized service, professional event coordination, and seamless experiences that make every occasion stress-free and memorable.
              </p>
              <p>
                <h3>Weddings Cermonies & Receptions</h3>
                Romantic vineyard ceremonies with scenic photo oppurtunities
              </p>
              <p>
              <h3>Private Celebrations</h3>
              Birthdays, anniversaries, and milestone events worth remembering.
              </p>
              <p>
              <h3>Corporate Events</h3>
              Professional yet inspiring spaces for meetings, retreats, and launches.
             </p>
             <p>
              <h3>Seasonal Experiences</h3>
              Wine tatings, harvest events, and outdoor gatherings. Each event is tailored to create a seamless blend of comfort, beauty, and elegance.
             </p>
            </>
          )}
        </div>
      </section>

      {/* ========== FEATURED EVENTS SECTION (CPT) ========== */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Events</h2>
          <p className="section-subtitle">Discover our most popular packages</p>
          
          {featuredEvents.length === 0 ? (
            <p className="no-content">No events found. Add events in WordPress first.</p>
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
                  <div className="event-card-body">
                    <h3>{event.title.rendered}</h3>
                    
                    <p className="event-excerpt">
                      {event.excerpt?.rendered?.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 120)}...
                    </p>
                    <Link to={`/cpt/${event.id}`} className="btn btn-outline">
                      View Event →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="section-footer">
            <Link to="/cpt" className="view-all">View All Events →</Link>
          </div>
        </div>
      </section>

      {/* ========== LATEST BLOG POSTS SECTION ========== */}
      <section className="latest-posts-section">
        <div className="container">
          <h2>Latest from Our Blog</h2>
          <p className="section-subtitle">Vineyard news, wedding tips, and more</p>
          
          {latestPosts.length === 0 ? (
            <p className="no-content">No blog posts found. Add posts in WordPress first.</p>
          ) : (
            <div className="posts-grid">
              {latestPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
          
          <div className="section-footer">
            <Link to="/blog" className="view-all">View All Posts →</Link>
          </div>
        </div>
      </section>

      {/* ========== CALL TO ACTION SECTION ========== */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Create Unforgettable Memories?</h2>
          <p>Contact us today to schedule a private tour of our vineyard venue.</p>
          <Link to="/page/contact" className="btn btn-primary btn-large">
            Inquire Now
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;

