/*
* FormIntentAnswer
*/
import React                                                    from 'react' ;
import { Button, Form, Input, Tooltip, Icon,  Select, Upload, Spin }   from 'antd'  ;
// import Picker                                            from 'emoji-picker-react' ;
import { Picker }                                        from 'emoji-mart' ;
import { FormDynamicInputText }                          from  './FormDynamicInputText' ;
//
import 'emoji-mart/css/emoji-mart.css'
//
export class FormIntentAnswerBase extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode          = false ;
        this.normFile           = this.normFile.bind(this) ;
        this.handleSelectChange = this.handleSelectChange.bind(this) ;
        this.onEmojiClick       = this.onEmojiClick.bind(this) ;
        this.answerTypes        = {
            API:'api',
            TEXT:'text',
            CAROUSEL:'carousel',
            OPTIONS:'options',
            IMAGE:'image'
        } ;
        this.state              = {flagSpinner:false, fieldPanel: this.answerTypes.TEXT, flagPicker: false, flagUploading: false } ;
        this.inputText          = false ;
    }
    //
    componentDidMount(){
        const { resetFields } = this.props.form ;
        resetFields({names:['type','title','api','text','options' ]}) ;
    }
    //
    normFile(e){
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    //
    onSubmitForm(){
        try {
            //
            this.setState({flagSpinner:true}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.log('.....error: ') ;
                  console.dir(error) ;
                  setTimeout(() => {
                        this.setState({flagSpinner:false }) ;
                    }, 700 ) ;
              } else {
                  let tempFields    = this.props.form.getFieldsValue() ;
                  let tempOutAnswer = {} ;
                  for ( let keyF in tempFields ){
                      let valField = tempFields[keyF] ;
                      tempOutAnswer[keyF] = valField ;
                  }
                this.props.onSubmitOk( {intentAnswer: tempOutAnswer} ) ;
              }
            });
        } catch(errFS){
            console.dir(errFS) ;
        }
    }
    //
    handleSelectChange(value){
        this.props.form.setFieldsValue({
            type: value
        });
        if ( value ){
            this.setState({fieldPanel: value})
        }
    };
    //
    onEmojiClick(argEmoji){
        try {
            let tempNewValue = this.props.form.getFieldValue("text") || "" ;
            tempNewValue     = tempNewValue + argEmoji.native ;
            this.props.form.setFieldsValue({ text: tempNewValue });
        } catch(errOEC){
            console.log('....ERROR:: OnEmojiclick:: errOEC: ',errOEC) ;
        }
    }
    //
    render(){
        //
        const { getFieldDecorator } = this.props.form ;
        //
        return(
            //
                <Form >
                    <Form.Item
                        label={ <span>{this.props.translate.form.answerType}</span> }
                    >
                        {getFieldDecorator('type', {
                            initialValue: this.props.data.intentAnswer.type||'text',
                            rules: [{ required: true, message: this.props.translate.form.errorLanguage, whitespace: true }]
                        })
                        (
                            <Select
                                placeholder={this.props.translate.form.selectTypeOfAnswer}
                                onChange={this.handleSelectChange}
                                getPopupContainer={(trigger) => {
                                    return trigger.parentNode ;
                                }}
                                size="large"
                            >
                                {
                                    Object.values(this.answerTypes).map((elemType,idxType)=>{
                                    return(
                                            <Select.Option value={elemType}
                                                key={idxType}>{this.props.translate.answertType[elemType]||elemType}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        )
                        }
                    </Form.Item>
                    {
                        this.state.fieldPanel==this.answerTypes.TEXT ?
                            <Form.Item
                                hasFeedback
                                label={ <span>
                                            Text
                                            <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.answerText} ><Icon type="question-circle-o" /> </Tooltip>
                                        </span>}
                            >
                                {
                                    getFieldDecorator('text', {
                                        initialValue: this.props.data.intentAnswer.text||this.props.data.intentAnswer.answer||'',
                                        rules: [{ required: true, message: this.props.translate.form.errorAnswerText, whitespace: true }]
                                    })
                                    (
                                            <Input allowClear size="large"
                                                className="waiboc-cl-input-with-emoticon"
                                                prefix={
                                                    <span className="waiboc-span-emoticon"
                                                            onClick={(argEEV)=>{
                                                                argEEV.preventDefault() ;
                                                                let tempFlagEmo = !this.state.flagPicker ;
                                                                this.setState({flagPicker: tempFlagEmo}) ;
                                                            }}
                                                    >
                                                        { this.state.flagPicker==true ? "⌨️" : "😀" }
                                                    </span>
                                                }
                                                ref={(argRef)=>{ if ( this.inputText==false && argRef ){ this.inputText=argRef; } ; if (argRef){argRef.focus()} }}
                                            />
                                    )
                                }
                                {
                                    this.state.flagPicker==true ? <Picker onSelect={this.onEmojiClick} title={null} i18n={this.props.translate.i18n} /> : null
                                }
                            </Form.Item>
                            : null
                    }
                    {
                        (this.state.fieldPanel==this.answerTypes.IMAGE || this.state.fieldPanel==this.answerTypes.OPTIONS) ?
                            <Form.Item
                                hasFeedback
                                label={ <span>
                                            Title
                                            <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.answerText} ><Icon type="question-circle-o" /> </Tooltip>
                                        </span>}
                            >
                                {getFieldDecorator('title', {
                                    initialValue: this.props.data.intentAnswer.title||'',
                                    rules: [{ required: true, message: this.props.translate.form.errorAnswerTitle, whitespace: true }]
                                })
                                (<Input allowClear size="large" ref={(argRef)=>{argRef.focus();}} />)}
                            </Form.Item>
                            : null
                    }
                    {
                        this.state.fieldPanel==this.answerTypes.API ?
                            <Form.Item
                                hasFeedback
                                label={ <span>
                                            REST API Url
                                            <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.answerText} ><Icon type="question-circle-o" /> </Tooltip>
                                        </span>}
                            >
                                {getFieldDecorator('api', {
                                    initialValue: this.props.data.intentAnswer.api||'',
                                    rules: [{ required: true, message: this.props.translate.form.errorAnswerApi, whitespace: true }]
                                })
                                (<Input allowClear size="large" ref={(argRef)=>{argRef.focus();}} />)}
                            </Form.Item>
                            : null
                    }
                    <Form.Item label={ <span>{this.props.translate.form.fileDragger}
                                            <Tooltip  placement="bottomRight" title={this.props.translate.form.newFileClickDrag} ><Icon type="question-circle-o" /> </Tooltip>
                                        </span>}
                    >
                        {getFieldDecorator('files', {valuePropName: 'fileList',getValueFromEvent: this.normFile })
                            (
                            <Upload.Dragger name="files"
                                action={(argFile)=>{
                                    if (argFile){
                                        this.setState({flagUploading: true}) ;
                                        let tempFiles = this.props.form.getFieldValue('files') || [] ;
                                        argFile.text()
                                            .then((finText)=>{
                                                argFile['flagNewFile'] = true ;
                                                console.log('....antes de DATA:: argFile: ', argFile) ;
                                                //argFile['data']        = finText.toString('base64') ;
                                                //argFile['data']        = finText ;
                                                tempFiles.push(  argFile ) ;
                                                this.props.form.setFieldsValue({ 'files': tempFiles });
                                                this.setState({flagUploading: false}) ;
                                            })
                                            .catch((errText)=>{
                                                console.log('....errText:: ',errText) ;
                                                this.setState({flagUploading: false}) ;
                                            })
                                    }
                                }}
                            >
                                <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                                <p className="ant-upload-text">{this.props.translate.form.newFileClickDrag}</p>
                            </Upload.Dragger>
                            )
                        }
                    </Form.Item>
                    {
                        this.state.flagUploading==false ?
                            <Form.Item>
                                <Button type="primary" onClick={(argEC)=>{argEC.preventDefault();this.onSubmitForm(); }} >
                                    {this.props.translate.form.submit}
                                </Button>
                                <Button
                                    style={{marginLeft:'10px'}}
                                    onClick={(argEC)=>{argEC.preventDefault();this.props.prev(); }}
                                >
                                    <Icon type="left" />
                                    {this.props.translate.previous}
                                </Button>
                            </Form.Item>
                            :
                            <Spin size="large" />
                    }
                </Form>
        ) ;
    }
    //
} ;

//
export const FormIntentAnswer = Form.create({ name: '',
    mapPropsToFields(props) {
        return {
            intentAnswer: Form.createFormField({ value: props.data.intentAnswer || {} })
        };
    }
})(FormIntentAnswerBase);
//