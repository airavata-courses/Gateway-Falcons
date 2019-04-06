import React, { Fragment } from 'react';
import { SocialIcon } from 'react-social-icons';
import gofundme from '../gofundme.png'
class FooterDots extends React.Component {

    render() {
        return (
            <Fragment>
                <div className="footer-dots">
                    <SocialIcon url="https://www.facebook.com/john.schwenck.5" />
                    <div className="dots-separator" />
                    <SocialIcon url="https://www.instagram.com/john_schwenck/" />
                    <div className="dots-separator" />
                    <SocialIcon url="https://www.linkedin.com/in/john-schwenck/" />
                    <div className="dots-separator" />
                    <a href="https://gofundme.com/send-Schwenck-to-Alaska-2019" target="_blank">
                        <img src={gofundme} style={{ width: 50, height: 50 }} />
                    </a>
                    {/* <div className="dots-separator" /> */}
                </div>
            </Fragment>
        )
    }
}

export default FooterDots;