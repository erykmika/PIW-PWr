import './App.css';
import BrowseHotels from './Browse';
import Hotel from './Hotel';
import { Route, Routes } from 'react-router-dom';

// Create a router
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/hotel/:slug" element={<Hotel />} />
        <Route path="*" element={<Four04 />} />
      </Routes>
    </>
  );
};

function Four04() {
  return (
    <>
      <div>404</div>
    </>
  );
}

function Browse() {
  return (
    <>
      <BrowseHotels />
    </>
  );
}

export default App;
