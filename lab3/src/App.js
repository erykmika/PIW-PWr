import './App.css';
import hotels from './data';
import { useState } from 'react';
import BrowseHotels from './components/Browse';
import { Outlet } from 'react-router-dom';
import Hotel from './components/Hotel';
import logo from "./logo.svg"
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';


const AppLayout = () => {
  const [hotelData, setHotelData] = useState(hotels);
  return (
    <>
      <nav className="navigation">
        <img className="logo" src={logo} alt="Logo" />
        <ul className="nav-links">
          <li><a className="nav-link" href="/">Home</a></li>
          <li><a className="nav-link">Find offers</a></li>
          <li><a className="nav-link">Add new offers</a></li>
          <li><a className="nav-link">Favorites</a></li>
          <button className="important-btn">Log out</button>
        </ul>
        <button className="important-btn menu-btn">Menu</button>
      </nav>
      <Outlet context={[hotelData, setHotelData]} />
    </>
  )
}

// Build a router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="" element={<BrowseHotels />} />
      <Route path="/hotel/:slug" element={<Hotel />} />
    </Route>
  )
);

// Use the router
const App = () => <RouterProvider router={router} />

export default App;
