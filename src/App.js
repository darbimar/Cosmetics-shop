import Header from './components/Header';
import Home from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Bag from './components/Bag/Bag';
import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';

export const SearchContext = createContext('');

function App() {


  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">

      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='/bag' element={<Bag />} />
            <Route path='*' element={<Home />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>

  );
}

export default App;
