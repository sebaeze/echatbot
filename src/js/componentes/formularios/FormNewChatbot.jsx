/*
* FormNewChatbot
*/
import React                     from 'react' ;
import { Row, Col, Form, Input, Button, Tooltip, Icon, Drawer, Select, Typography }   from 'antd'  ;
//
const { Title } = Typography ;
class FormNewChatbotWithModal extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode          = false ;
        this.inputNameRef       = false ;
        this.state              = { flagSpinner:false, modalVisible: this.props.modalVisible, enviadoOk:false, accessList:{} } ;
        this.handleSelectChange = this.handleSelectChange.bind(this) ;
        this.closeDrawer        = this.closeDrawer.bind(this) ;
        this.onAcceptNewChatbot = this.onAcceptNewChatbot.bind(this) ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        if ( newProps.modalVisible!=state.modalVisible ){
            let newDerivedState = {
                modalVisible: newProps.modalVisible
            } ;
            return {...newDerivedState} ;
        } else {
            return false ;
        }
    }
    //
    closeDrawer(argEE){
        if ( argEE && argEE.preventDefault ){ argEE.preventDefault(); }
        this.props.form.resetFields() ;
        this.props.onCancelModal() ;
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
                  if ( tempValues.websiteDomains && tempValues.websiteDomains.length>0 ){
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
        const { getFieldDecorator, resetFields } = this.props.form ;
        return(
            <Drawer
                title={ <Title level={2} > <Icon type="edit" /> <u>{this.props.translate.newChatbot}</u> </Title> }
                width={ (window.innerWidth<797) ? '99%' : '60%' }
                destroyOnClose={true}
                placement="right"
                closable={false}
                className="waiboc-drawer"
                style={{border:'0.5px dotted gray',marginTop:'1px',zIndex:'9992'}}
                bodyStyle={{paddingTop: (window.innerWidth<797) ? '5px' : '50px' }}
                headerStyle={{padding:'5px 5px 5px 5px'}}
                visible={this.state.modalVisible}
                onCancel={this.closeDrawer}
                onClose={this.closeDrawer}
            >
                <Form  className="waiboc-cl-form" onSubmit={(argEV)=>{argEV.preventDefault()}} >
                        <Row >
                            <Form.Item
                                hasFeedback
                                labelCol={{xs:24,md:24,lg:8,xl:8,xxl:8}}
                                wrapperCol={{xs:24,md:24,lg:12,xl:12,xxl:12}}
                                label={ <Tooltip className="waiboc-form-label" placement="bottomRight" title={this.props.translate.tooltip.chatbotName} >
                                            Chatbot {this.props.translate.form.name}
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    }
                            >
                                {getFieldDecorator('botName', { rules: [{ required: true, message: 'Please, write a name for the Bot', whitespace: true }], })
                                ( <Input    allowClear autoFocus className="waiboc-cl-names" size="large"
                                            ref={
                                                (argRef)=>{
                                                    if ( argRef && this.inputNameRef==false ){
                                                        this.inputNameRef = argRef ;
                                                        setTimeout(() => argRef.focus(), 0) ;
                                                    }
                                                }
                                            }
                                 /> )}
                            </Form.Item>
                        </Row>
                        <Row >
                            <Form.Item
                                label={ <span className="waiboc-form-label" >{this.props.translate.form.selectLanguage}</span> }
                                labelCol={{xs:24,md:24,lg:8,xl:8,xxl:8}}
                                wrapperCol={{xs:24,md:24,lg:12,xl:8,xxl:8}}
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
                        <Form.Item
                            label={ <span className="waiboc-form-label"  >{this.props.translate.form.description}</span> } hasFeedback
                            labelCol={{xs:24,md:24,lg:8,xl:8,xxl:8}}
                            wrapperCol={{xs:24,md:24,lg:14,xl:14,xxl:14}}
                        >
                            {getFieldDecorator('description', { rules: [{ required: true, message: 'Please, add a brief description of the Bot', whitespace: true }], })
                            (<Input.TextArea />)}
                        </Form.Item>
                        <Form.Item>
                            <Col xs={24} md={24} lg={8} xl={8} xxl={8} ></Col>
                            <Col xs={24} md={24} lg={12} xl={12} xxl={12}  >
                                <Button.Group size="large" >
                                    <Button type="primary" onClick={this.onAcceptNewChatbot}>
                                        {this.props.translate.accept}
                                    </Button>
                                    <Button onClick={this.closeDrawer} >
                                        {this.props.translate.cancel}
                                    </Button>
                                </Button.Group>
                            </Col>
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