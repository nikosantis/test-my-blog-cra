import useSWR from 'swr'
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from './styles.module.scss'

const fetcher = (url) => fetch(`${process.env.REACT_APP_API_URL}${url}`).then(res => res.json())

function App() {
  const { data } = useSWR("/products", fetcher)

  return (
    <div className={styles.Wrapper}>
      <Helmet>
        <title>Mi Super Ecommerce</title>
        <meta name="description" content='Mi Super Ecommerce' />
      </Helmet>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center mb-5'>
            <h1>Productos</h1>
          </div>

          {!data && (
            <div className='col-12 d-flex justify-content-center'>
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {data && (
            <div className='col-12'>
              <div className='row'>
                {data.map((product) => (
                  <article className='col-lg-3 mb-4' key={product.id}>
                    <div className='card'>
                      <Link to={`/${product.id}`}>
                        <img src={product.image} alt={product.title} className='card-img-top' />
                      </Link>
                      <div className='card-body'>
                        <Link to={`/${product.id}`}>
                          <h5 className='card-title'>{product.title}</h5>
                        </Link>
                        <p className='card-text'>{product.description.substring(0, 30)} ...</p>
                        <p className='card-text'>{product.price} USD</p>
                        <div>
                          <span class="badge bg-primary">{product.category}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
