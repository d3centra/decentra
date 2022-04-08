import React from 'react'
import { useRouter } from 'next/router'
import { firestore, auth } from '@lib/firebase';
import { serverTimestamp, query, collection, orderBy, getFirestore, setDoc, doc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import styles from './styles.module.css'



function createNewLink(){
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');
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
       link: '',
       createdAt: serverTimestamp(),
       updatedAt: serverTimestamp(),
       icon: '',
     };
 
     await setDoc(ref, data);
 
     toast.success('Post created!');
   };
}

export default function CreateLink() {


 

  return (
    <div>
      
    </div>
  )
}
