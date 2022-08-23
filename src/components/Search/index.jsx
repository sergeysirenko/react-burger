import React from 'react';

import styles from './Search.module.scss';
import {SearchContext} from "../../App";

const Search = () => {
    const {searchValue, setSearchValue} = React.useContext(SearchContext);

    const searchRef = React.useRef();

    const clearSearch = () => {
        searchRef.current.focus();
        setSearchValue('');
    }

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 129 129'
                enableBackground='new 0 0 129 129'
            >
                <g>
                    <path d='M51.6,96.7c11,0,21-3.9,28.8-10.5l35,35c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2c1.6-1.6,1.6-4.2,0-5.8l-35-35   c6.5-7.8,10.5-17.9,10.5-28.8c0-24.9-20.2-45.1-45.1-45.1C26.8,6.5,6.5,26.8,6.5,51.6C6.5,76.5,26.8,96.7,51.6,96.7z M51.6,14.7   c20.4,0,36.9,16.6,36.9,36.9C88.5,72,72,88.5,51.6,88.5c-20.4,0-36.9-16.6-36.9-36.9C14.7,31.3,31.3,14.7,51.6,14.7z' />
                </g>
            </svg>
            <input
                className={styles.input}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type='text'
                placeholder='Search burger...'
                ref={searchRef}
            />
            {searchValue &&
                <svg
                    onClick={clearSearch}
                    className={styles.close}
                    height='14px'
                    version='1.1'
                    viewBox='0 0 14 14'
                    width='14px'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <g>
                        <path
                            d='M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z'
                            id='Shape'
                        />
                    </g>
                </svg>
            }
        </div>
    );
};

export default Search;