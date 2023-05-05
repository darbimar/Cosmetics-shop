import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';


type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
  categoryId: number
}


const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage, categoryId }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={6}
      pageCount={categoryId === 0 ? 2 : 1}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
