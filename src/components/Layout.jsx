import Header from './Header'
import Footer from './Footer'
import DotGrid from '../blocks/Backgrounds/DotGrid/DotGrid'
import { useLocation } from 'react-router-dom'

const Layout = ({ children, cartCount, wishlistCount }) => {
  const location = useLocation()

  // Routes where you don't want the layout
  const excludedRoutes = ['/login', '/profile', '/transactions']
  const isExcluded = excludedRoutes.includes(location.pathname)

  if (isExcluded) return children

  return (
    <div className="layout-wrapper">
      <DotGrid />
        <Header cartCount={cartCount} wishlistCount={wishlistCount} />
        <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
