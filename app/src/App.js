import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
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

import { Gentelella, BaseTheme, Footer } from 'react-gentelella';
import Sidebar from "./layout/sidebar";
import HeadNav from "./layout/head-nav";
import GeneralElements from "./pages/ui-elements/general-elements"
import Typography from './pages/ui-elements/typography'
import Icons from './pages/ui-elements/icons'
import Glyphicons from './pages/ui-elements/glyphicons'

class App extends Component {

  state = {
    started: true
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
            {/* {
              (!this.state.started) ? */}
                {/* <div>
                  <Route path="/landing" component={LandingPage} />
                </div> */}
                {/* : */}
                <div>
                  <Sidebar />
                  <HeadNav />
                <Switch>
                  {/* <Route path="/extras/plain-page" component={PlainPage} />
                  <Route path="/forms/general-form" component={FormElements} /> */}
                    <Route exac="true" path="/home" component={HomePage} />
                    <Route exac="true" path="/ui-elements/general-elements" component={GeneralElements} />
                    <Route path="/ui-elements/typography" component={Typography} />
                    <Route path="/ui-elements/icons" component={Icons} />
                    <Route path="/ui-elements/glyphicons" component={Glyphicons} />
                    <Route path="/data/diet" component={DietPage} />
                    <Route path="/data/fitness" component={FitnessPage} />
                    <Route path="/data/media" component={MediaPage} />
                    <Route exac="true" path="/location" component={LocationPage} />
                    <Route path="/about" component={AboutPage} />
                    {/* TODO: catch all redirect */}
                    <Route exac="true" path="/" component={HomePage} />
                </Switch>
                </div>
                {/* } */}
            {/* <Route path="/multilevel-menu" component={MultiLevel} />
              <Route component={PlainPage} /> */}
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


