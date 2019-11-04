/*
* FormNewChatbot
*/
import React                   from 'react' ;
import { FiltroPais }          from '../filtros/FiltroPais' ;
import { api        }          from '../../api/api' ;
import { Row, Col, Spin, Form, Input, Button, Tooltip, Icon, Modal, Select, Typography }   from 'antd'  ;
//
const { Title } = Typography ;
//
class FormNewChatbotWithModal extends React.Component {
    constructor(props){
        super(props) ;
        this.state              = {flagSpinner:false, modalVisible: this.props.modalVisible, enviadoOk:false,errorMsg:[] } ;
        this.handleSelectChange = this.handleSelectChange.bind(this) ;
        this.onAcceptNewChatbot = this.onAcceptNewChatbot.bind(this) ;
    }
    //
    componentDidMount(){}
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
            this.setState({flagSpinner:true,enviadoOk:false,errorMsg:[]}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.log('.....valid:: error: ') ;
                  console.dir(error) ;
                  setTimeout(() => {
                        this.setState({flagSpinner:false,enviadoOk:false,errorMsg: Object.values(error) }) ;
                    }, 700 ) ;
              } else {
                  this.props.sel( this.props.form.getFieldsValue() ) ;
                  //this.setState({modalVisible: false}) ;
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
        const { getFieldDecorator, getFieldsError, getFieldError } = this.props.form ;
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'140px'} : {} ;
        //
        return(
            //
            <Modal
                title={
                    <Title level={2} style={{textAlign:'center'}}>{this.props.translate.newChatbot}</Title>
                }
                style={{border:'0.5px dotted gray',marginTop:'25px'}}
                visible={this.state.modalVisible}
                onOk={this.onAcceptNewChatbot}
                onCancel={this.props.onCancelModal}
                //okButtonProps={!hasErrors(getFieldsError())}
                cancelButtonProps={{ disabled: false }}
            >
                <Form id="idFormNewChatbot" onSubmit={(argEV)=>{argEV.preventDefault()}} style={ {...estiloForm} } >
                        <Row style={{marginTop:'20px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item
                                    label={ <span>Chatbot {this.props.translate.form.name}<Tooltip  placement="bottomRight" title="¿ Cuál es su nombre o cómo le gusta que lo llamen ?"> <Icon type="question-circle-o" /> </Tooltip> </span> }
                                >
                                    {getFieldDecorator('botName', { rules: [{ required: true, message: 'Please, write a name for the Bot', whitespace: true }], })
                                    (<Input allowClear size="large" />)}
                                </Form.Item>
                            </Col>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item
                                    label={ <span>{this.props.translate.form.language}</span> }
                                >
                                    {getFieldDecorator('language', { rules: [{ required: true, message: 'Please, choose the language', whitespace: true }], })
                                    (
                                        <Select
                                            placeholder={this.props.form.selectLanguage}
                                            onChange={this.handleSelectChange}
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
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={21} xl={21} xxl={21}>
                                <Form.Item  label={ <span>{this.props.translate.form.description}</span> } >
                                    {getFieldDecorator('description', { rules: [{ required: true, message: 'Please, add a brief description of the Bot', whitespace: true }], })
                                    (<Input.TextArea />)}
                                </Form.Item>
                                <Form.Item>
                                    {
                                        this.state.enviadoOk==true    ? <Icon type="smile" style={{fontSize:'35px',marginLeft:'25px'}} theme="twoTone" twoToneColor="#52c41a" /> : null
                                    }
                                    {
                                        this.state.errorMsg.length>0  ?
                                            this.state.errorMsg.map((elemErr,idxMsg)=>{
                                                let tempErrorMsg = "" ;
                                                elemErr.errors.forEach((elemMsg)=>{ tempErrorMsg += elemMsg.message ; }) ;
                                                return(
                                                    <span key={idxMsg} style={{color:'red',marginLeft:'20px'}}>{tempErrorMsg};</span>
                                                )
                                            })
                                            : null
                                    }
                                </Form.Item>
                            </Col>
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