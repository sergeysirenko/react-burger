import React from 'react';
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

const Pagination = ({ burgersInPage, totalPages, onChangePage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => onChangePage(e.selected + 1)}
            pageRangeDisplayed={burgersInPage}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;