/*
* FormIntentAnswer
*/
import React                                             from 'react' ;
import axios                                             from 'axios' ;
import { Button, Form, Input, Tooltip, Icon,  Select }   from 'antd'  ;
import { Row, Col, Upload, Spin, message }               from 'antd'  ;
import { FormDynamicInputOption }                        from './FormDynamicInputOption' ;
import { InputTextAnswer }                               from '../input/InputTextEmojiAttachment' ;
//
import 'emoji-mart/css/emoji-mart.css'
//
export class FormIntentAnswerBase extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode            = false ;
        this.normFile             = this.normFile.bind(this) ;
        this.handleSelectChange   = this.handleSelectChange.bind(this) ;
        this.handleChange         = this.handleChange.bind(this) ;
        this.onEmojiClick         = this.onEmojiClick.bind(this) ;
        this.draggerCustomRequest = this.draggerCustomRequest.bind(this) ;
        this.answerTypes        = {
            API:'api',
            TEXT:'text',
            CAROUSEL:'carousel',
            OPTIONS:'options'
            //,IMAGE:'image'
        } ;
        this.state              = {
            flagSpinner:false,
            fieldPanel: this.props.data.intentAnswer.type || this.answerTypes.TEXT,
            flagUploading: false
        } ;
        this.inputText          = false ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        if ( newProps.data.type!=state.fieldPanel ){
            let newDerivedState = {
                fieldPanel: newProps.data.intentAnswer.type || false
            } ;
            return {...newDerivedState} ;
        } else {
            return false ;
        }
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
    handleChange(info){
        //
        console.log('....handleChange:: info: ',info) ;
        //
        if (info.file.status === 'uploading') {
          //this.setState({ loading: true });
          return;
        }
        /*
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
        */
    };
    //
    draggerCustomRequest(argCR){
        try {
            this.setState({flagUploading: true}) ;
            let fr = new FileReader() ;
            fr.readAsDataURL( argCR.file );
            fr.onerror = (errFR) => { console.log('...ERROR: FR: ',errFR) ; throw errFR; } ;
            fr.onload  = () => {
                let reqOptions = {
                    url: "/api/files",
                    method: 'POST',
                    withCredentials: true,
                    data: {
                        idChatbot: this.props.chatbotConfig._id,
                        name: argCR.file.name ,
                        size: argCR.file.size ,
                        type: argCR.file.type ,
                        lastModified: argCR.file.lastModified ,
                        data: fr.result
                    }
                } ;
                axios( reqOptions )
                    .then((respAXios)=>{
                        let tempFiles = this.props.form.getFieldValue('files') || [] ;
                        let indFile   = tempFiles.findIndex((elemFF)=>{ return elemFF.name==respAXios.data.name ; }) ;
                        respAXios.data.uid = respAXios.data._id ;
                        respAXios.data.key = respAXios.data._id ;
                        if ( indFile!=-1 ){
                            tempFiles[ indFile ]   = respAXios.data ;
                        } else {
                            tempFiles.push( respAXios.data  ) ;
                        }
                        this.props.form.setFieldsValue({ 'files': tempFiles });
                        this.setState({flagUploading: false}) ;
                    })
                    .catch((errText)=>{
                        console.log('...ERROR: errText:: ',errText) ;
                        this.setState({flagUploading: false}) ;
                    })
            } ;
        } catch(errDCR){
            console.log('...ERROR: Dragger:: CustomRequest:: errDCR: ',errDCR) ;
        }
    }
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
                  /*
                  if ( tempOutAnswer.files ){
                      let tempFiles       = tempOutAnswer.files ;
                      let tempArrPromises = [] ;
                      tempOutAnswer.files = [] ;
                      for ( let indF=0; indF<tempFiles.length; indF++ ){
                          let objFile = tempFiles[ indF ] ;
                      }

                  } else {
                    this.props.onSubmitOk( {intentAnswer: tempOutAnswer} ) ;
                  }
                  */
                  //
                  if ( tempOutAnswer.files && tempOutAnswer.files.length>0 ){
                      console.log('.....(A) tempOutAnswer.files: ',tempOutAnswer.files) ;
                    tempOutAnswer.files = tempOutAnswer.files.filter((elemFF)=>{
                        return elemFF.status!="error"  ;
                    }) ;
                    console.log('.....(B) tempOutAnswer.files: ',tempOutAnswer.files) ;
                  }
                  //
                  this.props.onSubmitOk( {intentAnswer: tempOutAnswer} ) ;
                  //
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
        const { getFieldDecorator, getFieldsValue } = this.props.form ;
        const beforeUpload = (argFile,fileList) => {
            const isSizeOk = argFile.size<1024001 ;
            if ( !isSizeOk ) {
              message.error( this.props.translate.form.fileSize1MBError );
              message.status = "error" ;
              argFile.status   = 'error' ;
              argFile.response = this.props.translate.form.fileSize1MBError  ;
            }
            return isSizeOk ;
        }
        //
        let filesInitialValue = (this.props.data.intentAnswer.files && Array.isArray(this.props.data.intentAnswer.files)) ? this.props.data.intentAnswer.files.map((elemFIL,fileInd)=>{
            return {...elemFIL,key: fileInd, uid: fileInd}
        }) : [] ;
        let arrayOptions      = this.props.data.intentAnswer.options || [] ;
        //
        return(
            <Row style={{paddingTop:'30px'}} >
                <Col xs={0}  md={0}  lg={4}  xl={4}  xxl={4} ></Col>
                <Col xs={24} md={24} lg={14} xl={14} xxl={14} >
                    <Form>
                        <Form.Item
                            label={ <span>{this.props.translate.form.answerType}</span> }
                            labelAlign="left"
                            labelCol={{  xs: 24, md:24, lg:8 , xl:8 , xxl:8 }}
                            wrapperCol={{xs: 24, md:24, lg:14, xl:14, xxl:14 }}
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
                        <Form.Item
                            hasFeedback
                            label={
                                <Tooltip    placement="bottomRight"
                                            title={this.props.translate.tooltip.answerText}
                                            getPopupContainer={(trigger) => { return trigger.parentNode ; }}
                                >
                                    {this.props.translate.tooltip.answerSimpleText}
                                    <span className="waiboc-icon" >
                                        <Icon type="question-circle-o" />
                                    </span>
                                </Tooltip>
                            }
                            labelAlign="left"
                            labelCol={  {xs: 24, md: 24, lg: 24, xl: 24, xxl: 24}}
                            wrapperCol={{xs: 24, md: 20, lg: 24, xl: 24, xxl: 24}}
                        >
                            <InputTextAnswer
                                fieldName={"text"}
                                form={this.props.form}
                                errorMsg={this.props.translate.form.errorAnswerText}
                                customStyle={{width:'100%'}}
                                initialValue={this.props.data.intentAnswer.text||this.props.data.intentAnswer.answer||''}
                                onChangeValue={(argEE)=>{
                                    this.props.form.setFieldsValue({ 'text': argEE.target.value||'' });
                                }}
                            />
                        </Form.Item>
                        {
                            this.state.fieldPanel==this.answerTypes.OPTIONS ?
                                <Form.Item
                                    hasFeedback
                                    label={ <span>
                                                Options
                                                <Tooltip  placement="bottomRight"
                                                          title={this.props.translate.tooltip.answerText}
                                                          getPopupContainer={(trigger) => { return trigger.parentNode ; }}
                                                >
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </span>}
                                >
                                    <FormDynamicInputOption
                                        form={this.props.form}
                                        styleButton={{width:'60%'}}
                                        textPlaceholderLabel={this.props.translate.form.optionsLabelToDisplay}
                                        textPlaceholderValue={this.props.translate.form.optionsValueSelect}
                                        initialValues={arrayOptions}
                                        chatbotTraining={this.props.chatbotConfig.training}
                                        fieldName="options"
                                        type="array"
                                        defaultTypefield="string"
                                        textAdd={this.props.translate.form.textAddOption}
                                        description={this.props.translate.form.nonValidOption}
                                    />
                                </Form.Item>
                                : null
                        }
                        {
                            this.state.fieldPanel==this.answerTypes.API ?
                                <Form.Item
                                    hasFeedback
                                    label={ <span>
                                                REST API Url
                                                <Tooltip    placement="bottomRight"
                                                            title={this.props.translate.tooltip.answerText}
                                                            getPopupContainer={(trigger) => { return trigger.parentNode ; }}
                                                >
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </span>}
                                >
                                    {getFieldDecorator('api', {
                                        initialValue: this.props.data.intentAnswer.api||'',
                                        rules: [{ required: true, message: this.props.translate.form.errorAnswerApi, whitespace: true }]
                                    })
                                    (<Input allowClear size="large" ref={(argRef)=>{ if ( argRef && (window.innerWidth>797) ){ argRef.focus(); } }} />)}
                                </Form.Item>
                                : null
                        }
                        <Form.Item label={ <span>{this.props.translate.form.fileDragger}
                                                <Tooltip    placement="bottomRight"
                                                            title={this.props.translate.form.newFileClickDrag}
                                                            getPopupContainer={(trigger) => { return trigger.parentNode ; }}
                                                >
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </span>
                                    }
                                    labelCol={{  xs: 24, md: 24, lg: 24, xl: 24, xxl: 24 }}
                                    wrapperCol={{xs: 24, md: 24, lg: 22, xl: 22, xxl: 22 }}
                        >
                            {getFieldDecorator('files',
                                {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                    initialValue: filesInitialValue
                                }
                            )
                                (
                                <Upload.Dragger name="files"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                    method="post"
                                    action="/api/files"
                                    customRequest={this.draggerCustomRequest}
                                >
                                    <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                                    <p className="ant-upload-text">{this.props.translate.form.newFileClickDrag}</p>
                                </Upload.Dragger>
                                )
                            }
                        </Form.Item>
                        {
                            this.state.flagUploading==false
                                ?   <Form.Item style={{paddingTop:'15px',paddingBottom:'15px'}} >
                                        <Button type="primary" size="large" onClick={(argEC)=>{argEC.preventDefault();this.onSubmitForm(); }} >
                                            {this.props.translate.form.submit}
                                        </Button>
                                        <Button
                                            style={{marginLeft:'10px'}}
                                            size="large"
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
                </Col>
            </Row>
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