import React, { Suspense, useContext, useReducer, useEffect } from "react";
import styled, { css } from 'styled-components';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Context from './state/context';
import reducer from './state/reducer';
import AppBar from "./components/Navigation/AppBar";
import SideBar from './components/Navigation/SideBar';
import Footer from "./components/UI/Footer/Footer";
import Popular from './components/Popular/Popular';
import Movie from './components/Movie/Movie';
import Upcomming from './components/Upcomming/Upcomming';
import Search from "./components/Search/Search";
import SearchResults from './components/Search/SearchResults';
import useMedia from './hooks/useMedia';

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
      <Route exact path='/' component={Popular} {...props} />
      <Route exact path="/searchResults" component={SearchResults} {...props} />
      <Route exact path='/movie/:movieId' component={Movie} {...props} />
      <Route exact path='/upcomming' component={Upcomming} {...props} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Container isSmallScreen={isSmallScreen}>
        <AppBar isSmallScreen={isSmallScreen} {...props} />
        <StyledSideBar {...props} isSmallScreen={isSmallScreen} />
        {isSmallScreen && <StyledSearch><Search {...props} /></StyledSearch>}
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


const Container = styled.div`
    display: grid;
    grid-template-areas: 
      "header header" 
      "sidebar main" 
      "sidebar footer";
    grid-template-rows: 80px 1fr 300px;
    grid-template-columns: 250px 1fr;
    height: 100%;
    margin: 0;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    /* Small screen layout */
    ${props => props.isSmallScreen && css`
    grid-template-columns: 1fr;
    grid-template-rows: 80px auto 1fr 300px;
    grid-template-areas: 
      "header" 
      "search"
      "main" 
      "footer";
    `}
`;

const Main = styled.main`
  grid-area: main;
`;

const StyledSideBar = styled(SideBar)`
  grid-area: sidebar;
`;

const StyledSearch = styled.div`
    grid-area: 'search';
    padding: 20px;
    background-color: #282c34;
    div {
      width: 100%;
    }
`;