import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function UploadForm() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Por favor, selecciona al menos una imagen.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("image", file); // se envían todas como "image"
    });

    try {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Imágenes subidas correctamente.");
      } else {
        alert("Error al subir las imágenes.");
      }
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
      alert("Hubo un error al subir las imágenes.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ background: '#e6e9d3', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(88,99,70,0.08)', marginBottom: 32 }}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label style={{ color: '#7a7d52', fontWeight: 'bold' }}>Selecciona una o más imágenes</Form.Label>
        <Form.Control type="file" multiple onChange={handleFileChange} style={{ background: '#b7b98c', border: '1px solid #7a7d52' }} />
      </Form.Group>
      <Button style={{ background: '#7a7d52', border: 'none', fontWeight: 'bold' }} type="submit">
        Subir Imágenes
      </Button>
    </Form>
  );
}

export default UploadForm;
