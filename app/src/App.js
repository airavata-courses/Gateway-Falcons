import React, { Component } from 'react';
import './App.css';
import HomePage from "./components/HomePage";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import LivePage from "./components/LivePage";
import MediaPage from "./components/MediaPage";
import DataPage from "./components/DataPage";
import LocationPage from "./components/LocationPage";
import ContactPage from "./components/ContactPage";

class App extends Component {
  render() {
    
    return (
      <BrowserRouter>
        <div>
          <Route
            exact={true}
            path="/"
            render={() => (
              <React.Fragment>
                <div className="App">
                  <HomePage />
                </div>
                <Footer></Footer>
              </React.Fragment>

            )}
          />
          <Route
            exact={true}
            path="/live"
            render={() => (
              <React.Fragment>
                <div className="App">
                  <LivePage />
                </div>
                <Footer></Footer>
              </React.Fragment>

            )}
          />
          <Route
            exact={true}
            path="/media"
            render={() => (
              <React.Fragment>
                <div className="App">
                  <MediaPage />
                </div>
                <Footer></Footer>
              </React.Fragment>

            )}
          />
          <Route
            exact={true}
            path="/data"
            render={() => (
              <React.Fragment>
                <div className="App">
                  <DataPage />
                </div>
                <Footer></Footer>
              </React.Fragment>

            )}
          />
          <Route
            exact={true}
            path="/location"
            render={() => (
              <React.Fragment>
                <div className="App">
                  <LocationPage />
                </div>
                <Footer></Footer>
              </React.Fragment>

            )}
          />
          <Route
            exact={true}
            path="/contact"
            render={() => (
              <React.Fragment>
                <div className="App">
                  <ContactPage />
                </div>
                <Footer></Footer>
              </React.Fragment>

            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
