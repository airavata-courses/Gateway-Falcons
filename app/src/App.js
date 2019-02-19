import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import muiTheme from './components/Theme';
import Footer from "./components/Footer";
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
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="site-content">
            {/* TODO: have conditional router to remove landing page at journey start */}
            {/* {!this.state.started ? */}
              <Route exact path="/landing" component={LandingPage} /> 
              {/* : */}
              <div>
                <ButtonAppBar />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/" component={HomePage} />
                <Route exact path="/live" component={LivePage} />
                <Route exact path="/media" component={MediaPage} />
                <Route exact path="/fitness" component={FitnessPage} />
                <Route exact path="/diet" component={DietPage} />
                <Route exact path="/location" component={LocationPage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/contact" component={ContactPage} />
                <Footer></Footer>
              </div>
            {/* } */}
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
