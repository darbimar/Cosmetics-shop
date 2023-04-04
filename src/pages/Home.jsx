import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductItem from '../components/ProductItem';
import Skeleton from '../components/ProductItem/Skeleton';
import '../scss/app.scss';

function Home() {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://642abe2500dfa3b5474dceb5.mockapi.io/products').then((res) => {
        return res.json();
        }).then((json) => {
        setItems(json);
        setIsLoading(false);
        });
    }, []);


    return (
        <>
            <div className="content__top">
            <Sort />
            <Categories />

          </div>
          <h2 className="content__title">Вся косметика</h2>
          <div className="content__items">
            {
              isLoading ?
                [...new Array(6)].map((_, index) => (<Skeleton key={index} />))
                : items.map((obj) => (<ProductItem key={obj.id} {...obj} />
                ))
            }
          </div>
        </>
    );
}

export default Home;