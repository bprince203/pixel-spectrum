import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Category from './pages/Category';
import CategoryDetails from './components/CategoryDetails';
import Photo from './pages/Photo';
import PhotoDetails from './components/PhotoDetails';
import Search from './pages/Search';
import ProtectedRoute from './pages/ProtectedRoute'
import SideNav from './components/SideNav';
import Post from './pages/Post';
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  // Check if the current route contain /dashboard
  const isDashboardRoute = window.location.pathname.startsWith('/dashboard');

  // Don't render Navbar on /dashboard route
  const renderNavbar = !isDashboardRoute;

  return (
    <Router>
      {renderNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="category/:catname" element={<CategoryDetails />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="photo/:id" element={<PhotoDetails />} />
        <Route path="search" element={<Search />}>
          <Route path=":keyword" element={<h1>Hello</h1>} />
        </Route>
        <Route path="/dashboard/" element={<ProtectedRoute/>}>
          <Route index element={
          <>
          <SideNav/>
          <div className="dashboard-main bg-yellow-600 w-[calc(100%-300px)] left-[300px] relative">
            Hello
          </div>
          </>}/>
          <Route path='users' element={<SideNav/>}/>
          <Route path='posts' element={<Post/>}/>
          <Route path='settings' element={<SideNav/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function NotFound() {
  return (
    <div>
      <h1>
        404 ERROR <Link to="/" className="text-blue-700">GO TO HOME </Link>
      </h1>
    </div>
  );
}

export default App;
