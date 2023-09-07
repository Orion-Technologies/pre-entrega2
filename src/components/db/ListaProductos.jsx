import Items from "../items/Items";

const ListaProductos = ({ productos, cart, setCart }) => {
  return (
    <>
      <h4>Productos</h4>
      <div className="container">
        <div className="row">
          {productos?.map((prod) => (
            <Items
              producto={prod}
              key={prod.id}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default ListaProductos;
