'use client';
import { ReactNode } from 'react';
import Header from '@/components/Header/Header';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {

  return (
    <>
      <div className="">
        <div className="">
          <main className="">
           <Header/>
            <div className="">
             
              {children}
            </div>

           
          </main>
          
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
