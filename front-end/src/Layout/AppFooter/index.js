import React, {Fragment} from 'react';
import FooterDots from './Components/FooterDots';

class AppFooter extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="app-footer">
                    <div className="app-footer__inner">
                        <div className="app-footer-left">
                            <FooterDots/>
                        </div>
                        
                    </div>
                </div>
            </Fragment>
        )}
}

export default AppFooter;