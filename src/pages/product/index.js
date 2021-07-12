import { useParams, Link } from "react-router-dom";
import useSWR from 'swr'
import { Helmet } from "react-helmet";

import styles from './styles.module.scss'

const fetcher = (url) => fetch(`${process.env.REACT_APP_API_URL}${url}`).then(res => res.json())

export default function Product() {
  const { productId } = useParams()
  const { data } = useSWR(`/products/${productId}`, fetcher)

  return (
    <div className={styles.Wrapper}>
      <Helmet>
        <title>{data ? data.title : 'Product nn'}</title>
        <meta name="description" content={data ? data.description : 'Product nn description.'} />
      </Helmet>
      <div className='container'>
        <div className='row'>
          <div className='col-12 mb-5'>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to='/'>Home</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{data && data.title}</li>
              </ol>
            </nav>
          </div>
          {!data && (
            <div className='col-12 d-flex justify-content-center'>
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {data && (
            <article className='col-12'>
              <div className='row'>
                <div className='col-lg-5'>
                  <img src={data.image} alt={data.title} className='img-fluid' />
                </div>
                <div className='col-lg-7 py-5'>
                  <h1>{data.title}</h1>
                  <p>{data.description}</p>
                  <div className={styles.Price}>{data.price} USD</div>
                  <div>
                    <span class="badge bg-primary">{data.category}</span>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}