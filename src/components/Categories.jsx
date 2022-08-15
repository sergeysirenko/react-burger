import React from 'react';

const Categories = ({ value, onChangeCategory }) => {
    const categories = ['All', 'Royal', 'Chicken', 'Vegetarian', 'Fish', 'Hamburgers'];

    return (
        <div className='categories'>
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className={value === index ? 'active' : ''}
                        onClick={() => onChangeCategory(index)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;