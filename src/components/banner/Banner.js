import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Langauge  } from 'components/banner';
import logo from 'img/sub_logo.svg';

class Banner extends Component {
    render() {
        const { intl, actived } = this.props

        return (
            <div className="S_banner">
                <div className="S_banner-top">
                    <div className="S_banner-left">
                        <Langauge />
                    </div>
                        <div className="S_mainlogo">
                            <Link to="/" >
                                <img className="S_logo" src={logo} />
                            </Link>
                        </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(Banner);