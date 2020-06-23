/*
*
*/
import React                               from 'react' ;
import ReactDOM                            from 'react-dom'  ;
import { Picker }                          from 'emoji-mart' ;
import { Input, Form, Popover }            from 'antd' ;
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
            focus: this.props.focus ? this.props.focus : false,
            textAreaValue: ''
        } ;
        this.setRefInput         = this.setRefInput.bind(this) ;
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
            //
            let objUpdater = {} ;
            objUpdater[ this.props.fieldName ] = this.textRef.value ;
            this.props.form.setFieldsValue( objUpdater ) ;
            this.textRef.focus() ;
            //
        } catch(errOEC){
            console.log('....ERROR:: OnEmojiclick:: errOEC: ',errOEC) ;
        }
    }
    //
    setRefInput(argRef){
        if ( argRef && this.textRef==false ){
            this.textRef = argRef ;
            if ( window.innerWidth>797 ){
                let tempTextArea = ReactDOM.findDOMNode( argRef ) ;
                this.textRef     = tempTextArea.querySelectorAll('textarea') ;
                if ( this.textRef.length>0 ){ this.textRef=this.textRef[0]; }
                setTimeout(() => {
                    argRef.focus() ;
                    if ( this.textRef.value.length>0 && this.textRef.selectionStart!=undefined ){
                        this.textRef.selectionStart = this.textRef.value.length ;
                        this.textRef.selectionEnd = this.textRef.value.length ;
                    }
                }, 0) ;
            }
        }
    }
    //
    render(){
        //
        const { customStyle, customStyleTextare, onChangeValue } = this.props ;
        const { getFieldDecorator } = this.props.form ;
        const i18nTranslate = (this.props.translate && this.props.translate.i18n) ? this.props.translate.i18n : {}  ;
        //
        let styleWrapper      = customStyle ?
                                    {...customStyle,display:'inline-block', position:'relative'}
                                    :
                                    {width:'400px',display:'inline-block', position:'relative'} ;
        //
        return(
            <Form.Item hasFeedback >
                <div style={styleWrapper}>
                    <div style={{width:'100%',position:'relative', fontSize:'25px' /* backgroundColor:'#f0f0f0', */  }}>
                        <Popover    trigger="click"
                                    content={
                                        <div    style={{width:'100%',marginTop:'80px'}}
                                                className={ "waiboc-emoji-wrapper" }
                                                placement="bottomRight"
                                        >
                                            <Picker onSelect={this.onEmojiClick} title={""} set={'google'} theme={'dark'} i18n={i18nTranslate} />
                                        </div>
                                    }
                        >
                            <span style={{position:'relative',cursor:'pointer'}} >
                                😀
                            </span>
                        </Popover>
                        {
                            getFieldDecorator(this.props.fieldName, {
                                    initialValue: this.props.initialValue||'',
                                    rules: [{ required: true , message: this.props.errorMsg, whitespace: true }]
                                })
                                (
                                    <Input.TextArea
                                        allowClear
                                        size="large"
                                        rows={5}
                                        style={{width:'85%',display:'inline-block',marginTop:'3px',marginBottom:'3px', marginLeft:'3px', marginRight:'3px'}}
                                        autoSize
                                        onChange={onChangeValue ? onChangeValue : null}
                                        ref={this.setRefInput}
                                    />
                                )
                        }
                    </div>
                </div>
            </Form.Item>
        )
    }
    //
} ;
//