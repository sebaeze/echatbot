/*
*
*/
import React                                                  from 'react' ;
import { Row, Col, Typography, Form, Input, Button, Spin }    from 'antd'   ;
import { enviarSuscripcion }                                  from '../../api/api' ;
//
export class FormSuscripcion extends React.Component {
    constructor(props){
        super(props) ;
        this.state = { flagSpinner: false, flagEnviado:false } ;
    }
    //
    /*
    onSubmitSuscripcionOLD(argEventEmail){
        try {
        argEventEmail.preventDefault() ;
        this.setState({flagEnviandoForm:true}) ;
        //
        let nodoTarget = argEventEmail.target ;
        nodoTarget     = nodoTarget.querySelectorAll('input[type=text]') || false ;
        if ( nodoTarget ){
            nodoTarget = (nodoTarget.length && nodoTarget.length>0) ? nodoTarget[0].value : nodoTarget.value ;
            nodoTarget = nodoTarget.trim() ;
        }
        console.dir(nodoTarget) ;
        //
        setTimeout(() => {
            this.setState({flagEnviandoForm:false,flagEnviado:true}) ;
        }, 5000 );
        //
        } catch(errSEm){
        console.dir(errSEm) ;
        }
    }
    */
    //
    render(){
        //
        const { getFieldDecorator } = this.props.form;
        const EmailAdicional        = () => {
        return(
            <div>
                <span >Gracias por suscribirte !</span>
                <Button type="link" style={{paddingLeft: '0'}}  block onClick={(argEvent)=>{
                    argEvent.preventDefault() ;
                        this.setState({flagEnviado:false}) ;
                    }}
                >
                    Agregar otro email
                </Button>
            </div>
        )} ;
        //
        const onSubmitSuscripcion = (e) => {
            e.preventDefault();
            this.setState({flagSpinner:true}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.dir(error) ;
                  console.log('.....valid:: error: ') ;
                  setTimeout(() => {
                    this.setState({flagSpinner:false}) ;
                  }, 700 );
              } else {
                enviarSuscripcion( this.props.form.getFieldsValue() )
                    .then((respCC)=>{
                        console.log('....suscripcion enviada ok') ;
                        setTimeout(() => {
                            this.setState({flagSpinner:false, flagEnviado:true}) ;
                        }, 700 );
                    })
                    .catch((respErr) => {
                        console.dir(respErr) ;
                        console.log('.....error al enviar suscripcion') ;
                        this.setState({flagSpinner:false}) ;
                    }) ;
              }
              //
            });
          };
        //
        return(
            <div>
                {
                    this.state.flagSpinner ?
                        <Spin size="large" />
                        :
                        this.state.flagEnviado ?
                            <EmailAdicional />
                            :
                            <Form onSubmit={onSubmitSuscripcion} >
                                <Form.Item>
                                    {getFieldDecorator('email', {
                                            rules: [
                                            {
                                                type: 'email',
                                                message: 'E-mail invalido!',
                                            },
                                            {
                                                required: true,
                                                message: 'Por favor, introduzca un email valido',
                                            },
                                            ],
                                        })(<Input placeholder="email@com.ar" />)}
                                        <Button htmlType="submit" style={{backgroundColor:'#49B6F9'}}>Suscribirme</Button>
                                </Form.Item>
                            </Form>
                }
            </div>
        ) ;
    }
    //
} ;
//
const WrappedFormSuscripcion = Form.create({ name: '' })(FormSuscripcion);
export default WrappedFormSuscripcion ;
//