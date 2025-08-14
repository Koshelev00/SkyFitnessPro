import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
export default function Header() {
    return(
    <div className={styles.main__header}>
        <div className={styles.header__logo}>
        <Link href="#">
          <Image
            width={220}
            height={35}
            className={'logo__image'}
            src="/logo.png"
            alt={'logo'}
          />
        </Link>

        <h2 className={styles.logo__title}>Онлайн-тренировки для занятий дома</h2>
      </div>
     
<button className={styles.header__batton}>Войти</button>
    </div>
    )
}
