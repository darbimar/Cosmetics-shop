import Header from './components/Header';
import Home from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Bag from './pages/Bag';
import SingleProduct from './pages/SingleProduct';
import { Route, Routes } from 'react-router-dom';
import { createContext } from 'react';
import MainLayout from './MainLayout';

export const SearchContext = createContext('');

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='not-found' element={<NotFound />} />
        <Route path='bag' element={<Bag />} />
        <Route path='product/:id' element={<SingleProduct />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
