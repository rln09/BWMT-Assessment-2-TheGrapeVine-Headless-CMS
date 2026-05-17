import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className= "header-wrapper">
        <h1><Link to="/">The Grape Vine</Link></h1>
        <nav className="site-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/cpt">Events</Link></li>
            <li><Link to="/page/about">About</Link></li>
            <li><Link to="/page/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
      </div>
    </header>
  )
}

export default Header
