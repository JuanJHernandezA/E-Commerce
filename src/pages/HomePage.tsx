import React from 'react'
import FeatureGrid from '../components/home/FeatureGrid'
import ProductGrid from '../components/home/ProductGrid'
import Brands from '../components/home/Brands'
import {allCelulares, popularCelulares, recentCelulares} from '../data/initialData';
import { prepareProducts } from '../helpers';

const HomePage = () => {

    const preparedRecentProducts = prepareProducts(recentCelulares);
    const preparedPopularProducts = prepareProducts(popularCelulares);
  return (
    <div >
      <FeatureGrid />
      <ProductGrid title='Nuevos Productos' products={preparedRecentProducts}/>
      <ProductGrid title='Productos Destacados' products={preparedPopularProducts}/>
      <Brands />
    </div>
  )
}

export default HomePage
