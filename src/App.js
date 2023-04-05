import Header from './components/Header';
import Home from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Bag from './components/Bag/Bag';
import { Route, Routes } from 'react-router-dom';



function App() {



  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/bag' element={<Bag />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
