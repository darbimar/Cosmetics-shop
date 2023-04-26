import { Link } from 'react-router-dom';
import emptybag from '../assets/img/empty_bag.svg';

const BagEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h3>
        {' '}
        Корзина пустая :(
        <br />
        Для заказа перейдите на главную страницу.
      </h3>
      <img src={emptybag} alt="Корзина пуста" />

      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
}

export default BagEmpty;
