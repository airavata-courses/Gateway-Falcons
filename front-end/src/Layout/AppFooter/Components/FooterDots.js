import React, { Fragment } from 'react';
import { SocialIcon } from 'react-social-icons';

class FooterDots extends React.Component {
    
    render() {
        return (
            <Fragment>
                <div className="footer-dots">
                    <SocialIcon url="http://twitter.com/jaketrent" />
                    <div className="dots-separator" />
                    <SocialIcon url="http://twitter.com/jaketrent" />
                    <div className="dots-separator" />
                    <SocialIcon url="http://twitter.com/jaketrent" />
                    <div className="dots-separator" />
                    <SocialIcon url="http://twitter.com/jaketrent" />
                    <div className="dots-separator" />
                </div>
            </Fragment>
        )
    }
}

export default FooterDots;