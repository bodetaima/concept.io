import React, { useEffect } from 'react';
import Routes from '../routes';
import NavBar from '../../components/navbar/NavBar';

function Home() {
  useEffect(() => {
    document.title = 'Concept';
  }, []);

  return (
    <>
      <NavBar />
      <Routes />
    </>
  );
}

export default Home;
