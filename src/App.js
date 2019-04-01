import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import Header from "./components/Header";
import Search from "./components/Search";

const Container = styled.div`
  display: grid;
  grid-template-columns: 15% 1fr 15%;
  grid-gap: 10px;
  grid-template-areas: "header header header" 
                       ". main ." 
                       "footer footer footer";
  justify-content: center;
`;

const Main = styled.main`
  grid-area: main;
  height: calc(100vh - 270px);
`;

const Footer = styled.footer`
  grid-area: footer;
`;

const App = () => {

  const handleSearch = title => {
    console.log('searching...', title);
  }

  return (
    <Container className="container">
      <Header />
      <Main>
        <Search onSearch={handleSearch} />
      </Main>
      <Footer>
        moviebase © 2019
      </Footer>
    </Container>
  );
}

export default App;
