import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductItem from '../components/ProductItem';
import Skeleton from '../components/ProductItem/Skeleton';
import '../scss/app.scss';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
    order: 'desc',
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://642abe2500dfa3b5474dceb5.mockapi.io/products?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=${sortType.order}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
      </div>
      <h2 className="content__title">Вся косметика</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <ProductItem key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}

export default Home;
