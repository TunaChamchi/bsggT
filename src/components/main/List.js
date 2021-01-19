import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagList: ['자유', '질문', '공략']
        };
    }

    listView = () => {
        const { intl, talks } = this.props;
        const { tagList } = this.state;

        if (!talks) return '';

        return talks.map((talk, idx) => {
            const preview = talk['preview'] || "img/no.jpg";

            return (
                <div className="talk_right_board_box" key={"talk_right_board_box_"+idx}>
                    <div className="board_like">
                        <div className="board_like_tri"></div>
                        <div className="board_like_num">{talk['like_count']}</div>
                    </div>
                    <img className="board_img" src={preview} /> 
                    <div className="board_top">
                        <div className="board_top_tag">{intl.formatMessage({id: 'Tab.'+tagList[talk['tag']]})}</div> 
                        <div className="board_top_title">{talk['title']}</div> 
                    </div> 
                    <div className="board_bot">
                        <div className="board_top_writter">{talk['user']['name']} ({talk['user']['ip']})</div> 
                        <div className="board_top_reply">{intl.formatMessage({id: 'Main.댓글'})} {talk['comment_count']}개</div> 
                        <div className="board_top_time">{talk['createDate']}</div> {/* {intl.formatMessage({id: 'Main.시간'})} 전 */}
                    </div>
                </div>
            )
        })
    }


    render() {
        return (
            <div className="talk_right_board">
                {this.listView()}
            </div>
        );
    };
}

export default injectIntl(List);