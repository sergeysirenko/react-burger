import React from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/BurgerBlock/Skeleton";
import BurgerBlock from "../components/BurgerBlock";
import Pagination from "../components/Pagination"
import {SearchContext} from "../App";

import {useDispatch, useSelector} from 'react-redux';
import {setCategoryId} from "../redux/slices/filterSlice";

const Home = () => {
    const { searchValue } = React.useContext(SearchContext);

    const dispatch = useDispatch();
    const { categoryId, sort } = useSelector((state) => state.filter);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const [burgers, setBurgers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    const burgersInPage = 4;
    const skeletons = [...new Array(burgersInPage)].map((_, i) => <Skeleton key={i} />);
    const allBurgers = burgers
        .filter(burger => burger.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map(burger => <BurgerBlock key={burger.id} {...burger} />);

    React.useEffect(() => {
        setIsLoading(true);

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `search=${searchValue}` : '';

        fetch(`https://62f514e6535c0c50e769599a.mockapi.io/burgers?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`)
            .then((res) => res.json())
            .then((json) => {
                setBurgers(json);
                setTotalPages(Math.ceil(10 / burgersInPage));
                setIsLoading(false);
            });

        window.scrollTo(0, 0);
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

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
                    onChangePage={(page) => setCurrentPage(page)}
                    totalPages={totalPages}
                />
        </div>
    );
};

export default Home;