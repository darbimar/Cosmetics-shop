import Header from './components/Header';
import Categories from './components/Categories';
import './scss/app.scss';
import Sort from './components/Sort';
import ProductItem from './components/ProductItem';
import products from './assets/products.json';
import { useEffect, useState } from 'react';



function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://642abe2500dfa3b5474dceb5.mockapi.io/products').then((res) => {
      return res.json();
    }).then((json) => {
      setItems(json);
    });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Sort />
            <Categories />

          </div>
          <h2 className="content__title">Вся косметика</h2>
          <div className="content__items">
            {
              items.map((obj) => (
                <ProductItem key={obj.id} {...obj} />
              ))
            }


          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
