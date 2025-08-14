'use client';
import { ReactNode } from 'react';
import styles from './layout.module.css';
import Header from '@/components/Header/Header';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
           <Header/>
            <div className={styles.centerblock}>
             
              {children}
            </div>

           
          </main>
          
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
