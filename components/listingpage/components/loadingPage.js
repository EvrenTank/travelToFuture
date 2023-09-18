import styles from '../../../styles/listingpage/LoadingPage.module.scss'
import LoadingAnimation from '@/components/animation/loadingAnimation';

const LoadingPage = () => {

    return (
        <div className={styles.loadingDiv}>
            <div className={styles.centerDiv}>
              <LoadingAnimation/>
            </div>
            </div>
    );
}

export default LoadingPage;
