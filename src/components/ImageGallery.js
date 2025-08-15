import React, { useEffect, useState } from 'react';

function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/images`);
      const data = await response.json();
      // console.log(data);  // Aquí puedes ver las URLs que recibes
      setImages(data);
    }
  
    fetchImages();
  }, []);
  

  return (
    <div className="collage-container">
      {images.length > 0 ? (
        <div className="collage-grid">
          {images.map((image, index) => (
            <div className="collage-item" key={index}>
              <img src={image.url} alt="Foto" className="collage-img" />
            </div>
          ))}
        </div>
      ) : (
        <p className="collage-loading">Cargando imágenes...</p>
      )}
    </div>
  );
}

export default ImageGallery;
