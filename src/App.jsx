import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import SinglePost from './pages/SinglePost'
import CptList from './pages/CptList'
import CptDetail from './pages/CptDetail'
import WpPage from './pages/WpPage'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/cpt" element={<CptList />} />
          <Route path="/cpt/:id" element={<CptDetail />} />
          <Route path="/page/:slug" element={<WpPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
