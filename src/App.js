import React, { Suspense, useContext, useReducer, useEffect } from "react";
import styled from 'styled-components';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Context from './state/context';
import reducer from './state/reducer';
import AppBar from "./components/Navigation/AppBar";
import SideBar from './components/Navigation/SideBar';
import Footer from "./components/Footer/Footer";
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';
import Backdrop from './components/Backdrop/Backdrop';
import useMedia from './hooks/useMedia';

const Container = styled.div`
    display: grid;
    grid-template-areas: 
      "header" 
      "main" 
      "footer";
    grid-template-rows: 80px 1fr 300px;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    height: 100%;
    margin: 0;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
`;

const Main = styled.main`
  grid-area: main;
`;

const app = props => {
  const isSmallScreen = useMedia('(max-width: 900px)');
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'IS_SMALL_SCREEN', payload: isSmallScreen });
    if (!isSmallScreen) {
      dispatch({ type: 'SHOW_SIDEBAR', payload: false });
    }
  }, [isSmallScreen]);

  const routes = (
    <Switch>
      <Route exact path='/' component={Home} {...props} />
      <Route exact path='/movie/:movieId' component={Movie} {...props} />
      <Redirect to="/" />
    </Switch>
  );

  const handleBackdropClicked = () => dispatch({ type: 'SHOW_SIDEBAR', payload: false });

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Container>
        <AppBar />
        <SideBar {...props} />
        {isSmallScreen && state.isSideBarOpen && <Backdrop onBackdropClicked={handleBackdropClicked} />}
        <Main>
          <Suspense fallback='Loading movies'>
            {routes}
          </Suspense>
        </Main>
        <Footer />
      </Container>
    </Context.Provider>
  );
}

export default withRouter(app);
