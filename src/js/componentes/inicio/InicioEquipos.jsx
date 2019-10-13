/*
*
*/
import React                                      from 'react' ;
import { api }                                    from '../../api/api' ;
import { Row, Col, Carousel, Typography, Spin }   from 'antd'  ;
import BannerAnim, { Element }                    from 'rc-banner-anim';
import TweenOne                                   from 'rc-tween-one';
import { ImageLoader }                            from '../image/ImageLoader' ;
import {ImagenConDescripcion}                     from './ImagenConDescripcion' ;
//
const { Text, Title }      = Typography ;
//
export class InicioEquipos extends React.Component {
    constructor(props){
        super(props) ;
        this.state    = {productos:[],showDiv: this.props.flagShowDiv ? this.props.flagShowDiv: false } ;
        //this.imagenes = [{img:"/img/carousel/resize_1080_A400_0.jpg",titulo:"A400_0",descripcion:"A400_0"},{img:"/img/carousel/resize_1080_A400_1.jpg",titulo:"A400_1",descripcion:"A400_1"},{img:"/img/carousel/resize_1080_A400_2.jpg",titulo:"A400_2",descripcion:"A400_2"},{img:"/img/carousel/resize_1080_A610_3.jpg",titulo:"A610_3",descripcion:"A610_3"},{img:"/img/carousel/resize_1080_A610_4.jpg",titulo:"A610_4",descripcion:"A610_4"},{img:"/img/carousel/resize_1080_A611_5.jpg",titulo:"A611_5",descripcion:"A611_5"},{img:"/img/carousel/resize_1080_A611_6.jpg",titulo:"A611_6",descripcion:"A611_6"},{img:"/img/carousel/resize_1080_D202_7.jpg",titulo:"D202_7",descripcion:"D202_7"},{img:"/img/carousel/resize_1080_D202_8.jpg",titulo:"D202_8",descripcion:"D202_8"},{img:"/img/carousel/resize_1080_D202_9.jpg",titulo:"D202_9",descripcion:"D202_9"},{img:"/img/carousel/resize_1080_D202_10.jpg",titulo:"D202_10",descripcion:"D202_10"},{img:"/img/carousel/resize_1080_D202_11.jpg",titulo:"D202_11",descripcion:"D202_11"},{img:"/img/carousel/resize_1080_D202_12.jpg",titulo:"D202_12",descripcion:"D202_12"},{img:"/img/carousel/resize_1080_D202_13.jpg",titulo:"D202_13",descripcion:"D202_13"},{img:"/img/carousel/resize_1080_D202_14.jpg",titulo:"D202_14",descripcion:"D202_14"},{img:"/img/carousel/resize_1080_M400_15.jpg",titulo:"M400_15",descripcion:"M400_15"},{img:"/img/carousel/resize_1080_M401_16.jpg",titulo:"M401_16",descripcion:"M401_16"},{img:"/img/carousel/resize_1080_M401_17.jpg",titulo:"M401_17",descripcion:"M401_17"},{img:"/img/carousel/resize_1080_M403_18.jpg",titulo:"M403_18",descripcion:"M403_18"},{img:"/img/carousel/resize_1080_M403_19.jpg",titulo:"M403_19",descripcion:"M403_19"},{img:"/img/carousel/resize_1080_M611_20.jpg",titulo:"M611_20",descripcion:"M611_20"},{img:"/img/carousel/resize_1080_M611_21.jpg",titulo:"M611_21",descripcion:"M611_21"},{img:"/img/carousel/resize_1080_M612_22.jpg",titulo:"M612_22",descripcion:"M612_22"},{img:"/img/carousel/resize_1080_N701_23.jpg",titulo:"N701_23",descripcion:"N701_23"},{img:"/img/carousel/resize_1080_N701_24.jpg",titulo:"N701_24",descripcion:"N701_24"},{img:"/img/carousel/resize_1080_N701_25.jpg",titulo:"N701_25",descripcion:"N701_25"},{img:"/img/carousel/resize_1080_N701_26.jpg",titulo:"N701_26",descripcion:"N701_26"},{img:"/img/carousel/resize_1080_N701_27.jpg",titulo:"N701_27",descripcion:"N701_27"},{img:"/img/carousel/resize_1080_N701_28.jpg",titulo:"N701_28",descripcion:"N701_28"}]; 
    }
    //
    componentDidMount(){
        try{
            //
            api.productos.get( {limite:10,campos:'marca,modelo,nombre,moneda,precio,tipo,stock,descripcion,imagenes,categoriaSegunTitulo,atributos'} )
                .then((arrProds)=>{
                    this.setState({productos:arrProds}) ;
                })
                .catch((errProd)=>{
                    console.dir(errProd) ;
                    console.log('....error query productos ') ;
                }) ;
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
        return(
            //
            <div id="idInicioEquipos" style={{paddingTop:'45px',backgroundColor:'#F4F4F4'}}>
                <Title style={{textAlign:'center'}}>Nuestro equipos:</Title>
                <Row>
                    <Col xs={2}  md={2}  lg={4} xl={4} xxl={4} ></Col>
                    <Col xs={20} md={20} lg={18} xl={18} xxl={18} >
                        {
                            this.state.productos.length==0 ?
                                <Spin size="large" />
                                :
                                <BannerAnim prefixCls="banner-user" autoPlay autoPlaySpeed={4500}
                                    style={{height:(this.state.isMobile==true ? '700px' : '900px' )}}
                                >
                                    {
                                        this.state.productos.map((elemProd,elemIndx)=>{
                                            let tempUrlImg = elemProd.imagenes.length>0 ? elemProd.imagenes[0].url : '/img/images_no_disponible.png' ;
                                            return (
                                                    <Element prefixCls="banner-user-elem" key={elemIndx}>
                                                        <Row>
                                                            <Col xs={1} md={1} lg={6} xl={6} xxl={6}></Col>
                                                            <Col xs={24} md={24} lg={14} xl={14} xxl={14}>
                                                                <ImageLoader
                                                                    className="cargando" loadingClassName={"cargando"} loadedClassName={"cargando"}
                                                                    style={{width:(this.state.isMobile==true ? '150px' : '600px' ),height:'auto'}}
                                                                    src={tempUrlImg}
                                                                    alt={elemProd.nombre+elemProd.descripcion}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Element>
                                            )
                                        })
                                    }
                                </BannerAnim>
                        }
                    </Col>
                </Row>
            </div>
        ) ;
    }
    //
} ;
//