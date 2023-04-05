import { useState } from 'react';

function Categories({ value, onClickCategory }) {
  console.log(value);

  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['Все', 'Маски', 'Крема', 'Пенки для очищения', 'Сыворотки'];

  return (
    <div className="categories">
      <ul>
        {categories.map((name, id) => (
          <li key={id} onClick={() => onClickCategory(id)} className={value === id ? 'active' : ''}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
