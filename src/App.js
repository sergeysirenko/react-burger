import React from "react";
import './scss/app.scss';
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import BurgerBlock from "./components/BurgerBlock";
import burgers from "./db/db.json";

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">All burgers</h2>
                    <div className="content__items">
                        {burgers.map(burger =>
                            <BurgerBlock key={burger.id} {...burger} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
