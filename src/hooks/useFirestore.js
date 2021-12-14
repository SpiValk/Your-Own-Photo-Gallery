import { useState, useEffect } from 'react';
import { firestore, collection, query, orderBy, onSnapshot } from '../firebase/config';

const useFirestore = (myCollection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchedCollection = collection(firestore, myCollection);
    const orderedQuery = query(fetchedCollection, orderBy('createdAt', 'desc'));

    // .orderBy('createdAt', 'DESC')
    const unsub = onSnapshot(orderedQuery, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsub();
  }, [myCollection]);

  return { docs };
};

export default useFirestore;
