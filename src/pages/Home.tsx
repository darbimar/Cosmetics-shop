import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FilterSlice,  setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchProducts } from '../redux/slices/productsSlice';
import qs from 'qs';
import Categories from '../components/Categories';
import  Sort, { list } from '../components/Sort';
import ProductItem from '../components/ProductItem';
import Skeleton from '../components/ProductItem/Skeleton';
import '../scss/app.scss';
import Pagination from '../components/Pagination';
import NotFound from './NotFound';
import { RootState, useAppDispatch } from '../redux/store';

const Home = () => {
  const { sort, categoryId, currentPage, searchValue } = useSelector((state: RootState) => state.filter);
  const { items, status } = useSelector((state: RootState) => state.product);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onClickCategory = (id:number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getProducts = async () => {
    dispatch(
      fetchProducts({ sort, categoryId, currentPage }));
  };


  // Если изменили параметры
  useEffect(() => {
    if (window.location.search) {
      const params = (qs.parse(window.location.search.substring(1)) as unknown) as FilterSlice;
      const sort = list.find(
        (obj) => obj.sortProperty === params.sortProperty && obj.order === params.order,
      );

      dispatch(
        setFilters({
          ...params,
          sort
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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getProducts();
    }
    isSearch.current = false;
  }, [categoryId, sort, currentPage]);

  

  const products = items
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj: any) => <ProductItem key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);


  return (
    <div className="container">
      <div className="content__top">
        <Sort />
        <Categories value={categoryId} onClickCategory={(id: number) => onClickCategory(id)} />
      </div>
      <h2 className="content__title">Вся косметика</h2> 
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка :(</h2>
          <p>
            К сожалению, не удалось загрузить продукты. <br /> Попробуйте попытку позднее.
          </p>
        </div>
      ) : (
        <> 
          {status === 'loading' ? ( 
            skeleton
          ) : products.length > 0 ? (
          <>
            <div className="content__items">{status === 'loading' ? skeleton : products }</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} categoryId={categoryId}/>
          </> 
           ) : (<NotFound/> 
          )}
        </>
      )}
    </div>
  );
}

export default Home;
