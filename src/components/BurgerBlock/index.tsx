import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../../redux/cart/slice";
import {CartItemType} from "../../redux/cart/types";
import {selectCartItems} from "../../redux/cart/selectors";
import {BurgerItemType} from "../../redux/burger/types";
import {Link} from "react-router-dom";

const BurgerBlock: React.FC<BurgerItemType> = ({id, title, price, imageUrl, steak, types}) => {
    const [activeType, setActiveType] = React.useState(0);
    const [activeSteak, setActiveSteak] = React.useState(0);

    const dispatch = useDispatch();
    const burgers = useSelector(selectCartItems);

    const typeNames = ['white', 'black'];

    const burgersInCart = burgers.filter((burger: CartItemType) => burger.id === id)[0]?.count;

    const addBurger = () => {
        dispatch(addItem({
            id,
            title,
            price,
            imageUrl,
            steak: steak[activeSteak],
            types: typeNames[activeType],
            count: 0
        }))
    }

    return (
        <div className='burger-block-wrapper'>
            <div className='burger-block'>
                <Link to={`/burger/${id}`}>
                    <img className='burger-block__image' src={imageUrl} alt={title} />
                    <h4 className='burger-block__title'>{title}</h4>
                </Link>
                <div className='burger-block__selector'>
                    <ul>
                        {types.map((type, index) => (
                            <li key={index} className={activeType === index ? 'active' : ''} onClick={() => setActiveType(index)}>
                                {typeNames[type]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {steak.map((item, index) => (
                            <li key={index} className={activeSteak === index ? 'active' : ''} onClick={() => setActiveSteak(index)}>
                                {item} {item <= 1 ? 'steak' : 'steaks'}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='burger-block__bottom'>
                    <div className='burger-block__price'>from $ {price}</div>
                    <button onClick={addBurger} className='button button--outline button--add'>
                        <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                                fill='white'
                            />
                        </svg>
                        <span>Add</span>
                        {burgersInCart && <i>{burgersInCart}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BurgerBlock;