import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleProduct() {
  const [item, setItem] = useState();
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
    return 'Загрузка...';
  }

  return (
    <div className="single-item">
      <img className="single-item__image" src={item.image} alt="image" />
      <div className="single-item__text">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <h3>{item.price} руб.</h3>
      </div>
    </div>
  );
}

export default SingleProduct;
