import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <div className="container">
        {"The Grape Vine"}
        <h1><Link to="/">The Grape Vine</Link></h1>
        <nav className="site-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/cpt">Events</Link></li>
            <li><Link to="/about-us">About</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
