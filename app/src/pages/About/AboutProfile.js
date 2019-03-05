import React from "react";
import { SocialIcon } from 'react-social-icons';
import john from '../../images/john-profile.jpg';

const AboutProfile = () => {
    return (
        <div>

            <div className="profile_img">
                <div id="crop-avatar">
                    {/* <!-- Current avatar --> */}
                    <img className="img-responsive avatar-view" src={john} alt="Avatar" title="Change the avatar" />
                </div>
            </div>
            <h3>John Schwenck</h3>

            <ul className="list-unstyled user_data">
                <li>
                    <i className="fa fa-map-marker"></i> ZIP CODE NOT YET IMPLEMENTED
                    </li>
                <li>
                    <i className="fa fa-bicycle"></i> Graduate Student
                    </li>
                <li className="m-top-xs">
                    <i className="fa fa-envelope"></i>
                    <a href="schwenck.live@gmail.com”">schwenck.live@gmail.com</a>
                </li>
            </ul>
            <br />
            <SocialIcon url="http://linkedin.com/" />
            <SocialIcon url="http://instagram.com/" />
            <SocialIcon url="http://facebook.com/" />
            <SocialIcon url="http://gofundme.org/" />

        </div>

    );
}

export default AboutProfile;