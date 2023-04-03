import { useState } from "react";


function Categories() {

  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['Все', 'Маски', 'Крема', 'Пенки для очищения', 'Сыворотки']

  return(
      <div className="categories">
        <ul>
          {
            categories.map((value, id) => (
              <li key={id} onClick={() => setActiveIndex(id)} className={activeIndex === id ? 'active' : ''}>{value}</li>
            ))
          }
        </ul>
      </div>
  )
}


export default Categories;