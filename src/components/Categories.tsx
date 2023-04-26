
type CategoriesProps = {
  value: number;
  onClickCategory: any
}

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  

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
