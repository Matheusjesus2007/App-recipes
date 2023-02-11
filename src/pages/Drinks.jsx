import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <>
      <Header title="Drinks" />
      <SearchBar />
      <Recipes />
      <Footer />
    </>
  );
}

export default Drinks;
