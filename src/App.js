import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h2 className="text-center">CRUD de Categorías</h2>
        <Routes>
          <Route path="/" element={<CategoryList />} />
          <Route path="/add" element={<CategoryForm />} />
          <Route path="/edit/:id" element={<CategoryForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
