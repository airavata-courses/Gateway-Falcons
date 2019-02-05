import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import muiTheme from './components/Theme';
import HomePage from "./pages/HomePage";
import LivePage from "./pages/LivePage";
import MediaPage from "./pages/MediaPage";
import DataPage from "./pages/DataPage";
import LocationPage from "./pages/LocationPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer";
import ButtonAppBar from './components/ButtonAppBar';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="site-content">
            <ButtonAppBar />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/live" component={LivePage} />
            <Route exact path="/media" component={MediaPage} />
            <Route exact path="/fitness" 
              component={() => <DataPage data_set="fitness"/>} 
            />
            <Route exact path="/diet" 
              component={() => <DataPage data_set="diet"/>} 
            />
            <Route exact path="/location" component={LocationPage} />
            <Route exact path="/contact" component={ContactPage} />
            <Footer></Footer>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
