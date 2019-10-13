/*
*
*/
import React                                    from 'react' ;
import { Row, Col, Typography, Icon, Table }    from 'antd'  ;
import BannerAnim, { Element }           from 'rc-banner-anim';
import TweenOne                          from 'rc-tween-one';
import { MapaDistribuidores }            from './MapaDistribuidores' ;
import { AnimacionLink }                 from './animacion/AnimacionLink' ;
import { ImageLoader }                   from './image/ImageLoader' ;
//
import 'rc-banner-anim/assets/index.css';
const BgElement        = Element.BgElement;
const { Title, Text }  = Typography ;
//
export class CuerpoDistribuidores extends React.Component {
    constructor(props){
        super(props) ;
        this.idMapa     = "idMapaDistribuidores" ;
        this.state      = {isMobile: (window.innerWidth<797)} ;
        this.imgMedidas = {width:(this.state.isMobile==true ? '300px' : '450px' ),height:'auto'} ;
    }
    //
    componentDidMount(){
        try {
            window.addEventListener("resize",function(argEventSCR){
                this.setState({isMobile: (window.innerWidth<797)});
            }.bind(this)) ;
        } catch(errDM){
            console.dir(errDM) ;
        }
    }
    //
    render(){
        //
        return(
            <div id="idCuerpoDistribuidores" style={{paddingTop:'120px'}}>
                <div style={{minHeight:'80vh'}} >
                    <Row>
                        <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                        <Col xs={25} md={25} lg={13} xl={13} xxl={13}>
                            <div style={{paddingTop:(this.state.isMobile==true ? '10px' : '150px' ),paddingLeft:'10px',paddingRight:'10px'}}>
                                <Title>¿ Te interesa ser distribuidor de Sindoh ?</Title>
                                <Title level={3}>
                                    <a className="btn-link" style={{borderBottom:'0.5px dotted grey'}} href="/contacto">Contacta con nosotros y acordamos una reunión</a>
                                </Title>
                                <div className="btn-continuar" style={{marginTop: (this.state.isMobile==true ? '1vh' : '20vh' ),width:'auto'}} >
                                    <AnimacionLink texto={"Lista de Distribuidores"} siguienteDiv={this.idMapa} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={4} md={4} lg={1} xl={1} xxl={1}></Col>
                        <Col xs={22} md={22} lg={10} xl={10} xxl={10}  style={{height:'100%'}}>
                            <div style={{paddingTop:'50px'}}>
                                <BannerAnim prefixCls="banner-user" autoPlay autoPlaySpeed={4000}
                                            style={{height:(this.state.isMobile==true ? '350px' : '550px' ),paddingTop:'50px'}}
                                >
                                    <Element prefixCls="banner-user-elem" key="0" >
                                        <ImageLoader className="cargando" loadingClassName={"cargando"} loadedClassName={"cargando"}
                                            style={this.imgMedidas}
                                            src="/img/carousel/resize_1080_A611_5.jpg" alt="resize_1080_A611_5.jpg" />
                                    </Element>
                                    <Element prefixCls="banner-user-elem" key="1" >
                                        <ImageLoader className="cargando" loadingClassName={"cargando"} loadedClassName={"cargando"}
                                            style={this.imgMedidas}
                                            src="/img/carousel/resize_1080_D202_8.jpg" alt="n701_frontal" />
                                    </Element>
                                    <Element prefixCls="banner-user-elem" key="2" >
                                        <ImageLoader className="cargando" loadingClassName={"cargando"} loadedClassName={"cargando"}
                                            style={this.imgMedidas}
                                            src="/img/carousel/resize_1080_M611_21.jpg" alt="n701_frontal" />
                                    </Element>
                                    <Element prefixCls="banner-user-elem" key="3" >
                                        <ImageLoader className="cargando" loadingClassName={"cargando"} loadedClassName={"cargando"}
                                            style={this.imgMedidas}
                                            src="/img/carousel/resize_1080_N701_27.jpg" alt="n701_frontal" />
                                    </Element>
                                </BannerAnim>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div id={this.idMapa}  style={{minHeight:'1000px',paddingTop:'40px'}} >
                    <Row>
                        <Col xs={4}  md={4}    lg={8} xl={8} xxl={8} ></Col>
                        <Col xs={8}  md={8}    lg={12} xl={12} xxl={12} >
                            <Title level={2}>Distribuidores:</Title>
                        </Col>
                    </Row>
                    <MapaDistribuidores />
                    <Row style={{paddingTop:'20px',paddingBottom:'20px',minHeight:'40px'}}></Row>
                </div>
            </div>
        )
    }
    //
} ;
//