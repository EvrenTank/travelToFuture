import styles from '../../styles/header/MyHeader.module.scss';

const MyHeader = () => {
    return (
     <header className={styles.header1}>
        <div className={styles.imageDiv}>
            <img className={styles.imageCompany}
            src="/companyImages/myCompany.png"
            alt='Şirket Logosu' >
            </img>
        </div>
        <div className ={styles.navbarDiv}>
            <ul className={styles.navbarList}>
                <li><h4>KAMPANYALAR</h4></li>
                <li><h4>BİLET İŞLEMLERİM</h4></li>
                <li><h4>HİZMETLERİMİZ <img src="/down-arrow.png"  ></img></h4></li>
                <li><h4>BOLBOL</h4></li>
                <li><h4>BİZE YAZIN</h4></li>
                <li><h4>DİĞER <img src="/down-arrow.png"  ></img>  </h4></li>

            </ul>
        </div>
        <div className ={styles.navbarDiv2}>
            <ul className={styles.navbarList}>
                <li><h4>KAMPANYALAR</h4></li>
                <li><h4>BİLET İŞLEMLERİM</h4></li>
                <li><h4>HİZMETLERİMİZ <img src="/down-arrow.png"  ></img></h4></li>
                <li><h4>BOLBOL</h4></li>
                <li><h4>BİZE YAZIN</h4></li>
                <li><h4>DİĞER <img src="/down-arrow.png"  ></img>  </h4></li>

            </ul>
        </div>
        
     </header>

    );
}

export default MyHeader;