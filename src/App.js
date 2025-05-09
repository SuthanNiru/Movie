import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from './components/navbar';
import MovieDetails from './components/MovieDetails';
import TrendingMovies from './components/TrendingMovies';
import Favourites from './components/Favourites';
import Trailers from './components/Trailers';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <> 
      <Router>
       <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<MovieDetails />} />
          <Route path="/trendingmovies" element={<TrendingMovies />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/trailers" element={<Trailers />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
       
        </Routes>
      </Router>
    </>
  );
}

export default App;
