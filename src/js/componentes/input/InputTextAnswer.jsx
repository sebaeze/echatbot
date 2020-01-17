/*
*
*/
import React                               from 'react' ;
import { Picker }                          from 'emoji-mart' ;
//
export class InputTextAnswer extends React.Component {
    constructor(props){
        super(props) ;
        this.onChangeValue = this.onChangeValue.bind(this) ;
        this.onEmojiClick  = this.onEmojiClick.bind(this)  ;
        this.textRef       = false ;
        this.state = {
            flagPicker: false ,
            textAreaValue: ''
        } ;
    }
    //
    onChangeValue(argEventOC){
        try {
            // console.log('.....this.textRef: ',this.textRef.value ) ;
            // console.log('...estoy en onChange:: argEventOC: ', argEventOC.target.value) ;
        } catch(errOCV){
            console.log('....InputTextAnswer:: onChangeValue:: ERROR: ',errOCV) ;
        }
    }
    //
    onEmojiClick(argEmoji){
        try {
            let tempNewValue = this.textRef.value || "" ;
            //
            let start = this.textRef.selectionStart;
            let end = this.textRef.selectionEnd;
            console.log('....s: '+start+' end: '+end+';') ;
            //
            if ( start>0 ){
                tempNewValue     = tempNewValue.substr(0,start) + argEmoji.native + tempNewValue.substr(start) ;
            } else {
                tempNewValue     = tempNewValue + argEmoji.native ;
            }
            this.textRef.selectionStart = start ;
            this.textRef.selectionEnd   = end ;
            this.textRef.value = tempNewValue ;
        } catch(errOEC){
            console.log('....ERROR:: OnEmojiclick:: errOEC: ',errOEC) ;
        }
    }
    //
    render(){
        //
        const { customStyle, customStyleTextare, customClassName } = this.props ;
        let styleWrapper      = customStyle ?
                                    {...customStyle,display:'inline-block', position:'relative'}
                                    :
                                    {display:'inline-block', position:'relative'} ;
        let styleTextArea     = customStyleTextare ?
                                    {...customStyleTextare,paddinBotton:'20px',width:'100%', height:'100%', position:'relative', resize: 'none'}
                                    :
                                    {paddinBotton:'20px',width:'100%', height:'100%', position:'relative', resize: 'none'} ;
        //
        console.log('....styleTextArea: ',styleTextArea) ;
        return(
            <div style={styleWrapper}>
                <textarea
                    className={customClassName ? customClassName : ""}
                    style={styleTextArea}
                    onChange={this.onChangeValue}
                    ref={
                        (argRef)=>{
                            if ( !this.textRef ){
                                this.textRef = argRef ;
                            }
                        }
                    }
                />
                <span   className={"waiboc-span-emoticon"}
                        style={{position:'absolute', bottom:'5px', right:'10px', cursor:'pointer'}}
                        onClick={(argEEV)=>{
                            argEEV.preventDefault() ;
                            let tempFlagEmo = !this.state.flagPicker ;
                            this.setState( {flagPicker: tempFlagEmo} ) ;
                        }}
                >
                    { this.state.flagPicker==true ? "⌨️" : "😀" }
                </span>
                {
                    this.state.flagPicker==true ? <Picker onSelect={this.onEmojiClick} title={null}
                                                    i18n={(this.props.translate && this.props.translate.i18n) ? this.props.translate.i18n : {} }
                                            />
                                            : null
                }
            </div>
        )
    }
    //
} ;
//