/*
* FormNewChatbot
*/
import React                     from 'react' ;
import { FormDynamicInputText }  from  './FormDynamicInputText' ;
import { Row, Col, Tag , Form, Input, Button, Tooltip, Icon, Drawer, Select, Typography }   from 'antd'  ;
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
        if ( newProps.modalVisible!=state.modalVisible ){
            let newDerivedState = {
                modalVisible: newProps.modalVisible
                /*
                flagNewIntent: newProps.flagNewIntent,
                dataNewIntent: newProps.modalVisible==true ? {...newProps.data} : {...INTENT_DEF}
                */
            } ;
            return {...newDerivedState} ;
        } else {
            return false ;
        }
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
                  if ( tempValues.websiteDomains.length>0 ){
                      for ( let ixws=0; ixws<tempValues.websiteDomains.length; ixws++ ){
                          let tempUrl = tempValues.websiteDomains[ixws] ;
                          let posBus  = tempUrl.toUpperCase().indexOf('WWW.') ;
                          if ( posBus!=-1 ){
                            tempUrl = tempUrl.substr(posBus) ;
                          }
                          posBus  = tempUrl.indexOf('/') ;
                          if ( posBus!=-1 ){
                            let arrayDiv = tempUrl.split('/') ;
                            if ( arrayDiv[0]=="/" ){
                                tempUrl = arrayDiv[1] ;
                            } else {
                                tempUrl = arrayDiv[0] ;
                            }
                          }
                      }
                  }
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
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'80px'} : {} ;
        /*
            <Modal
                title={
                    <Title level={2} style={{textAlign:'center'}}>{this.props.translate.newChatbot}</Title>
                }
                maskClosable={false}
                style={{border:'0.5px dotted gray',marginTop:'25px',zIndex:'9992'}}
                visible={this.state.modalVisible}
                onOk={this.onAcceptNewChatbot}
                onCancel={(argEC)=>{resetFields(); this.props.onCancelModal(argEC);}}
                //okButtonProps={!hasErrors(getFieldsError())}
                cancelButtonProps={{ disabled: false }}
            >
        */
        return(
            <Drawer
                title={ <Title level={2} > <Icon type="edit" /> <u>{this.props.translate.newChatbot}</u> </Title> }
                width={ (window.innerWidth<797) ? '99%' : '70%' }
                placement="left"
                closable={true}
                className="waiboc-drawer"
                style={{border:'0.5px dotted gray',marginTop:'25px',zIndex:'9992'}}
                bodyStyle={{paddingTop:'0'}}
                headerStyle={{padding:'5px 5px 5px 5px'}}
                visible={this.state.modalVisible}
                onCancel={(argEC)=>{this.props.onCancelModal(argEC);}}
                onClose={(argEC)=>{this.props.onCancelModal(argEC);}}
                footer={null}
            >
                <Form  className="waiboc-cl-form" onSubmit={(argEV)=>{argEV.preventDefault()}} style={ {...estiloForm} } >
                        <Row >
                            <Form.Item
                                hasFeedback
                                label={ <Tooltip className="waiboc-form-label" placement="bottomRight" title={this.props.translate.tooltip.chatbotName} >
                                            Chatbot {this.props.translate.form.name}
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    }
                            >
                                {getFieldDecorator('botName', { rules: [{ required: true, message: 'Please, write a name for the Bot', whitespace: true }], })
                                (<Input allowClear className="waiboc-cl-names" size="large" ref={(argRef)=>{ argRef.focus(); }} />)}
                            </Form.Item>
                        </Row>
                        <Row >
                            <Form.Item
                                label={ <span className="waiboc-form-label" >{this.props.translate.form.selectLanguage}</span> }
                                labelCol={{xs:24, md: 24, lg: 24, xl: 24, xxl: 24}}
                                wrapperCol={{xs:24, md: 24, lg: 10, xl: 10, xxl: 10}}
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
                                label={ <Tooltip className="waiboc-form-label"  placement="topRight" title={this.props.translate.tooltip.chatbotAccesslist}>
                                            {this.props.translate.form.accessList}
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    }
                                labelCol={{xs:24, md: 24, lg: 24, xl: 24, xxl: 24}}
                                wrapperCol={{xs:24, md: 24, lg: 16, xl: 16, xxl: 16}}
                            >
                                {
                                    <FormDynamicInputText
                                        form={this.props.form}
                                        textPlaceholder="email@mywebsite.com"
                                        fieldName="accessList"
                                        type="array"
                                        defaultTypefield="email"
                                        textAdd={this.props.translate.form.textAddEmail}
                                        description={this.props.translate.form.nonValidAccessList}
                                    />
                                }
                            </Form.Item>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Form.Item
                                label={ <Tooltip className="waiboc-form-label"  placement="topRight" title={this.props.translate.tooltip.websiteDomains}>
                                            {this.props.translate.form.websiteDomains}
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    }
                            >
                                {
                                    <FormDynamicInputText
                                        form={this.props.form}
                                        textPlaceholder="www.mywebsite.com"
                                        fieldName="websiteDomains"
                                        type="array"
                                        defaultTypefield="string"
                                        textAdd={this.props.translate.form.textAddWebsite}
                                        description={this.props.translate.form.nonValidwebsiteDomains}
                                    />
                                }
                            </Form.Item>
                        </Row>
                        <Form.Item  label={ <span className="waiboc-form-label"  >{this.props.translate.form.description}</span> } hasFeedback >
                            {getFieldDecorator('description', { rules: [{ required: true, message: 'Please, add a brief description of the Bot', whitespace: true }], })
                            (<Input.TextArea />)}
                        </Form.Item>
                        <Form.Item>
                            <Button.Group size="large" >
                                <Button type="primary" onClick={this.onAcceptNewChatbot}>
                                    Accept
                                </Button>
                                <Button onClick={ (argEC)=>{resetFields(); this.props.onCancelModal(argEC);} }>
                                    Cancel
                                </Button>
                            </Button.Group>
                        </Form.Item>
                        <Form.Item>
                            {
                                this.state.enviadoOk==true    ? <Icon type="smile" style={{fontSize:'35px',marginLeft:'25px'}} theme="twoTone" twoToneColor="#52c41a" /> : null
                            }
                        </Form.Item>
                </Form>
            </Drawer>
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
            description: Form.createFormField({ value: '' }),
            websiteDomains: Form.createFormField({ value: [] })
        };
    }
})(FormNewChatbotWithModal);
//
//export default WrappedFormNewChatbot ;
//