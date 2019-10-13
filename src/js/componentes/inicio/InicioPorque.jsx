/*
*
*/
import React                                      from 'react' ;
import { Row, Col, Carousel, Typography }         from 'antd'  ;
import {ImagenConDescripcion}                     from './ImagenConDescripcion' ;
import QueueAnim                                  from 'rc-queue-anim' ;
import { AnimacionLink }                          from '../animacion/AnimacionLink' ;
//
const { Title, Paragraph }  = Typography ;
//
export class InicioPorque extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {isMobile: (window.innerWidth<797),showDiv: this.props.flagShowDiv ? this.props.flagShowDiv : false } ;
    }
    //
    componentDidMount(){
        try{
            //
            window.addEventListener("resize",function(argEventSCR){
                this.setState({isMobile: (window.innerWidth<797)});
            }.bind(this)) ;
            //
        } catch(errDM){
            console.dir(errDM) ;
        }
    }
    //
    componentWillReceiveProps(newProps){
        try {
            if ( newProps.flagShowDiv!=this.state.showDiv ){
                this.setState({showDiv:newProps.flagShowDiv}) ;
            }
        } catch(errNewP){
            console.dir(errNewP) ;
        }
    }
    //
    render(){
        //
        let posY = this.state.isMobile==true ? 10 : 50 ;
        //
        return(
            <Row style={{paddingTop:'45px'}}>
                <Title key="0" style={{textAlign:'center'}}>Solución tecnologica:</Title>
                <Row>
                    <QueueAnim
                        animConfig={[
                            [{ x: [40, 20], opacity: [1, 0] }, { y: [ posY, 0] }],
                            [{ x: [40, 500]                 }, { y: [ posY, -50], opacity: [1, 0] }],
                            ]}
                            ease="easeInOutQuart"
                    >
                            {
                                this.state.showDiv ? [
                                        <Col xs={20} md={20} lg={6} xxl={6} key="0">
                                            <Title level={4}>Dialogos Predefinidos</Title>
                                            <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                                            Reutilización de dialogos pre-definidos para su asistente conversational
                                            </Paragraph>
                                        </Col>,
                                        <Col xs={1} md={1} lg={1} xl={1} xxl={1} key="1"></Col>,
                                        <Col xs={20} md={20} lg={20} xl={6} xxl={6} key="2">
                                            <Title level={4}>API de integración</Title>
                                            <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                                            Utilize nuestro potente APi para integrar nueva funcionalidad
                                            </Paragraph>
                                        </Col>,
                                        <Col xs={1} md={1} lg={1} xl={1} xxl={1} key="3"></Col>,
                                        <Col xs={20} md={20} lg={20} xl={6} xxl={6} key="4">
                                            <Title level={4}>De lado de los desarrolladores</Title>
                                            <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                                            Estamos orientados a ayudar a desarrolladores a involucrarse en el mundo de chatbots y AI
                                            </Paragraph>
                                        </Col>
                                ] : []
                            }
                        </QueueAnim>
                    </Row>
                    <Row>
                        <div className="btn-continuar" style={{marginLeft: (this.state.isMobile==true ? '7%' : '2%'),marginTop: (this.state.isMobile==true ? '8vh' : '30vh' ),width:'auto'}} >
                            <AnimacionLink texto={"Portal de ayuda"} siguienteDiv={this.props.siguienteDiv} />
                        </div>
                    </Row>
            </Row>
        ) ;
    }
    //
} ;