import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductItem from '../components/ProductItem';
import Skeleton from '../components/ProductItem/Skeleton';
import '../scss/app.scss';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const { sort, categoryId } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  console.log(categoryId);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://642abe2500dfa3b5474dceb5.mockapi.io/products?page=${currentPage}&limit=3&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sort.sortProperty}&order=${sort.order}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, currentPage]);

  const products = items
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <ProductItem key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Sort />
        <Categories value={categoryId} onClickCategory={(id) => onClickCategory(id)} />
      </div>
      <h2 className="content__title">Вся косметика</h2>
      <div className="content__items">{isLoading ? skeleton : products}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
