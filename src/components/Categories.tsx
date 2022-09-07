import React from 'react';

const categories = ['All', 'Royal', 'Chicken', 'Vegetarian', 'Fish', 'Hamburgers'];

type CategoriesProps = {
    value: number;
    onChangeCategory: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {

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