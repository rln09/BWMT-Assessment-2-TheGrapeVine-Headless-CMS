import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <div className="container">
        {/* TODO: Replace with your site name */}
        <h1><Link to="/">My Site</Link></h1>
        <nav className="site-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            {/* TODO: Update label and path to match your CPT */}
            <li><Link to="/cpt">Portfolio</Link></li>
            <li><Link to="/page/about">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
