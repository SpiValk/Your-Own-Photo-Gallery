import { useState, useEffect } from 'react';

import {
  ref,
  storage,
  uploadBytesResumable,
  getDownloadURL,
  firestore,
  collection,
  addDoc,
  serverTimestamp,
} from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    //references
    const storageRef = ref(storage, file.name);
    const collectionRef = collection(firestore, 'images');

    const uploadingImg = uploadBytesResumable(storageRef, file);

    uploadingImg.on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await getDownloadURL(uploadingImg.snapshot.ref);

        const createdAt = serverTimestamp();
        addDoc(collectionRef, { url, createdAt });

        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
