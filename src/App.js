import Header from './components/Header';
import Home from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Bag from './components/Bag/Bag';
import { Outlet, Route, Routes } from 'react-router-dom';



function App() {



  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='/bag' element={<Bag />} />
            <Route path='*' element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>

  );
}

export default App;
