import React from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/BurgerBlock/Skeleton";
import BurgerBlock from "../components/BurgerBlock";
import Pagination from "../components/Pagination"

const Home = ({ searchValue }) => {
    const [burgers, setBurgers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [sortType, setSortType] = React.useState({
        name: 'popularity',
        sortProperty: 'rating'
    });

    const burgersInPage = 4;
    const skeletons = [...new Array(burgersInPage)].map((_, i) => <Skeleton key={i} />);
    const allBurgers = burgers
        .filter(burger => burger.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map(burger => <BurgerBlock key={burger.id} {...burger} />);

    React.useEffect(() => {
        setIsLoading(true);

        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        fetch(`https://62f514e6535c0c50e769599a.mockapi.io/burgers?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
            .then((res) => res.json())
            .then((json) => {
                setBurgers(json);
                setTotalPages(Math.ceil(10 / burgersInPage));
                setIsLoading(false);
            });

        window.scrollTo(0, 0);
    }, [categoryId, sortType, currentPage]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={setCategoryId} />
                <Sort value={sortType} onChangeSort={setSortType} />
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