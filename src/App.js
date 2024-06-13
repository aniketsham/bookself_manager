
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Booksearch from './booksearch';
import Bookself from './bookself';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Booksearch/>}  />
          <Route path="mybookself" element={<Bookself/>}  />
        </Routes>
      </BrowserRouter>
     

    </div>
  );
}

export default App;
