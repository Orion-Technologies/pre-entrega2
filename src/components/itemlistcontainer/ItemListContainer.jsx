import { useState, useEffect } from "react";
import ListaProductos from "../db/ListaProductos";

function ItemListContainer() {
  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductos(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setCargando(false));

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (categorySelected) {
      fetch(`https://fakestoreapi.com/products/category/${categorySelected}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProductos(data);
        })
        .catch((e) => console.error(e))
        .finally(() => setCargando(false));
    }
  }, [categorySelected]);

  const getByCategory = (cat) => {
    setCategorySelected(cat);
    setCargando(true);
  };

  return (
    <div>
      <header>
        <div className="d-flex flex-row justify-content-center">
          <h1>Ecommerce - Cart: {cart.length}</h1>
        </div>

        <div className="d-flex flex-row justify-content-center mb-3">
          {categories?.map((cat) => (
            <button
              className="btn btn-outline-dark ms-3"
              key={cat}
              onClick={() => getByCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {cargando ? (
          <p> Cargando productos...</p>
        ) : (
          // Mi map o componente con map de productos
          // estos son 3 props productos={productos} cart={cart} setCart={setCart} pasadon a ListaProductos
          <ListaProductos productos={productos} cart={cart} setCart={setCart} />
        )}
      </header>
    </div>
  );
}

export default ItemListContainer;
