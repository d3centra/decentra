import Metatags from '@components/helpers/MetaTags';
import Loader from '@components/simple/Loader';
import CreateLink from '@components/layout/CreateLink';
import AuthCheck from '@components/helpers/AuthCheck';
import { firestore, auth, postToJSON } from '@lib/firebase';
import { serverTimestamp, query, collection, orderBy, getFirestore, setDoc, doc, collectionGroup, where, limit, getDocs} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import LinkItem from '@components/simple/LinkItem';
import PostFeed from '@components/layout/PostFeed';
import react, { useState, useContext } from 'react';
import styles from '../styles.module.css'
import { UserContext } from '@lib/context';

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context) {
  // const postsQuery = firestore
  //   .collectionGroup('posts')
  //   .where('published', '==', true)
  //   .orderBy('createdAt', 'desc')
  //   .limit(LIMIT);
  const ref = collectionGroup(getFirestore(), 'posts');
  const postsQuery = query(
    ref,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT),
  )

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);
 
  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function index({posts}) {
  return (

      <main className={styles.main}>
        <AuthCheck>
          <div className={styles.main_grid}>
            <CreateLink />
            <LinkList />
            </div>
            <div className={styles.long_block}>
              <PostFeed posts={posts}/>
          </div> 
        </AuthCheck>
      </main>
  )
}



function LinkList() {
  // const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
  // const query = ref.orderBy('createdAt');

  const ref = collection(getFirestore(), 'users', auth.currentUser.uid, 'links')
  const linkQuery = query(ref, orderBy('createdAt')) 
  const [querySnapshot] = useCollection(linkQuery);

  
  const links = querySnapshot?.docs.map((doc) => doc.data());
  
  return (
    <>
      {
        links != undefined ?
        <Links links={links} />
        :
        ''
      }
    </>
  );
}

function Links({links, admin}){
  return links ? links.map((link) => <LinkItem link={link} key={link.slug} admin={admin} />) : null;
}