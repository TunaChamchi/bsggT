import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

class Tap extends Component {
    render() {
        const { intl } = this.props;
        
        return (
            <div className="talk_left">
                <div className="talk_left_span">TAG</div>
                <div className="talk_left_tabs">
                    <div className="talk_left_tab actived">{intl.formatMessage({id: 'Tab.전체'})}</div>
                    <div className="talk_left_tab">{intl.formatMessage({id: 'Tab.자유'})}</div>
                    <div className="talk_left_tab">{intl.formatMessage({id: 'Tab.질문'})}</div>
                    <div className="talk_left_tab">{intl.formatMessage({id: 'Tab.공략'})}</div>
                    <div className="talk_left_bottom"></div>
                </div>
            </div>
        );
    };
}

export default injectIntl(Tap);