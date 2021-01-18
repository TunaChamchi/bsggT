import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'editor.css';

class Board extends Component {
    render() {
        const { intl, onEditorChange, data, uuid } = this.props;
        
        console.log('uuid', uuid);

        return (
            <div className="talk_right_talk_board">
                <CKEditor 
                    editor={ClassicEditor}
                    data={data}

                    config={{
                        ckfinder: {
                            uploadUrl: 'http://localhost:3000/api/Talk/image?uuid='+uuid  
                        }
                    }}
                    
                    onReady={(editor) => {
                    }}
                    
                    onChange={(event, editor) => {
                    }}
                    
                    onBlur={(event, editor) => {
                        onEditorChange(editor.getData());
                    }}
                    />
            </div>
        );
    };
}

export default injectIntl(Board);