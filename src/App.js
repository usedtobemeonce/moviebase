import React, { Suspense, useContext, useReducer } from "react";
import styled from 'styled-components';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Context from './context';
import reducer from './reducer';
import Header from "./components/AppBar/AppBar";
import Footer from "./components/Footer/Footer";
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';

const Container = styled.div`
    display: grid;
    grid-template-areas: 
      "header header header" 
      ". main ." 
      "footer footer footer";
    grid-template-rows: 100px 1fr 300px;
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

const app = props => {

  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  const routes = (
    <Context.Provider value={{ state, dispatch }}>
      <Switch>
        <Route exact path='/' component={Home} {...props} />
        <Route exact path='/movie/:movieId' component={Movie} {...props} />
        <Redirect to="/" />
      </Switch>
    </Context.Provider>
  );

  return (
    <Container>
      <Header {...props} />
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
