import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '@lib/context';
import { auth } from '@lib/firebase';
import { signOut } from 'firebase/auth';

import styles from './styles.module.css'

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOutNow = () => {
    signOut(auth);
    router.reload();
  }

  return (
    <nav className="navbar">
      <ul className={styles.ul}>
       

        {/* user is signed-in and has username */}
        {username && (
          <div className={styles.links}>

              
        
            <li className={styles.li}>
              <Link href="/">
                <div className={styles.logo} />
              </Link>
            </li>

            <li className={styles.li}>
              <Link href="/main">
                <button className={styles.link_btn}>Home</button>
              </Link>
            </li>

            <li className={styles.li}>
              <Link href="/admin">
                <button className={styles.link_btn}>Create</button>
              </Link>
            </li>

            <li className={styles.li}>
              <Link href="/forum">
                <button className={styles.link_btn}>Forum</button>
              </Link>
            </li>

            <li className={styles.li}>
              <Link href="/404">
                <button className={styles.link_btn}>Resources</button>
              </Link>
            </li>

            <li className={styles.li}>
              <Link href="/404">
                <button className={styles.link_btn}>Chat</button>
              </Link>
            </li>
           
            <li className={styles.li}>
              <button onClick={signOutNow}>Log Out</button>
            </li>

            <li className={styles.li_last}>
              <Link href={`/${username}`}>
                <img src={`${user.photoURL}` || ''} alt={`${username}` || ''}></img>
              </Link>
            </li>
          </div>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li className={styles.li_profile}>
            <Link href="/">
              <button>Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
