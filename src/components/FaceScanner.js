import { useState } from "react";

const FaceScanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const scanImage = async () => {
    if (!selectedFile) {
      alert("Selecciona una imagen primero");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setLoading(true);

    try {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/scan`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Resultado de escaneo:", data); // Debug para verificar la respuesta

      if (data.matchedImages && data.matchedImages.length > 0) {
        setResults(data.matchedImages);
        setMessage(data.message || "✅ Coincidencias encontradas");
      } else {
        setResults([]);
        setMessage("No se encontraron coincidencias.");
      }
    } catch (error) {
      console.error("Error escaneando imagen:", error);
      alert("Ocurrió un error al escanear la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ background: '#e6e9d3', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(88,99,70,0.08)', marginBottom: 32 }}>
      <h2 style={{ color: '#7a7d52', fontWeight: 'bold' }}>Escanear Imagen</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="form-control mb-2"
        style={{ background: '#b7b98c', border: '1px solid #7a7d52' }}
      />
      <button
        onClick={scanImage}
        className="btn"
        style={{ background: '#7a7d52', color: '#fff', fontWeight: 'bold', border: 'none' }}
        disabled={loading}
      >
        {loading ? "Escaneando..." : "Escanear"}
      </button>

      <p className="mt-3" style={{ color: '#7a7d52' }}>{message}</p>

      {results.length > 0 && (
        <div className="collage-grid" style={{ marginTop: 24 }}>
          {results.map((result, index) => {
            const rawUrl = result.imageUrl || result.url;
            const imageUrl = rawUrl?.startsWith("http")
              ? rawUrl
              : `${process.env.REACT_APP_BACKEND_URL}/${rawUrl}`;
            return (
              <div className="collage-item" key={index}>
                <img
                  src={imageUrl}
                  alt={`Coincidencia ${index + 1}`}
                  className="collage-img"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FaceScanner;
