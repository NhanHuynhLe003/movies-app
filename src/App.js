
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import MovieDetail from './pages/MovieDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage key={'homepage'}/>}></Route>
        <Route path='/:id' element={<MovieDetail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
