import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Panel, PanelBody } from 'react-gentelella';

class LivePoll extends Component {

    render() {
        const { } = this.props
        return (
            <Panel>
                <PanelBody>
                    I am a poll!
                </PanelBody>
            </Panel>
        )
    }
}

export default LivePoll