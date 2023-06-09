import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';


export type SortItem = {
  name: string,
  sortProperty: string,
  order: string
}

type PopupClick = MouseEvent & {
  composedPath(): Node[]
};

export const list: SortItem[] = [
  { name: 'популярности ↑', sortProperty: 'rating', order: 'asc' },
  { name: 'популярности ↓', sortProperty: 'rating', order: 'desc' },
  { name: 'цене ↑', sortProperty: 'price', order: 'asc' },
  { name: 'цене ↓', sortProperty: 'price', order: 'desc' },
  { name: 'алфавиту ↑', sortProperty: 'title', order: 'asc' },
  { name: 'алфавиту ↓', sortProperty: 'title', order: 'desc' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.filter.sort);
  const sortRef = useRef<HTMLDivElement>(null);
  const [sortShowed, setSortShowed] = useState(false);

  function onClickSortItem(i: SortItem) {
    dispatch(setSortType(i));
    setSortShowed(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (!_event.composedPath().includes(sortRef.current)) {
        setSortShowed(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setSortShowed(!sortShowed)}>{sort.name}</span>
      </div>
      {sortShowed ? (
        <div className="sort__popup">
          <ul>
            {list.map((obj, id) => (
              <li
                key={id}
                onClick={() => onClickSortItem(obj)}
                className={sort.name === obj.name ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Sort;
