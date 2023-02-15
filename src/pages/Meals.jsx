import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';

function Meals() {
  return (
    <nav>
      <Header title="Meals" />
      <SearchBar />
      <Recipes />
      <Footer />
    </nav>
  );
}

export default Meals;
