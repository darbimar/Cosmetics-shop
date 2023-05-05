import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SingleProduct: React.FC = () => {
  const [item, setItem] = useState<{
    image: string,
    title: string,
    description: string,
    prices: number[]

  }>();
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(
          'https://642abe2500dfa3b5474dceb5.mockapi.io/products/' + id,
        );
        setItem(data);
      } catch (error) {
        alert('Error');
      }
    };
    fetchItem();
  }, []);

  if (!item) {
    return <>Загрузка</>;
  }

  return (
    <div className="single-item">
      <img className="single-item__image" src={item.image} alt="image" />
      <div className="single-item__text">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <h3>{item.prices[0]} руб.</h3>
      </div>
      <Link to="/" className="button button--outline go-back-btn">

        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default SingleProduct;
