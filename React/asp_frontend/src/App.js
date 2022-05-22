import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Kategoriak from './pages/Kategoriak';
import Uj from './pages/Uj';
import Modositas from './pages/Modositas';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Kategóriák</Link>
          </li>
          <li>
            <Link to="Uj.js">Új</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Kategoriak />}></Route>
          <Route path="Uj.js" element={<Uj />}></Route>
          <Route path="Modositas.js/:id" element={<Modositas />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
