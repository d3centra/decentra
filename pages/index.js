import Metatags from '@components/helpers/MetaTags';
import Loader from '@components/simple/Loader';
import AuthCheck from '@components/helpers/AuthCheck';
import react, { useState } from 'react';
import styles from './styles.module.css'

const test = [1, 2, 3, 4, 5, 6]

export default function index() {
  return (
    <AuthCheck>
      <main className={styles.main}>
        <div className={styles.main_grid}>
        <div className={styles.link_block_create}>+</div> 
          {test.map((num) => {
            return<div className={styles.link_block}>{num} huhuh</div> 
          })}
        </div>
        <div className={styles.long_block}></div> 
      </main>
    </AuthCheck>
  )
}
