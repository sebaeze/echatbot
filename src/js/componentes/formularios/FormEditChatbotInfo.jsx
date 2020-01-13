/*
* FormEditChatbotInfo
*/
import React                     from 'react' ;
import { FormDynamicInputText }  from  './FormDynamicInputText' ;
import { Row, Col, Tag , Form, Input, Button, Tooltip, Icon, Select, Typography  }   from 'antd'  ;
//
const { Title } = Typography ;
//
class FormEditChatbotInfoBase extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode          = false ;
        this.state              = {flagSpinner:false, modalVisible: this.props.modalVisible, enviadoOk:false, accessList:{} } ;
        this.handleKeyboard     = this.handleKeyboard.bind(this)   ;
        this.submitFormChanges  = this.submitFormChanges.bind(this)  ;
        this.handleSelectChange = this.handleSelectChange.bind(this) ;
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
    handleKeyboard(event){
        try {
            //
            let charCode = String.fromCharCode(event.which).toLowerCase();
            if(event.ctrlKey && charCode === 's') {
                event.preventDefault();
                this.submitFormChanges() ;
            }
            // For MAC we can use metaKey to detect cmd key
            if(event.metaKey && charCode === 's') {
                event.preventDefault();
                this.submitFormChanges() ;
            }
        } catch(errHK){
            console.dir(errHK) ;
            throw errHK ;
        }
    } ;
    //
    submitFormChanges(){
        this.props.form.validateFields((err, values) => {
            if (!err) {
            this.props.onSubmitChanges( values ) ;
            }
        }) ;
    }
    //
    render(){
        //
        const { getFieldDecorator, resetFields, getFieldsError, getFieldError } = this.props.form ;
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'140px'} : {} ;
        //
        return(
            //
            <div onKeyDown={this.handleKeyboard} >
            <Form className="waiboc-cl-form"  onSubmit={(argEV)=>{argEV.preventDefault()}} style={ {...estiloForm} } >
                <Row >
                    <Col xs={24} md={24} lg={16} xl={16} xxl={16}>
                        <Form.Item
                            hasFeedback
                            label={ <span>
                                        Chatbot {this.props.translate.form.name}
                                        <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.chatbotName} ><Icon type="question-circle-o" /> </Tooltip>
                                    </span>}
                        >
                            {getFieldDecorator('botName', { rules: [{ required: true, message: 'Please, write a name for the Bot', whitespace: true }], })
                            (<Input allowClear size="large" className="waiboc-cl-names" ref={(argRef)=>{ argRef.focus(); }} />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row >
                    <Col xs={24} md={24} lg={10} xl={8} xxl={8}>
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
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col xs={24} md={24} lg={14} xl={14} xxl={14}>
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
                                    textPlaceholder="email@mywebsite.com"
                                    dataForm={this.props.accessList}
                                    fieldName="accessList"
                                    type="array"
                                    defaultTypefield="email"
                                    textAdd={this.props.translate.form.textAddEmail}
                                    description={this.props.translate.form.nonValidAccessList}
                                />
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                        <Form.Item
                            label={ <span>
                                        {this.props.translate.form.websiteDomains}
                                        <Tooltip  placement="topRight" title={this.props.translate.tooltip.websiteDomains}>
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }
                        >
                            <Col xs={24} md={24} lg={14} xl={14} xxl={14}>
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
                            </Col>
                        </Form.Item>
                </Row>
                <Row >
                    <Col xs={24} md={24} lg={14} xl={14} xxl={14}>
                        <Form.Item  label={ <span>{this.props.translate.form.description}</span> } hasFeedback >
                            {getFieldDecorator('description', { rules: [{ required: true, message: 'Please, add a brief description of the Bot', whitespace: true }], })
                            (<Input.TextArea />)}
                        </Form.Item>
                        <Form.Item>
                            {
                                this.state.enviadoOk==true    ? <Icon type="smile" style={{fontSize:'35px',marginLeft:'25px'}} theme="twoTone" twoToneColor="#52c41a" /> : null
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col xs={18} md={18} lg={10} xl={8} xll={8} >
                        <Button type="primary" size={"large"} style={{marginLeft:'10%'}} className="btn-edit-menu"
                                onClick={ (argEEV)=>{
                                    argEEV.preventDefault() ;
                                    this.submitFormChanges() ;
                                } }
                        >
                            {this.props.translate.form.savechanges}
                        </Button>
                    </Col>
                </Row>
            </Form>
            </div>
            //
        ) ;
    }
    //
} ;
//
export const FormEditChatbotInfo = Form.create({ name: '',
    mapPropsToFields(propsForm) {
        return {
            accessList:  Form.createFormField({ value: propsForm.chatbotConfig.accessList  }),
            botName:     Form.createFormField({ value: propsForm.chatbotConfig.botName     }),
            botSubtitle: Form.createFormField({ value: propsForm.chatbotConfig.botSubtitle }),
            language:    Form.createFormField({ value: propsForm.chatbotConfig.language    }),
            plan:        Form.createFormField({ value: propsForm.chatbotConfig.plan        }),
            botIcon:     Form.createFormField({ value: propsForm.chatbotConfig.botIcon     }),
            description: Form.createFormField({ value: propsForm.chatbotConfig.description }),
            websiteDomains: Form.createFormField({ value: propsForm.chatbotConfig.websiteDomains })
        };
    }
})(FormEditChatbotInfoBase);
//