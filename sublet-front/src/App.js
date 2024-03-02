import './App.css';
import Home from './pages/Home';
import RoomInfo from './pages/RoomInfo';
import SearchSubletInfo from './pages/SearchSubletInfo';
import ReHome from './pages/ReHome';
import Booking from './pages/Booking';
import GuestInfo from './pages/GuestInfo.js'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CreateSubletInfo from './pages/Host/CreateSubletInfo.js';
import GuestRequest from './pages/GuestRequest.js';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/roominfo" element={<RoomInfo />} />
        <Route path="/SearchSubletInfo" element={<SearchSubletInfo />} />
        <Route path="/ReHome" element={<ReHome />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path='/Profile' element={<GuestInfo />} />
        <Route path='/Request' element={<GuestRequest />} />
        {/* test host page */}
        <Route path='/CreateSubletInfo' element={<CreateSubletInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
