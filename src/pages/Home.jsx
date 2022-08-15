import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/BurgerBlock/Skeleton";
import BurgerBlock from "../components/BurgerBlock";

const Home = () => {
    const [burgers, setBurgers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState({
        name: 'popularity',
        sortProperty: 'rating'
    });

    React.useEffect(() => {
        setIsLoading(true);

        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        fetch(`https://62f514e6535c0c50e769599a.mockapi.io/burgers?${category}&sortBy=${sortBy}&order=${order}`)
            .then((res) => res.json())
            .then((json) => {
                setBurgers(json);
                setIsLoading(false);
            });

        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={setCategoryId} />
                <Sort value={sortType} onChangeSort={setSortType} />
            </div>
            <h2 className="content__title">All burgers</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
                    : burgers.map(burger => <BurgerBlock key={burger.id} {...burger} />)
                }
            </div>
        </div>
    );
};

export default Home;