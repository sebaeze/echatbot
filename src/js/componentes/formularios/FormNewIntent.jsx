/*
* FormNewIntent
*/
import React                     from 'react' ;
import { FormDynamicInputText }  from  './FormDynamicInputText' ;
import { FormIntentAnswer }      from './FormIntentAnswer' ;
import { Row, Form, Input, Tooltip, Icon, Modal, Select, Typography, Steps  }   from 'antd'  ;
//
const { Step  } = Steps      ;
const { Title } = Typography ;
//
class FormNewIntentWithModal extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode          = false ;
        this.state              = {
            flagSpinner:false,
            modalVisible: this.props.modalVisible,
            enviadoOk:false,
            formStep: 1,
        } ;
        this.handleSelectChange = this.handleSelectChange.bind(this) ;
        this.onAcceptNewIntent  = this.onAcceptNewIntent.bind(this) ;
        this.onNextStep         = this.onNextStep.bind(this) ;
    }
    //
    componentDidMount(){
        const { resetFields } = this.props.form ;
        resetFields({names:['botSubtitle','botIcon','botSubtitle','description']}) ;
        if ( this.firstNode ){
            this.firstNode.focus() ;
        }
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        return { modalVisible: newProps.modalVisible } ;
    }
    //
    handleSelectChange(value){
        this.props.form.setFieldsValue({
            intentLanguage: value
        });
    };
    //
    onNextStep(argNextStep){
        try {

        } catch(errNS){
            console.dir(errNS) ;
        }
    }
    //
    onAcceptNewIntent(argEE){
        try {
            //
            argEE.preventDefault() ;
            this.setState({flagSpinner:true,enviadoOk:false}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.log('.....valid:: error: ') ;
                  console.dir(error) ;
                  setTimeout(() => {
                        this.setState({flagSpinner:false,enviadoOk:false }) ;
                    }, 700 ) ;
              } else {
                  let tempValuesForm = this.props.form.getFieldsValue() ;
                  let tempValuesAcce = {
                    intentAnswer:{
                        type: tempValuesForm['answerType'] ,
                        title: tempValuesForm['answerTitle'] ,
                        text: tempValuesForm['answerText'] || '',
                        api: tempValuesForm['answerApi'] || '',
                        options: tempValuesForm['answerOptions'] ||''
                    } ,
                    intentLanguage: tempValuesForm.intentLanguage,
                    intentName: tempValuesForm.intentName,
                    intentExamples: tempValuesForm.intentExamples,
                    intentDomain: tempValuesForm.intentDomain
                  } ;
                  this.props.onAccept( tempValuesAcce ) ;
              }
            });
            //
        } catch(errNC){
            console.dir(errNC) ;
        }
    }
    //
    render(){
        //
        const { getFieldDecorator, resetFields } = this.props.form ;
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'140px'} : {} ;
        //
        const FormNewIntentName = (props) => {
            return(
                <Form onSubmit={(argEV)=>{argEV.preventDefault()}} style={ {...estiloForm} } >
                    <Row >
                        <Form.Item
                            hasFeedback
                            label={ <span>
                                        Intent
                                        <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.chatbotName} ><Icon type="question-circle-o" /> </Tooltip>
                                    </span>}
                        >
                            {getFieldDecorator('intentName', { rules: [{ required: true, message: 'Please, write a name that identify the intent', whitespace: true }], })
                            (<Input allowClear size="large" ref={(argRef)=>{ /*this.firstNode=argRef; */argRef.focus(); }} />)}
                        </Form.Item>
                    </Row>
                    <Row >
                        <Form.Item
                            label={ <span>{this.props.translate.form.selectLanguage}</span> }
                        >
                            {getFieldDecorator('intentLanguage', { rules: [{ required: true, message: 'Please, choose the language', whitespace: true }], })
                            (
                                <Select
                                    placeholder={this.props.form.selectLanguage}
                                    onChange={this.handleSelectChange}
                                    getPopupContainer={(trigger) => {
                                        return trigger.parentNode ;
                                    }}
                                >
                                    <Select.Option value="es" key="1">Español</Select.Option>
                                    <Select.Option value="en" key="2">English</Select.Option>
                                    <Select.Option value="pt" key="3">Português</Select.Option>
                                </Select>
                            )
                            }
                        </Form.Item>
                    </Row>
                </Form>
            )
        }
        //
        const FormNewIntentExamples = (props) => {
            return(
                <Form onSubmit={(argEV)=>{argEV.preventDefault()}} style={ {...estiloForm} } >
                    <Row style={{marginTop:'5px'}}>
                        <Form.Item
                            label={ <span>{this.props.translate.form.intentExamples}
                                        <Tooltip  placement="topRight" title={this.props.translate.tooltip.intentExamples}>
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }
                        >
                            {
                                <FormDynamicInputText
                                    form={this.props.form}
                                    textPlaceholder="hello!, I need info !"
                                    fieldName="intentExamples"
                                    type="array"
                                    defaultTypefield="string"
                                    textAdd={this.props.translate.form.textAddIntentExample}
                                    description={this.props.translate.form.nonValidIntentExample}
                                    translate={this.props.translate}
                                />
                            }
                        </Form.Item>
                    </Row>
                </Form>
            )
        }
        //
        const FormNewIntentAnswer = (props) => {
            return(
                <Form onSubmit={(argEV)=>{argEV.preventDefault()}} style={ {...estiloForm} } >
                    <Row style={{marginTop:'5px'}}>
                        <Form.Item
                            label={ <span>
                                        {this.props.translate.form.intentAnswer}
                                        <Tooltip  placement="topRight" title={this.props.translate.tooltip.intentAnswer}>
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }
                        >
                            {
                            <FormIntentAnswer
                                form={this.props.form}
                                data={{}}
                                translate={this.props.translate}
                                textAdd={this.props.translate.form.intentAnswer}
                                description={this.props.translate.form.intentAnswer}
                            />
                            }
                        </Form.Item>
                    </Row>
                </Form>
            )
        }
        //
        const NextStepForm = (props) => {
            return(
                this.state.formStep==1 ?
                    <FormNewIntentName />
                    :
                    this.state.formStep==2 ?
                        <FormNewIntentExamples />
                        :
                        <FormNewIntentAnswer />
            )
        }
        //
        return(
            //
            <Modal
                title={
                    <Title level={3} style={{textAlign:'center',padding:'5px 5px 5px 5px'}}>{this.props.translate.newIntent}</Title>
                }
                maskClosable={false}
                style={{border:'0.5px dotted gray',marginTop:'25px',zIndex:'9992'}}
                bodyStyle={{paddingTop:'0'}}
                headerStyle={{padding:'5px 5px 5px 5px'}}
                visible={this.state.modalVisible}
                onOk={this.onAcceptNewIntent}
                onCancel={(argEC)=>{resetFields(); this.props.onCancelModal(argEC);}}
                cancelButtonProps={{ disabled: false }}
            >
                <div className="waiboc-cl-form" >
                    <div style={{marginTop:'10px',marginBottom:'10px'}}>
                        <Steps size="small" current={1}>
                            <Step title="Nombre" />
                            <Step title="Examples" />
                            <Step title="Answer" />
                        </Steps>
                    </div>
                    <NextStepForm />
                </div>
            </Modal>
            //
        ) ;
    }
    //
} ;
//
export const FormNewIntent = Form.create({ name: '',
    mapPropsToFields(props) {
        return {
            intentLanguage: Form.createFormField({ value: props.data.intentLanguage ||'es'}),
            intentName:     Form.createFormField({ value: props.data.intentName     ||''  }),
            intentExamples: Form.createFormField({ value: props.data.intentExamples ||[]  }),
            intentDomain:   Form.createFormField({ value: props.data.intentDomain   ||''  }),
            intentAnswer:   Form.createFormField({ value: props.data.intentAnswer   ||''  })
        };
    }
})(FormNewIntentWithModal);
//