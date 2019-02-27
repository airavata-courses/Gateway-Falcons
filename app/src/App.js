import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import muiTheme from './components/Theme';
import ButtonAppBar from './components/ButtonAppBar';
import {
  AboutPage,
  ContactPage,
  DietPage,
  FitnessPage,
  HomePage,
  LandingPage,
  LivePage,
  LocationPage,
  LoginPage,
  MediaPage
} from './pages/index';
// import Footer from "./components/Footer";
import { Left, Top, Menu, PageContent } from './components/navigation';
// import PageContent from './components/navigation';
// import history from './history';

import { Gentelella, BaseTheme, Footer } from 'react-gentelella';
import Sidebar from "./layout/sidebar";
import HeadNav from "./layout/head-nav";
import GeneralElements from "./pages/ui-elements/general-elements"
import Typography from './pages/ui-elements/typography'
import Icons from './pages/ui-elements/icons'
import Glyphicons from './pages/ui-elements/glyphicons'

class App extends Component {

  state = {
    started: false
  }

  componentDidMount() {
    // TODO: Remove this
    // setInterval(() => {
    //   this.setState({started: true})
    // }, 4000)
  }

  render() {
    return (
      <div>
        <BaseTheme />
        <BrowserRouter>
          <Gentelella fixedFooter={true} fixedSidebar={true} >
            <Sidebar />
            <HeadNav />
            <Switch>
              {/* <Route path="/extras/plain-page" component={PlainPage} />
              <Route path="/forms/general-form" component={FormElements} /> */}
              <Route path="/ui-elements/general-elements" component={GeneralElements} />
              <Route path="/ui-elements/typography" component={Typography} />
              <Route path="/ui-elements/icons" component={Icons} />
              <Route path="/ui-elements/glyphicons" component={Glyphicons} />
              <Route path="/data/diet" component={DietPage} />
              <Route path="/data/fitness" component={FitnessPage} />
              <Route path="/data/media" component={MediaPage} />
              {/* <Route path="/multilevel-menu" component={MultiLevel} />
              <Route component={PlainPage} /> */}
            </Switch>
            <Footer>
              React-Gentelella * Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
            </Footer>
          </Gentelella>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;


