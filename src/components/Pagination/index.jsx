import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss';

function Pagination({ onChangePage }) {
    return (

        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={3}
            pageCount={4}
            renderOnZeroPageCount={null}
        />

    );
}

export default Pagination;