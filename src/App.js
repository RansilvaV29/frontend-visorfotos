import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import UploadForm from './components/UploadForm';
import ImageGallery from './components/ImageGallery';
import FaceScanner from './components/FaceScanner';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/images`)
      .then(response => response.json())
      .then(data => setImages(data.images))
      .catch(error => console.error("Error fetching images:", error));
  }, []);

  return (
    <Container fluid style={{ background: 'linear-gradient(135deg, #e6e9d3 0%, #b7b98c 100%)', minHeight: '100vh', padding: 0 }}>
      <Row>
        <Col>
          <h1 className="mb-4 text-center" style={{ color: '#7a7d52', fontWeight: 'bold', paddingTop: 32 }}>Busca las fotografías en las que apareces</h1>
        </Col>
      </Row>

      {/* <UploadForm /> */}
      <FaceScanner />

      <Row className="mt-4">
        <Col>
          <ImageGallery images={images} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
