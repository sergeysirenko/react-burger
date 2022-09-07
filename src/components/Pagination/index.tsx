import React from 'react';
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PaginationProps = {
    burgersInPage: number;
    totalPages: number;
    onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ burgersInPage, totalPages, onChangePage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => onChangePage(event.selected + 1)}
            pageRangeDisplayed={burgersInPage}
            pageCount={totalPages}
            previousLabel="<"
        />
    );
};

export default Pagination;