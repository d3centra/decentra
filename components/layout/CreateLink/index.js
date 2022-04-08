import React from 'react'
import { useRouter } from 'next/router'
import { firestore, auth } from '@lib/firebase';
import { serverTimestamp, query, collection, orderBy, getFirestore, setDoc, doc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { UserContext } from '@lib/context';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import styles from './styles.module.css'


function CreateNewLink(props){
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState('');

   // Ensure slug is URL safe
   const slug = encodeURI(kebabCase(title));

   // Validate length
   const isValid = title.length > 3 && title.length < 100;
 
   // Create a new post in firestore
   const createLink = async (e) => {
     e.preventDefault();
     const uid = auth.currentUser.uid;
     const ref = doc(getFirestore(), 'users', uid, 'links', slug);
 
     // Tip: give all fields a default value here
     const data = {
       title,
       slug,
       uid,
       username,
       link,
       createdAt: serverTimestamp(),
       updatedAt: serverTimestamp(),
       icon,
     };
 
     await setDoc(ref, data);

     props.toggle()
 
     toast.success('Link created!');
   };

   return (
    <div className={styles.form_bg}>
      <form onSubmit={createLink} className={styles.create_form}>
        <div>
          <h4>Add link</h4>
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name"
          className={styles.input}
        />
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="link"
          className={styles.input}
        />
        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Image"
          className={styles.input}
        />
        <p className={styles.para}>
          <strong>Title:</strong> {slug}
        </p>

        <button onClick={props.toggle} style={{backgroundColor: 'red', marginTop: '3em', marginLeft: '0em', marginBottom: '2em'}}>
          cancel
        </button>

        <button type="submit" disabled={!isValid} className="btn-green">
          Create New Link
        </button>
      </form>
    </div>
  );
}

export default function CreateLink() {

  const [createLink, toggleCreate] = useState(false)

  return (
    <div className={styles.link_maker}>
      {
      createLink ? 
        <CreateNewLink toggle={() =>{toggleCreate(false)}}/>
        :
        <button onClick={() => {toggleCreate(true)}} className={styles.newBtn}>+ Add link</button>
      }
    </div>
  )
}
