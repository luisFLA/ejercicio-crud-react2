import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://api.escuelajs.co/api/v1/categories";

function CategoryForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/${id}`).then((response) => {
        setName(response.data.name);
        setImage(response.data.image);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    try {
      if (id) {
        await axios.put(`${API_URL}/${id}`, { name, image });
        Swal.fire("Éxito", "Categoría actualizada correctamente", "success");
      } else {
        await axios.post(API_URL, { name, image });
        Swal.fire("Éxito", "Categoría creada correctamente", "success");
      }
      navigate("/");
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar la categoría", "error");
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3>{id ? "Editar Categoría" : "Agregar Categoría"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">URL de Imagen</label>
            <input
              type="text"
              className="form-control"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Guardar</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/")}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
