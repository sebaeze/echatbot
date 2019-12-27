/*
*
*/
import React                     from 'react' ;
import Picker                    from 'emoji-picker-react' ;
import { Input }                 from 'antd'  ;
//
export class InputWithEmoji extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            flagPicker: false
        } ;
    }
    //
    render(){
        return(
            <Form.Item
                hasFeedback
                label={ this.props.label }
            >
                <span>😀</span>
                <Input allowClear size="large"
                       placeholder={this.props.placeholder ? this.props.placeholder : ""}
                       prefix={ <Icon type="smile" theme="twoTone" style={{color: 'yellow'}} /> }
                       ref={(argRef)=>{ ()=>{ if (this.props.focus && this.props.focus==true){argRef.focus();}} }} />
                {
                    this.state.flagPicker==true ?
                    <Picker onEmojiClick={this.onEmojiClick}  />
                    : null
                }
            </Form.Item>
        )
    }
    //
} ;
//