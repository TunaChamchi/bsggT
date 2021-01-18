import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import uuid from 'react-uuid'
import { Header, Banner, AdS, Footer } from 'components/banner';
import Board from 'components/detail/Board';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagList: ['자유', '질문', '공략'],
            tag:0,
            title:'',
            detail:'',
            name:'',
            pw:'',
        };
    }

    componentDidMount() {
        this.setState({ uuid: uuid() });
    }

    onTagHandler = (e, index) => {
        this.setState({tag: index});
    }
    onTagView = (e, index) => {
        const { intl } = this.props;
        const { tag, tagList } = this.state;
        return tagList.map((t, idx) => 
            <div key={'talk_right_talk_tag_button'+idx}
                className={'talk_right_talk_tag_button'+(idx===tag?' actived':'')}
                onClick={(e) => this.onTagHandler(e, idx)}>
                {intl.formatMessage({id: 'Tab.'+t})}
            </div>
        )
    }

    onEditorChange(detail) {
        console.log('onEditorChange', detail);
        this.setState({ detail: detail });
    }

    onValid = () => {
        const { title, detail, name, pw } = this.state;
        let isValid = true;
        isValid &= title !== '';
        isValid &= detail !== '';
        isValid &= name !== '';
        isValid &= pw !== '';

        return isValid;
    }

    onSubmit = async () => {
        if (!this.onValid()) return;

        const { intl } = this.props;
        const { tag, title, detail, name, pw } = this.state;
        const data = {
            lang: intl.formatMessage({id: 'lang'}),
            tag:tag,
            title:title,
            detail:detail,
            user:{
                name:name,
                pw:pw
            }	
        };

        await fetch("api/Talk", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((res) => res.json());
    }
    onCancel = async () => {
        const { uuid } = this.state;
        await fetch("api/Talk/Cancel?uuid="+uuid, {
                method: 'DELETE'
            }).then((res) => res.json());
    }

    render() {
        const { intl } = this.props;
        const { uuid, title, name, pw } = this.state;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Main'}),
        }

        if (!uuid)
            return '';

        return (
            <div>
                <Header data={metaData}/>
                <Banner actived={'Tier'} />
                    <div className="talk_main">
                        <div className="talk_right">
                            <div className="talk_right_talk">
                                <div className="talk_right_talk_tag">TAG</div>
                                <div className="talk_right_talk_tag_buttons">
                                    {this.onTagView()}
                                </div>
                                <input className="talk_right_talk_title" placeholder="제목" value={title} onChange={(e) => this.setState({title:e.target.value})}></input>
                                <Board 
                                    uuid={uuid}
                                    onEditorChange={(e) => this.onEditorChange(e)}
                                    />
                                <input className="talk_right_talk_name" placeholder="닉네임 입력" value={name} onChange={(e) => this.setState({name:e.target.value})}></input>
                                <input type="password" className="talk_right_talk_name" placeholder="비밀번호 입력" value={pw} onChange={(e) => this.setState({pw:e.target.value})}></input>
                                <div className="talk_right_reply_comments">
                                    <div className="talk_right_talk_button" onClick={(e) => this.onSubmit()}>등록</div>
                                    <div className="talk_right_talk_button" onClick={(e) => this.onCancel()}>취소</div>
                                </div>
                            </div>
                        </div>
                    </div>
                <AdS type={'Main'}/>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Create);