import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://api.escuelajs.co/api/v1/categories";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [filteredCategory, setFilteredCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data);
      setFilteredCategory(null); // Restablecer filtro al cargar datos
    } catch (error) {
      console.error("Error al obtener categorías", error);
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      Swal.fire("Error", "Ingrese un ID válido para buscar", "warning");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/${searchId}`);
      setFilteredCategory(response.data);
    } catch (error) {
      Swal.fire("Error", "No se encontró la categoría con ese ID", "error");
      setFilteredCategory(null);
    }
  };

  const handleClearSearch = () => {
    setSearchId("");
    setFilteredCategory(null);
  };

  const deleteCategory = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Seguro que deseas eliminar esta categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        Swal.fire("Eliminado", "La categoría ha sido eliminada", "success");
        fetchCategories();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar la categoría", "error");
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/add" className="btn btn-primary">Agregar Categoría</Link>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Buscar por ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="btn btn-success me-2" onClick={handleSearch}>Buscar</button>
          <button className="btn btn-secondary" onClick={handleClearSearch}>Limpiar búsqueda</button>
        </div>
      </div>

      {filteredCategory ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Resultado de la Búsqueda</h5>
            <p><strong>ID:</strong> {filteredCategory.id}</p>
            <p><strong>Nombre:</strong> {filteredCategory.name}</p>
            <img src={filteredCategory.image} alt={filteredCategory.name} width="50" />
            <div className="mt-2">
              <Link to={`/edit/${filteredCategory.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
              <button className="btn btn-danger btn-sm" onClick={() => deleteCategory(filteredCategory.id)}>Eliminar</button>
            </div>
          </div>
        </div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td><img src={cat.image} alt={cat.name} width="50" /></td>
                <td>
                  <Link to={`/edit/${cat.id}`} className="btn btn-warning btn-sm">Editar</Link>
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteCategory(cat.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CategoryList;
