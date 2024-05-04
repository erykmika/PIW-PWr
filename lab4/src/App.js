import BrowseHotels from './components/Browse';
import Hotel from './components/Hotel';
import { Route, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase.utils';
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import logo from "./logo.svg"
import { signInWithGooglePopup } from './firebase.utils';
import LoginForm, { handleLogin } from './components/Login';
import RegistrationForm, { handleRegister } from './components/Registration';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AppLayout = () => {
  const [loggedUser, setloggedUser] = useState(false);

  const handleLogout = () => {
    signOut(auth);
    setloggedUser(null);
    alert("Logged out succesfully!");
  };

  const handleGoogle = () => {
    signInWithGooglePopup();
    setloggedUser(auth.currentUser);
  }

  // When auth data has already been fetched
  useEffect(() => {
    auth.authStateReady().then(() => {
      if (auth.currentUser) {
        setloggedUser(auth.currentUser);
      } else {
        setloggedUser(false);
      }
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setloggedUser(user);
      } else {
        setloggedUser(false);
      }
    });

  }, [])
  console.log(auth.currentUser);
  return (
    <>
      <nav className="navigation">
        <img className="logo" src={logo} alt="Logo" />
        <ul className="nav-links">
          {loggedUser && <li>{loggedUser["email"]} </li>}
          <li><a className="nav-link" href="/">Home</a></li>
          <li><a className="nav-link">Find offers</a></li>
          <li><a className="nav-link">Add new offers</a></li>
          <li><a className="nav-link">Favorites</a></li>
          <button className="important-btn" onClick={handleGoogle}>Sign in with Google</button>
          <a href="/register"><button className="manual-btn">Sign up</button></a>
          <a href="/login"><button className="manual-btn">Sign in</button></a>
          {loggedUser && <button className="important-btn" onClick={handleLogout}>Log out</button>}
        </ul>
        <button className="important-btn menu-btn">Menu</button>
      </nav>
      <Outlet context={[loggedUser, setloggedUser]} />
    </>
  )
}

// Build a router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="" element={<BrowseHotels />} />
      <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
      <Route path="/register" element={<RegistrationForm onRegister={handleRegister} />} />
      <Route path="/hotel/:slug" element={<Hotel />} />
    </Route>
  )
);

// Use the router
const App = () => <RouterProvider router={router} />

export default App;
