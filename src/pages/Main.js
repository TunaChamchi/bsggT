import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import queryString from 'query-string';
import { Header, Banner, AdS, Footer } from 'components/banner'
import { Tap, TabTap } from 'components/menu'
import { List } from 'components/main'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStartLoad: false,
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.setState({ isStartLoad: true })
    }

    componentDidUpdate(prevProps, prevState){
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.fetchHandler(query, prevState)
    }

    fetchHandler = async (query, prevState) => {
        const { intl } = this.props;
        const { tag } = this.props.match.params;

        const lang  = intl.formatMessage({id: 'lang'});
        const tag   = parseInt(query.tag)  || '';
        const mode  = parseInt(query.mode) || '';
        const page  = parseInt(query.page) || '';
        const title = query.title;

        if (tag === '' || mode === '' || page === '') {
            window.location.href = '?tag=-1&mode=1&page=1';
            return;
        }

        let skip = (page-1)*20;
        let limit = 20;
        
        if (lang !== this.state.lang || tag !== this.state.tag || mode !== this.state.mode || page !== this.state.page || title !== this.state.title) {
            console.log(lang, tag, mode, page, title, prevState.lang, prevState.tag, prevState.mode, prevState.page, prevState.title);
            let talks;

            let url = '/api/Talk?lang='+lang+
                        '&tag='+tag+
                        '&mode='+mode+
                        '&skip='+skip+
                        '&limit='+limit+
                        (title ? '&title='+title : '');            
            
            await fetch(url)
                .then(res => res.json())
                .then(res => talks = res['talks']);
                
            this.setState({ talks:talks, lang:lang, tag:tag, mode:mode, page:page, title:title });
        }
    }

    ProductDetails = (props) => {
        console.log('tag', props.tag);
    }

    render() {
        const { intl } = this.props;
        const { talks } = this.state;

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Main'}),
        }

        return (
            <div>
                <Header data={metaData}/>
                <Banner actived={'Tier'} />
                    <div className="talk_top">
                        <img clssName="talk_top_img" src="img/Wallpaper/World.jpg" />
                    </div>
                    <div className="talk_main">
                        <Tap />
                        <div className="talk_right">
                            <TabTap />
                            <List 
                                talks={talks}/>
                            <div className="talk_right_board_button">
                                <div className="talk_right_board_pre">{intl.formatMessage({id: 'Main.이전'})}</div>
                                <div className="talk_right_board_next">{intl.formatMessage({id: 'Main.다음'})}</div>
                            </div>
                        </div>
                    </div>
                    
                <AdS type={'Main'}/>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Main);