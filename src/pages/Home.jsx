import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/BurgerBlock/Skeleton";
import BurgerBlock from "../components/BurgerBlock";

const Home = () => {
    const [burgers, setBurgers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://62f514e6535c0c50e769599a.mockapi.io/burgers')
            .then((res) => res.json())
            .then((json) => {
                setBurgers(json);
                setIsLoading(false);
            });
    }, []);

    return (
        <React.Fragment>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">All burgers</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
                    : burgers.map(burger => <BurgerBlock key={burger.id} {...burger} />)
                }
            </div>
        </React.Fragment>
    );
};

export default Home;