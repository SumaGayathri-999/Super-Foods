import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Details from './Components/Details/Details';
import Favorites from './Components/Favorites/Favorites';
import Header from './Components/Header';

function App() {
  return (
      <BrowserRouter>
      <Header/>
        <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/details/:id" element={<Details/>} />
           <Route path="/favorites" element={<Favorites/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
