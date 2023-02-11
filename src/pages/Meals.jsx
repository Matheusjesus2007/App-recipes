import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';

function Meals() {
  return (
    <>
      <Header title="Meals" />
      <SearchBar />
      <Recipes />
      <Footer />
    </>
  );
}

export default Meals;
