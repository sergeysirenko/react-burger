import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import qs from "qs";

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/BurgerBlock/Skeleton";
import BurgerBlock from "../components/BurgerBlock";
import Pagination from "../components/Pagination"
import {SearchContext} from "../App";

import {useDispatch, useSelector} from 'react-redux';
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { searchValue } = React.useContext(SearchContext);
    const debouncedSearchTerm = useDebounce(searchValue, 500);

    const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const [burgers, setBurgers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [totalPages, setTotalPages] = React.useState(1);

    const burgersInPage = 4;
    const skeletons = [...new Array(burgersInPage)].map((_, i) => <Skeleton key={i} />);
    const allBurgers = burgers
        .filter(burger => burger.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map(burger => <BurgerBlock key={burger.id} {...burger} />);

    const fetchBurgers = async () => {
        setIsLoading(true);

        const sortBy = sort.sortProperty?.replace('-', '');
        const order = sort.sortProperty?.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = debouncedSearchTerm ? `search=${debouncedSearchTerm}` : '';

        try {
            let res = await axios.get(`https://62f514e6535c0c50e769599a.mockapi.io/burgers?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`);
            setBurgers(res.data);
            setTotalPages(Math.ceil(10 / burgersInPage));
        } catch (error) {
            console.log('Error', error);
        } finally {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({
                ...params,
                sort,
            }))

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
            fetchBurgers();
        }

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, debouncedSearchTerm, currentPage]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">All burgers</h2>
            <div className="content__items">
                {isLoading ? skeletons : allBurgers}
            </div>
                <Pagination
                    burgersInPage={burgersInPage}
                    onChangePage={(page) => dispatch(setCurrentPage(page))}
                    totalPages={totalPages}
                />
        </div>
    );
};

export default Home;