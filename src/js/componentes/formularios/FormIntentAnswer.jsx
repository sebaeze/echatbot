/*
* FormIntentAnswer
*/
import React                                             from 'react' ;
import { Button, Form, Input, Tooltip, Icon,  Select }   from 'antd'  ;
import { Row, Col, Spin, Collapse }                      from 'antd'  ;
import { FormDynamicInputOption }                        from './FormDynamicInputOption' ;
import { FormDynamicAttachment  }                        from './FormDynamicAttachment'  ;
import { InputTextAnswer }                               from '../input/InputTextEmojiAttachment' ;
//
export class FormIntentAnswerBase extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode            = false ;
        this.handleSelectChange   = this.handleSelectChange.bind(this) ;
        this.answerTypes        = {
            API:'api',
            TEXT:'text',
            CAROUSEL:'carousel'
        } ;
        this.state              = {
            flagSpinner:false,
            fieldPanel: this.props.data.intentAnswer.type || this.answerTypes.TEXT
        } ;
        this.inputText          = false ;
        this.onSubmitForm       = this.onSubmitForm.bind(this) ;
    }
    //
    onSubmitForm(argEE){
        try {
            //
            if ( argEE && argEE.preventDefault ){ argEE.preventDefault(); }
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
                  //
                  let tempFields    = this.props.form.getFieldsValue() ;
                  let tempOutAnswer = {} ;
                  for ( let keyF in tempFields ){
                      let valField = tempFields[keyF] ;
                      tempOutAnswer[keyF] = valField ;
                  }
                  //
                  if ( tempOutAnswer.files && tempOutAnswer.files.length>0 ){
                    tempOutAnswer.files = tempOutAnswer.files.filter((elemFF)=>{
                        return elemFF.status!="error"  ;
                    }) ;
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
    } ;
    //
    render(){
        //
        const { getFieldDecorator } = this.props.form ;
        let arrayOptions            = this.props.data.intentAnswer.options || [] ;
        let addPropsPanel           = {style:{ background:'white', border: 'none', paddingLeft:'10px', paddingRight:'10px' }} ;
        //
        return(
            <Row style={{paddingTop:'30px'}} >
                <Col xs={0}  md={0}  lg={2}  xl={2}  xxl={2} ></Col>
                <Col xs={24} md={24} lg={20} xl={20} xxl={20} >
                    <Form>
                    <Collapse bordered={false} accordion={false} >
                        <Collapse.Panel forceRender={true} key={"2"}  {...addPropsPanel}
                                        header={<Tooltip    placement="topRight"
                                                            title={this.props.translate.tooltip.answerText}
                                                            getPopupContainer={(trigger) => { return trigger.parentNode ; }}
                                                >
                                                    {this.props.translate.tooltip.answerSimpleText}
                                                    <span className="waiboc-icon" >
                                                        <Icon type="question-circle-o" />
                                                    </span>
                                                </Tooltip>}
                        >
                            <Form.Item
                                hasFeedback
                                label={ false }
                                labelAlign="left"
                                labelCol={  {xs: 24, md: 24, lg: 24, xl: 24, xxl: 24}}
                                wrapperCol={{xs: 24, md: 20, lg: 24, xl: 24, xxl: 24}}
                            >
                                <InputTextAnswer
                                    fieldName={"text"}
                                    form={this.props.form}
                                    errorMsg={this.props.translate.form.errorAnswerText}
                                    customStyle={{width:'100%'}}
                                    focus={true}
                                    initialValue={this.props.data.intentAnswer.text||this.props.data.intentAnswer.answer||''}
                                    onChangeValue={(argEE)=>{
                                        this.props.form.setFieldsValue({ 'text': argEE.target.value||'' });
                                    }}
                                />
                            </Form.Item>
                        </Collapse.Panel>
                        <Collapse.Panel forceRender={true} key={"4"}  {...addPropsPanel}
                                        header={<Tooltip    placement="topRight"
                                                            title={this.props.translate.tooltip.answerText}
                                                            getPopupContainer={(trigger) => { return trigger.parentNode ; }}
                                                >
                                                    REST API Url
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>}
                        >
                            <Form.Item
                                hasFeedback
                                label={ false }
                            >
                                {getFieldDecorator('api', {
                                    initialValue: this.props.data.intentAnswer.api||'',
                                    rules: [{ required: false, message: this.props.translate.form.errorAnswerApi, whitespace: true }]
                                })
                                (<Input allowClear size="large" ref={(argRef)=>{ if ( argRef && (window.innerWidth>797) ){ argRef.focus(); } }} />)}
                            </Form.Item>
                        </Collapse.Panel>
                        <Collapse.Panel forceRender={true} key={"5"}  {...addPropsPanel}
                                        header={<Tooltip    placement="topRight"
                                                            title={this.props.translate.form.newFileClickDrag}
                                                            getPopupContainer={(trigger) => { return trigger.parentNode ; }}
                                                >
                                                    {this.props.translate.form.fileDragger}
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>}
                        >
                            <Form.Item label={ false } >
                                <FormDynamicAttachment
                                    form={this.props.form}
                                    styleButton={{width:'60%'}}
                                    textPlaceholderFile={this.props.translate.form.newFileClickDrag}
                                    textPlaceholderLabel={this.props.translate.form.newFileDescription}
                                    files={this.props.data.intentAnswer.files||[]}
                                    idChatbot={this.props.chatbotConfig._id}
                                    fieldName="files"
                                    type="array"
                                    defaultTypefield="string"
                                    translate={this.props.translate}
                                    textAdd={this.props.translate.form.textAddAttachment}
                                    description={this.props.translate.form.nonValidOption}
                                />
                            </Form.Item>
                        </Collapse.Panel>
                        <Collapse.Panel forceRender={true} key={"3"}  {...addPropsPanel}
                                        header={<Tooltip  placement="topRight"
                                                    title={this.props.translate.tooltip.answerOptions}
                                                    getPopupContainer={(trigger) => { return trigger.parentNode ; }}
                                                >
                                                    {this.props.translate.form.formNewAnswerOptions} <Icon type="question-circle-o" />
                                                </Tooltip>}
                        >
                            <Form.Item hasFeedback label={ false } >
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
                        </Collapse.Panel>
                        </Collapse>
                        <Form.Item style={{paddingTop:'15px',paddingBottom:'15px',paddingLeft:'30px' }} >
                            <Button type="primary" size="large" onClick={this.onSubmitForm} >
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
                    </Form>
                </Col>
            </Row>
        ) ;
    }
    //
} ;

//
export const FormIntentAnswer = Form.create({ name: 'formIntentAnswer',
    mapPropsToFields(props) {
        return {
            intentAnswer:    Form.createFormField({ value: props.data.intentAnswer         || {} }),
            files:           Form.createFormField({ value: props.data.intentAnswer.files   || [] }),
            options:         Form.createFormField({ value: props.data.intentAnswer.options || [] }),
            fileDisplayType: Form.createFormField({ value: props.data.intentAnswer.fileDisplayType || "carousel" })
        };
    }
})(FormIntentAnswerBase);
//