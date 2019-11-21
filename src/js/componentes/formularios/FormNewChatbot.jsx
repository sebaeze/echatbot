/*
* FormNewChatbot
*/
import React                     from 'react' ;
import { FormDynamicInputText }  from  './FormDynamicInputText' ;
import { Row, Col, Tag , Form, Input, Button, Tooltip, Icon, Modal, Select, Typography }   from 'antd'  ;
//
const { Title } = Typography ;
//
class FormNewChatbotWithModal extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode          = false ;
        this.state              = {flagSpinner:false, modalVisible: this.props.modalVisible, enviadoOk:false, accessList:{} } ;
        this.handleSelectChange = this.handleSelectChange.bind(this) ;
        this.onAcceptNewChatbot = this.onAcceptNewChatbot.bind(this) ;
    }
    //
    componentDidMount(){
        const { resetFields } = this.props.form ;
        resetFields({names:['botSubtitle','botIcon','botSubtitle','description']}) ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        return { modalVisible: newProps.modalVisible } ;
    }
    //
    handleSelectChange(value){
        this.props.form.setFieldsValue({
            language: value
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
                  this.props.sel( tempValues ) ;
                  //
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
        const { getFieldDecorator, resetFields, getFieldsError, getFieldError } = this.props.form ;
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'140px'} : {} ;
        //
        return(
            //
            <Modal
                title={
                    <Title level={2} style={{textAlign:'center'}}>{this.props.translate.newChatbot}</Title>
                }
                style={{border:'0.5px dotted gray',marginTop:'25px',zIndex:'9992'}}
                visible={this.state.modalVisible}
                onOk={this.onAcceptNewChatbot}
                onCancel={(argEC)=>{resetFields(); this.props.onCancelModal(argEC);}}
                //okButtonProps={!hasErrors(getFieldsError())}
                cancelButtonProps={{ disabled: false }}
            >
                <Form id="idFormNewChatbot" onSubmit={(argEV)=>{argEV.preventDefault()}} style={ {...estiloForm} } >
                        <Row >
                            <Form.Item
                                hasFeedback
                                label={ <span>Chatbot {this.props.translate.form.name}<Tooltip  placement="bottomRight" title={this.props.translate.tooltip.chatbotName} > <Icon type="question-circle-o" /> </Tooltip> </span> }
                            >
                                {getFieldDecorator('botName', { rules: [{ required: true, message: 'Please, write a name for the Bot', whitespace: true }], })
                                (<Input allowClear size="large" ref={(argRef)=>{ argRef.focus(); }} />)}
                            </Form.Item>
                        </Row>
                        <Row >
                            <Form.Item
                                label={ <span>{this.props.translate.form.selectLanguage}</span> }
                            >
                                {getFieldDecorator('language', { rules: [{ required: true, message: 'Please, choose the language', whitespace: true }], })
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
                                label={ <span>{this.props.translate.form.accessList}
                                            <Tooltip  placement="topRight" title={this.props.translate.tooltip.chatbotAccesslist}>
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                            >
                                {
                                    <FormDynamicInputText
                                        form={this.props.form}
                                        fieldName="accessList" type="email"
                                        description={this.props.translate.form.accessList}
                                    />
                                }
                            </Form.Item>
                        </Row>
                        <Row >
                            <Form.Item  label={ <span>{this.props.translate.form.description}</span> } hasFeedback >
                                {getFieldDecorator('description', { rules: [{ required: true, message: 'Please, add a brief description of the Bot', whitespace: true }], })
                                (<Input.TextArea />)}
                            </Form.Item>
                            <Form.Item>
                                {
                                    this.state.enviadoOk==true    ? <Icon type="smile" style={{fontSize:'35px',marginLeft:'25px'}} theme="twoTone" twoToneColor="#52c41a" /> : null
                                }
                            </Form.Item>
                        </Row>
                </Form>
            </Modal>
            //
        ) ;
    }
    //
} ;
//
export const FormNewChatbot = Form.create({ name: '',
    mapPropsToFields(props) {
        return {
            botName:     Form.createFormField({ value: '' }),
            botSubtitle: Form.createFormField({ value: '' }),
            language:    Form.createFormField({ value: 'es' }),
            plan:        Form.createFormField({ value: 'FREE' }),
            botIcon:     Form.createFormField({ value: '' }),
            botSubtitle: Form.createFormField({ value: '' }),
            description: Form.createFormField({ value: '' })
        };
    }
})(FormNewChatbotWithModal);
//
//export default WrappedFormNewChatbot ;
//