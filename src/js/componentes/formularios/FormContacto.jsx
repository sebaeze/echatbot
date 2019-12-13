/*
*
*/
import React                                                    from 'react' ;
import { Row, Col, Spin, Form, Input, Button, Tooltip, Icon, Modal }   from 'antd'  ;
import { enviarConsulta }                                       from '../../api/api' ;
//
import '../../../css/estilosContacto.css' ;
//
class FormContacto extends React.Component {
    constructor(props){
        super(props) ;
        this.state            = {flagSpinner:false, flagEnviada: false, flagPantContacto:((this.props.match && this.props.match.isExact) ? true : false )} ;
        this.onSubmitConsulta = this.onSubmitConsulta.bind(this) ;
        this.onClickOkModal   = this.onClickOkModal.bind(this)   ;
        this.onclickCancel    = this.onclickCancel.bind(this)    ;
    }
    //
    componentWillMount(){}
    //
    onSubmitConsulta(argEventCont){
        try {
            argEventCont.preventDefault() ;
            //
            console.log('....onSubmitConsulta:: ') ;
            let arrayInputForm = argEventCont.target.querySelectorAll('input,textarea') ;
            let objForm        = {} ;
            arrayInputForm.forEach((elemInp)=>{
                objForm[ elemInp.id ] = elemInp.value || elemInp.textContent || elemInp.innerHTML || false ;
            }) ;
            console.dir(objForm) ;
            //
        } catch(argEventCont){
            console.dir(argEventCont) ;
        }
    }
    //
    onClickOkModal(argClickOk){
        this.setState({flagEnviada:false}) ;
    } ;
    //
    onclickCancel(argClickCan){
        this.setState({flagEnviada:false}) ;
    } ;
    //
    render(){
        //
        const { getFieldDecorator, getFieldError } = this.props.form ;
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'140px'} : {} ;
        //
        const onSubmit = (e) => {
            e.preventDefault();
            this.setState({flagSpinner:true}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.log('.....valid:: error: ') ;
                  console.dir(error) ;
                  //this.setState({flagSpinner:false}) ;
                  //return null;
              } else {
                //this.setState({flagSpinner:false}) ;
                console.dir(this.props.form.getFieldsValue()) ;
                console.log('.....valid:: parece que anda bien ***') ;
                enviarConsulta( this.props.form.getFieldsValue() )
                    .then((respCC)=>{
                        console.log('....consulta enviada ok') ;
                        this.setState({flagEnviada:true}) ;
                    })
                    .catch((respErr) => {
                        console.dir(respErr) ;
                        console.log('.....error al enviar consulta') ;
                    }) ;
              }
              //
              setTimeout(() => {
                this.setState({flagSpinner:false}) ;
              }, 700 );
              //
            });
          };
        //
        return(
            //
            <Row  className="waiboc-cl-form" >
                <Col xs={3}  md={3}  lg={6} xl={6}></Col>
                <Col xs={16} md={16} lg={12} xl={12}>
                    <Modal
                        title=""
                        maskClosable={false}
                        visible={this.state.flagEnviada}
                        onOk={this.onClickOkModal.bind(this)}
                        onCancel={()=>{this.setState({flagEnviada:false});}}
                        footer={[
                            <Button key="Enviar_otra_consulta" type="primary"
                                    onClick={ () => { this.props.form.resetFields(); this.setState({flagEnviada:false}); } }
                            >
                              Enviar otra consulta
                            </Button>
                          ]}
                    >
                        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{fontSize:'32px'}} />
                        <span style={{fontSize:'32px'}} >Perfecto!</span>
                    </Modal>
                    <Form onSubmit={onSubmit} style={ {...estiloForm} }
                    >
                    <Form.Item
                        label={
                            <span>
                            Nombre
                            <Tooltip  placement="bottomRight" title="¿ Cuál es su nombre o cómo le gusta que lo llamen ?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('nombre', {
                            rules: [{ required: true, message: 'Por favor, escriba su nombre', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                type: 'email',
                                message: 'Email incorrecto.',
                            },
                            {
                                required: true,
                                message: 'Por favor, ponga un email correcto.',
                            },
                            ],
                        }
                        )(<Input />)}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                            Whatsapp / Teléfono:
                            <Tooltip  placement="bottomRight" title="Ingrese su número de Whatsapp / teléfono si desea recibir respuesta por Whatsapp / Teléfono ">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                            </span>
                        }
                    >
                    {getFieldDecorator('telefono', {
                        rules: [{ required: false, message: 'Ingrese su número de Whatsapp / teléfono si desea recibir respuesta por Whatsapp / Teléfono ' }],
                    })(<Input style={{ width: '100%' }} />)}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                            Consulta / Comentario / Propuesta:
                            <Tooltip  placement="bottomRight" title="¿ Cuál es su consulta o propuesta ? ">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('mensaje', {
                            rules: [{ required: true, message: 'Por favor, escriba su mensaje', whitespace: true }],
                        })(<Input.TextArea />)}
                    </Form.Item>
                    <Form.Item>
                        {
                            this.state.flagSpinner==true ?
                                <Spin size="large" />
                                :
                                <Button type="primary" htmlType="submit" style={{padding:'0',margin:'0',width:'100px'}} >
                                    Enviar
                                </Button>
                        }
                    </Form.Item>
                </Form>
                </Col>
            </Row>
        ) ;
    }
    //
} ;
//
const WrappedFormContacto = Form.create({ name: '' })(FormContacto);
export default WrappedFormContacto ;
//