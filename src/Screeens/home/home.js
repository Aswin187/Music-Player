import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from '../../Components/sidebar';
import { setClientToken } from '../../spotify';
import Login from '../auth/login';
import Favorite from '../favorite/favorite';
import Feed from '../feed/feed';
import Library from '../library/library';
import Players from '../player/players';
import Trending from '../trendings/trendings';
import "./home.css";


function Home() {

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className='main-body'>

        <Sidebar />
        <Routes>
          <Route path='/library' element={<Library />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/trendings' element={<Trending />} />
          <Route path='/player' element={<Players />} />
          <Route path='/favorite' element={<Favorite />} />
        </Routes>
      </div>
    </Router>

  );
}

export default Home;