import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//  import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loagin: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.playload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.playload };
    default:
      return state;
  }
};

function HomeScreen() {
  //const [{loading, error, products}, dispatch ] = const [state, dispatch] = useReducer(reducer, {setProducts};
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Productos Destacados </h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong>$ {product.price}</strong>
              </p>
              <button>Añadir al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
