import React from 'react';

const Categories = () => {
    const [activeCategory, setActiveCategory] = React.useState(0);

    const categories = ['All', 'Royal', 'Chicken', 'Vegetarian', 'Fish', 'Hamburgers'];

    return (
        <div className='categories'>
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className={activeCategory === index ? 'active' : ''}
                        onClick={() => setActiveCategory(index)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;