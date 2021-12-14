import React from 'react';
import { motion } from 'framer-motion';

import { useFirestore } from '../hooks';

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore('images');
  return (
    <div className="img-grid">
      {docs.length ? (
        docs.map((doc) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            layout
            onClick={() => setSelectedImg(doc.url)}
            whileHover={{ opacity: 1 }}
          >
            <motion.img
              src={doc.url}
              alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))
      ) : (
        <div className="title">
          <h1>
            Hit the <b>+</b> button to start making your own picture wall
          </h1>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
