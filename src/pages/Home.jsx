import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import qs from 'qs';
import axios from 'axios';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import ProductItem from '../components/ProductItem';
import Skeleton from '../components/ProductItem/Skeleton';
import '../scss/app.scss';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const { sort, categoryId, currentPage } = useSelector((state) => state.filter);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = () => {
    setIsLoading(true);
    axios
      .get(
        `https://642abe2500dfa3b5474dceb5.mockapi.io/products?page=${currentPage}&limit=3&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sort.sortProperty}&order=${sort.order}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchProducts();
    }
    isSearch.current = false;
  }, [categoryId, sort, currentPage]);

  //Если изменили параметры
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find(
        (obj) => obj.sortProperty === params.sortProperty && obj.order === params.order,
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер, то проверяем URL-параметры и передаем в Redux
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        order: sort.order,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
