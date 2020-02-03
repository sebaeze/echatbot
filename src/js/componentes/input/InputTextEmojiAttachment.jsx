/*
*
*/
import React                               from 'react' ;
import ReactDOM                            from 'react-dom'  ;
import { Picker }                          from 'emoji-mart' ;
import { Input, Form  }                    from 'antd' ;
//
import 'emoji-mart/css/emoji-mart.css'
//
export class InputTextAnswer extends React.Component {
    constructor(props){
        super(props) ;
        this.onEmojiClick  = this.onEmojiClick.bind(this)  ;
        this.textRef       = false ;
        this.inputText     = false ;
        this.state = {
            flagPicker: false ,
            textAreaValue: ''
        } ;
    }
    //
    onEmojiClick(argEmoji){
        try {
            let tempNewValue = this.textRef.value || ""    ;
            let start        = this.textRef.selectionStart ;
            let end          = this.textRef.selectionEnd   ;
            if ( start>0 ){
                tempNewValue     = tempNewValue.substr(0,start) + argEmoji.native + tempNewValue.substr(start) ;
            } else {
                tempNewValue     = tempNewValue + argEmoji.native ;
            }
            this.textRef.value    = tempNewValue ;
            this.textRef.selectionStart = start + ( argEmoji.native.length || 1 ) ;
            this.textRef.selectionEnd   = end + ( argEmoji.native.length || 1 )   ;
        } catch(errOEC){
            console.log('....ERROR:: OnEmojiclick:: errOEC: ',errOEC) ;
        }
    }
    //
    render(){
        //
        const { customStyle, customStyleTextare, customClassName, onChangeValue } = this.props ;
        const { getFieldDecorator } = this.props.form ;
        //
        let styleWrapper      = customStyle ?
                                    {...customStyle,display:'inline-block', position:'relative'}
                                    :
                                    {width:'400px',display:'inline-block', position:'relative'} ;
        let styleTextArea     = customStyleTextare ?
                                    {...customStyleTextare,resize:'vertical',paddinBotton:'20px',width:'100%', height:'100%', position:'relative', resize: 'none'}
                                    :
                                    {resize:'vertical',paddinBotton:'20px',width:'100%', height:'100%', position:'relative', resize: 'none'} ;
        //
        return(
            <Form.Item hasFeedback >
                <div style={styleWrapper}>
                    <div style={{width:'100%',position:'relative', backgroundColor:'#f0f0f0', fontSize:'25px'}}>
                        <span   style={{position:'relative' }}
                                onClick={(argEEV)=>{
                                    argEEV.preventDefault() ;
                                    let tempFlagEmo = !this.state.flagPicker ;
                                    this.setState( {flagPicker: tempFlagEmo} ) ;
                                }}
                                className={ "emoji " + (this.state.flagPicker==true ? "fadeEmojiOut" : "fadeEmojiIn") }
                        >
                            { this.state.flagPicker==true ? "⌨️" : "😀" }
                        </span>
                        {
                            getFieldDecorator(this.props.fieldName, {
                                    initialValue: this.props.initialValue||'',
                                    rules: [{ required: true , message: this.props.errorMsg, whitespace: true }]
                                })
                                (
                                    <Input.TextArea
                                        allowClear
                                        size="large"
                                        rows={1}
                                        style={{width:'85%',display:'inline-block',marginTop:'3px',marginBottom:'3px', marginLeft:'3px', marginRight:'3px'}}
                                        autoSize
                                        onChange={onChangeValue ? onChangeValue : null}
                                        ref={(argRef)=>{
                                            if ( argRef ){
                                                if (this.textRef==false){
                                                    argRef.focus() ;
                                                    this.textRef=argRef;
                                                    let tempTextArea = ReactDOM.findDOMNode( argRef ) ;
                                                    this.textRef     = tempTextArea.querySelectorAll('textarea') ;
                                                    if ( this.textRef.length>0 ){ this.textRef=this.textRef[0]; }
                                                } ;
                                            }
                                        }}
                                    />
                                )
                        }
                        <span   style={{position:'relative'}}
                                onClick={(argEEV)=>{
                                    argEEV.preventDefault() ;
                                    let tempFlagEmo = !this.state.flagPicker ;
                                    this.setState( {flagPicker: tempFlagEmo} ) ;
                                }}
                                className="emoji"
                        >
                            📎
                        </span>
                    </div>
                </div>
                <div style={{width:'100%',marginTop:'2px'}}>
                {
                    this.state.flagPicker==true ?
                        <Picker onSelect={this.onEmojiClick} title={null}
                                i18n={(this.props.translate && this.props.translate.i18n) ? this.props.translate.i18n : {} }
                        />
                        : null
                }
                </div>
            </Form.Item>
        )
    }
    //
} ;
//