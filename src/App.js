import React, { Suspense, useState } from "react";
import styled from 'styled-components';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Header from "./components/AppBar/AppBar";
import Home from './components/home/Home';

const Container = styled.div`
    display: grid;
    grid-template-areas: 
      "header header header" 
      ". main ." 
      "footer footer footer";
    grid-template-rows: 70px 1fr 70px;
    grid-template-columns: 20% 1fr 20%;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    height: 100vh;
    margin: 0;
    @media (max-width: 769px) {
        grid-template-areas: 
        "header" 
        "main" 
        "footer";
        grid-template-rows: 80px 1fr 70px 1fr 70px;
        grid-template-columns: 1fr;
    }
`;

const Main = styled.main`
  grid-area: main;
`;

const Footer = styled.footer`
  grid-area: footer;
`;

const app = () => {

  const routes = (
    <Switch>
      <Route exact path='/' component={Home} />
      {/* <Route exact path='/movie' component={Movie} /> */}
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Container>
      <Header />
      <Main>
        <Suspense fallback='Loading movies'>
          {routes}
        </Suspense>
      </Main>
      <Footer>moviebase © 2019</Footer>
    </Container>
  );
}

export default withRouter(app);
