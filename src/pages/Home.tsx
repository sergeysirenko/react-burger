import React from 'react';
import {useNavigate} from 'react-router-dom';
import qs from "qs";

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/BurgerBlock/Skeleton";
import BurgerBlock from "../components/BurgerBlock";
import Pagination from "../components/Pagination"
import {BurgerItemType} from "../redux/burger/types";
import {fetchBurgers} from "../redux/burger/asyncActions";
import {selectBurgersData} from "../redux/burger/selectors";

import {useSelector} from 'react-redux';
import {selectFilter, selectFilterSearch} from "../redux/filter/selectors";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/filter/slice";
import useDebounce from "../hooks/useDebounce";
import {useAppDispatch} from "../redux/hooks";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const searchValue = useSelector(selectFilterSearch);
    const debouncedSearchTerm = useDebounce(searchValue, 500);

    const { categoryId, sort, currentPage } = useSelector(selectFilter);
    const { burgers, status } = useSelector(selectBurgersData);

    const onChangeCategory = React.useCallback((index: number) => {
        dispatch(setCategoryId(index));
    }, [])

    const [totalPages, setTotalPages] = React.useState(1);

    const burgersInPage = 4;
    const skeletons = [...new Array(burgersInPage)].map((_, i) => <Skeleton key={i} />);
    const allBurgers = burgers
        .filter((burger: BurgerItemType) => burger.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map((burger: BurgerItemType) => <BurgerBlock key={burger.id} {...burger} />);

    const getBurgers = async () => {
        const sortBy = sort.sortProperty?.replace('-', '');
        const order = sort.sortProperty?.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = debouncedSearchTerm ? `search=${debouncedSearchTerm}` : '';

        dispatch(fetchBurgers({ sortBy, order, category, search, currentPage: String(currentPage) }))

        setTotalPages(Math.ceil(10 / burgersInPage));
    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            let sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({...params, sort}))

            isSearch.current = true;
        }
    }, [])

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })

            navigate(`?${queryString}`)
        }

        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage])

    React.useEffect(() => {
        window.scrollTo(0, 0);

        if(!isSearch.current) {
            getBurgers();
        }

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, debouncedSearchTerm, currentPage]);

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort value={sort} />
            </div>
            <h2 className='content__title'>All burgers</h2>
            {status === 'error' ? (
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <h2 style={{ fontSize: 50, marginBottom: 20 }}>Shit happens 💩</h2>
                    <p style={{ fontSize: 30, marginBottom: 20 }}>Error from load burgers</p>
                </div>
            ) : (
                <div className='content__items'>{status === 'loading' ? skeletons : allBurgers}</div>
            )}

            <Pagination burgersInPage={burgersInPage} onChangePage={(page: number) => dispatch(setCurrentPage(page))} totalPages={totalPages} />
        </div>
    );
};

export default Home;