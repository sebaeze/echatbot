/*
* FormNewIntent
*/
import React                     from 'react' ;
import { FormDynamicInputText }  from  './FormDynamicInputText' ;
import { Row, Col, Tag , Form, Input, Button, Tooltip, Modal, Select, Typography }   from 'antd'  ;
import Icon from '@ant-design/icons';
//
const { Title } = Typography ;
//
//class FormNewIntentWithModal extends React.Component {
export class FormNewIntent extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode          = false ;
        this.state              = {flagSpinner:false, modalVisible: this.props.modalVisible, enviadoOk:false, accessList:{} } ;
        this.handleSelectChange = this.handleSelectChange.bind(this) ;
        this.onAcceptNewChatbot = this.onAcceptNewChatbot.bind(this) ;
        // console.log('....FormNewIntentWithModal:: constructor: ') ;
    }
    //
    componentDidMount(){
        const { resetFields } = this.props.form ;
        // resetFields({names:['intentLanguage','intentName','intentExamples','intentDomain','intentAnswer']}) ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        /*
        console.log('....FormNewIntentWithModal:: getDerivedStateFromProps: ') ;
        console.dir(newProps) ;
        */
        return { modalVisible: newProps.modalVisible } ;
    }
    //
    handleSelectChange(value){
        this.props.form.setFieldsValue({
            intentLanguage: value
        });
    };
    //
    onAcceptNewChatbot(argEE){
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
                  let tempValues = this.props.form.getFieldsValue() ;
                  this.props.onAccept( tempValues ) ;
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
//        console.log('....FormNewIntentWithModal:: render: ') ;
        //
        return(
            //
            <div id="waiboc-id-new-intent">
                <Modal
                title={
                    <Title level={3} style={{textAlign:'center', padding:'5px 5px 5px 5px'}}>{this.props.translate.newIntent}</Title>
                }
                maskClosable={false}
                style={{border:'0.5px dotted gray',marginTop:'25px',zIndex:'9992'}}
                bodyStyle={{paddingTop:'0'}}
                visible={this.state.modalVisible}
                onOk={this.onAcceptNewChatbot}
                onCancel={(argEC)=>{resetFields(); this.props.onCancelModal(argEC);}}
                cancelButtonProps={{ disabled: false }}
            >
                <Form className="waiboc-form-modal" onSubmit={(argEV)=>{argEV.preventDefault()}} style={ {...estiloForm} } >
                        <Row >
                            <Form.Item
                                hasFeedback
                                label={ <span>
                                            Intent {this.props.translate.form.name}
                                            <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.intentName} >
                                            <Icon type="question-circle-o" /> </Tooltip>
                                        </span>}
                            >
                                {getFieldDecorator('intentName', { rules: [{ required: true, message: 'Please, write a name that identify the intent', whitespace: true }], })
                                (<Input allowClear size="large" ref={(argRef)=>{ argRef.focus(); }} />)}
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
                        <Row style={{marginTop:'5px'}}>
                            <Form.Item
                                label={ <span>{this.props.translate.form.intentExamples}
                                            <Tooltip  placement="topRight" title={this.props.translate.tooltip.chatbotAccesslist}>
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
                                    />
                                }
                            </Form.Item>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Form.Item
                                label={ <span>{this.props.translate.form.intentExamples}
                                            <Tooltip  placement="topRight" title={this.props.translate.tooltip.intentAnswer}>
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                            >
                                {
                                    <FormDynamicInputText
                                        form={this.props.form}
                                        textPlaceholder="hello!, This is an answer !"
                                        fieldName="intentAnswer"
                                        type="array"
                                        defaultTypefield="intentAnswer"
                                        textAdd={this.props.translate.form.intentAnswer}
                                        description={this.props.translate.form.intentAnswer}
                                    />
                                }
                            </Form.Item>
                        </Row>
                </Form>
            </Modal>
            </div>
            //
        ) ;
    }
    //
} ;
/*
export const FormNewIntent = Form.create({ name: '',
    mapPropsToFields(props) {
        return {
            intentLanguage: Form.createFormField({ value: props.data.intentLanguage ||'es'}),
            intentName:     Form.createFormField({ value: props.data.intentName     ||''  }),
            intentExamples: Form.createFormField({ value: props.data.intentExamples ||[]  }),
            intentDomain:   Form.createFormField({ value: props.data.intentDomain   ||''  }),
            intentAnswer:   Form.createFormField({ value: props.data.intentAnswer   ||[]  })
        };
    }
})(FormNewIntentWithModal);
*/
//