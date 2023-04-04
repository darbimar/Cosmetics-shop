import notfound from '../../assets/img/notfound.png';
import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
    return (
        <div className={styles.root}>
           <img src={notfound} alt="Ничего не найдено" />
           <h2 >По вашему запросу ничего не найдено!
            <br />
            Попробуйте изменить запрос.</h2>
        </div>
    );
}

export default NotFoundBlock;