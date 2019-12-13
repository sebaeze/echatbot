/*
*
*/
/*
*
*/
import React                   from 'react' ;
import { FiltroPais }          from '../filtros/FiltroPais' ;
import { api        }          from '../../api/api' ;
import { Row, Col, Spin, Form, Input, Button, Tooltip }   from 'antd'  ;
import Icon from 'antd/lib/icon';
// import Icon from '@ant-design/icons';
//
class FormUserInfo extends React.Component {
    constructor(props){
        super(props) ;
        this.state            = {flagSpinner:false, userInfo: this.props.userInfo, enviadoOk:false,errorMsg:[] } ;
        this.handleKeyboard   = this.handleKeyboard.bind(this)   ;
        this.formSubmit       = this.formSubmit.bind(this) ;
    }
    //
    componentDidMount(){}
    //
    //
    static getDerivedStateFromProps(newProps, state) {
        return { userInfo: newProps.userInfo } ;
    }
    //
    handleKeyboard(event){
        try {
            //
            let charCode = String.fromCharCode(event.which).toLowerCase();
            if(event.ctrlKey && charCode === 's') {
                event.preventDefault();
                this.formSubmit() ;
            }
            // For MAC we can use metaKey to detect cmd key
            if(event.metaKey && charCode === 's') {
                event.preventDefault();
                this.formSubmit() ;
            }
        } catch(errHK){
            console.dir(errHK) ;
            throw errHK ;
        }
    } ;
    //
    formSubmit(){
        try {
            //
            this.setState({flagSpinner:true,enviadoOk:false,errorMsg:[]}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.log('.....valid:: error: ') ;
                  console.dir(error) ;
                  setTimeout(() => {
                        this.setState({flagSpinner:false,enviadoOk:false,errorMsg: Object.values(error) }) ;
                    }, 700 ) ;
              } else {
                api.account.update(this.props.form.getFieldsValue() )
                    .then((respUpd)=>{
                        setTimeout(() => {
                            this.setState({flagSpinner:false,enviadoOk:true}) ;
                        }, 700 ) ;
                    })
                    .catch((respErr)=>{
                        console.log('.....respuesta ERROR desde update account:: ') ;
                        console.dir(respErr) ;
                        setTimeout(() => {
                            this.setState({flagSpinner:false,enviadoOk:false}) ;
                        }, 700 ) ;
                    }) ;
              }
            });
        } catch(errFS){
            console.dir(errFS) ;
        }
    }
    //
    render(){
        //
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'140px'} : {} ;
        return(
            //
            <Row id="idFormContacto" onKeyDown={this.handleKeyboard}>
                <Col xs={3}  md={3}  lg={5} xl={5} xxl={5}></Col>
                <Col xs={16} md={16} lg={14} xl={14} xxl={14}>
                    <Form onSubmit={(argEV)=>{argEV.preventDefault();this.formSubmit();}} style={ {...estiloForm} } >
                        <Row style={{marginTop:'20px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item name='name' rules={[{ required: true, message: 'Por favor, escriba su nombre', whitespace: true }]}
                                    label={ <span>{this.props.translate.form.name}<Tooltip  placement="bottomRight" title="¿ Cuál es su nombre o cómo le gusta que lo llamen ?"> 
                                    <Icon type="question-circle-o" /> </Tooltip> </span> }
                                >
                                    <Input allowClear size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item name='lastName' rules={ [{ required: true, message: 'Por favor, escriba su apellido', whitespace: true }]}
                                    label={ <span>{this.props.translate.form.lastName}</span> }
                                >
                                    <Input allowClear size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={21} xl={21} xxl={21}>
                                <Form.Item label="E-mail" name='email' rules={[{type: 'email',message: 'Email incorrecto.',},{required: true,message: 'Por favor, ponga un email correcto.',}]} >
                                    <Input allowClear size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={21} xl={21} xxl={21}>
                                <Form.Item name='address' label={ <span>{this.props.translate.form.address}</span> } >
                                    <Input allowClear size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item  name='city' label={ <span>{this.props.translate.form.city}</span> } >
                                    <Input allowClear size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item  name='state' label={ <span>{this.props.translate.form.state}</span> } rules={[{ message: 'Por favor, escriba su apellido', whitespace: true }]} >
                                    <Input allowClear size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item  label={ <span className="ant-form-item-required">{this.props.translate.form.country}</span> } >
                                    <FiltroPais  id={"idFiltroPais"} style={{width:'100%'}}
                                                form={this.props.form}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item  name='zipCode' label={ <span>{this.props.translate.form.zipCode}</span> } rules={[{ message: 'Por favor, escriba su apellido', whitespace: true }]} >
                                    <Input allowClear size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item name='phone' rules={[{ required: false, message: 'Ingrese su número de Whatsapp / teléfono si desea recibir respuesta por Whatsapp / Teléfono ' }]}
                                    label={
                                        <span>{this.props.translate.form.phone}:
                                        <Tooltip  placement="bottomRight" title="Ingrese su número de Whatsapp / teléfono si desea recibir respuesta por Whatsapp / Teléfono ">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                        </span>
                                    }
                                >
                                    <Input allowClear size="large" style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item name='whatsapp' rules={[{ required: false, message: 'Ingrese su número de Whatsapp si desea recibir respuesta por Whatsapp' }]}
                                    label={<span>Whatsapp:
                                        <Tooltip  placement="bottomRight" title="Ingrese su número de Whatsapp / teléfono si desea recibir respuesta por Whatsapp / Teléfono ">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                        </span>
                                    }
                                >
                                    <Input allowClear size="large" style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={21} xl={21} xxl={21}>
                                <Form.Item name='description' label={ <span>{this.props.translate.form.description}</span> } rules={ [{ required: false, message: 'Comentarios adicionales', whitespace: true }]} >
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item>
                                    {
                                        this.state.flagSpinner==true ?
                                            <Spin size="large" />
                                            :
                                            <Button type="primary" size={"large"} htmlType="submit" style={{padding:'0',margin:'0',width:'200px'}} >
                                                {this.props.translate.form.savechanges}
                                            </Button>
                                    }
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
                </Col>
            </Row>
        ) ;
    }
    //
} ;
/*
const WrappedFormUserInfo = Form.create({ name: '',
    mapPropsToFields(props) {
        return {
            email: Form.createFormField({ value: props.userInfo.email }),
            name: Form.createFormField({ value: props.userInfo.name }),
            lastName: Form.createFormField({ value: props.userInfo.lastName }),
            country: Form.createFormField({ value: props.userInfo.country }),
            state: Form.createFormField({ value: props.userInfo.state }),
            city: Form.createFormField({ value: props.userInfo.city }),
            zipCode: Form.createFormField({ value: props.userInfo.zipCode }),
            address: Form.createFormField({ value: props.userInfo.address }),
            phone: Form.createFormField({ value: props.userInfo.phone }),
            whatsapp: Form.createFormField({ value: props.userInfo.whatsapp }),
            description: Form.createFormField({ value: props.userInfo.description })
        };
    }
})(FormUserInfo);
export default WrappedFormUserInfo ;
*/
export default FormUserInfo ;
//