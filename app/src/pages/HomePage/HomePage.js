import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import sliderData from '../../data/slider-pages';
import Paper from '@material-ui/core/Paper';
import { Page, Panel, PanelHeader, PanelBody, PageTitle } from 'react-gentelella';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './homepage.slider-animations.css';
import './homepage.styles.css';
import 'normalize.css/normalize.css';

const styles = () => ({

});

const content = [
  {
    title: 'Vulputate Mollis Ultricies Fermentum Parturient',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Read More',
    image: 'https://i.imgur.com/ZXBtVw7.jpg',
    user: 'Luan Gjokaj',
    userProfile: 'https://i.imgur.com/JSW6mEk.png'
  },
  {
    title: 'Tortor Dapibus Commodo Aenean Quam',
    description:
      'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
    button: 'Discover',
    image: 'https://i.imgur.com/DCdBXcq.jpg',
    user: 'Erich Behrens',
    userProfile: 'https://i.imgur.com/0Clfnu7.png'
  },
  {
    title: 'Phasellus volutpat metus',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
    button: 'Buy now',
    image: 'https://i.imgur.com/DvmN8Hx.jpg',
    user: 'Bruno Vizovskyy',
    userProfile: 'https://i.imgur.com/4KeKvtH.png'
  }
];

class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      nextTimeDetermined: true,
      nextTimeBoundary: new Date("Feb 10, 2020 13:33:00"),
    }
  }

  onNavigate(page) {
    alert(page);
  }

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;
    return (
      <Page>
        <Panel  >
          <PanelBody >
            <div className={classes.root} style={{ width: "100%", height: 800 }}>
              <Slider>
                {content.map((item, index) => (
                  <div
                    key={index}
                    className="slider-content"
                    style={{ background: `url('${item.image}') no-repeat center center` }}
                  >
                    <div className="inner">
                      <h1>{item.title}</h1>
                      <p>{item.description}</p>
                      <button>{item.button}</button>
                    </div>
                    <section>
                      <img src={item.userProfile} alt={item.user} />
                      <span>
                        Posted by <strong>{item.user}</strong>
                      </span>
                    </section>
                  </div>
                ))}
              </Slider>
            </div>
          </PanelBody>
        </Panel>
      </Page>
    )
  }
}
HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);

