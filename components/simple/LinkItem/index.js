import React from 'react'
import styles from './styles.module.css'

export default function LinkItem({link}) {
  return (
    <a className={styles.link_block} href={link.link} target="_blank">
      <img src={link.icon} className={styles.white_icon}/>
      <h2>{link.title}</h2>
    </a>
  )
}
