import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

class TabTap extends Component {
    render() {
        const { intl } = this.props;
        
        return (
            <div className="talk_right_banner">
                <div className="talk_right_banners">
                    <div className="talk_right_write">
                        <img className="talk_left_tab_img1" src="img/Talk/talk.png" />
                        </div>
                    <div className="talk_right_tab actived">
                        <img className="talk_left_tab_img" src="img/Talk/hot.png" />
                        <span className="talk_left_tab_span">{intl.formatMessage({id: 'Tab.인기'})}</span>
                        </div>
                    <div className="talk_right_tab">
                        <img className="talk_left_tab_img" src="img/Talk/new.png" />
                        <span className="talk_left_tab_span">{intl.formatMessage({id: 'Tab.최신'})}</span>
                        </div>
                    <div className="talk_right_tab">
                        <img className="talk_left_tab_img" src="img/Talk/top.png" />
                        <span className="talk_left_tab_span">{intl.formatMessage({id: 'Tab.최고'})}</span>
                    </div>
                </div>
                <div className="talk_right_search">
                    <input className="talk_right_search_input" placeholder={intl.formatMessage({id: 'Tab.검색'})}></input>
                </div>
            </div>
        );
    };
}

export default injectIntl(TabTap);