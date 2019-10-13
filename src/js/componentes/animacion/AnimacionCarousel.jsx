/*
*
*/
import React                      from 'react' ;
import { Typography, Row, Col }   from 'antd'  ;
import BannerAnim                 from 'rc-banner-anim';
import QueueAnim                  from 'rc-queue-anim';
import TweenOne                   from 'rc-tween-one';
import { AnimacionLink }          from './AnimacionLink' ;
//
import '../../../css/estilosInicial.css' ;
//
const { Text, Title } = Typography ;
//
const { Element } = BannerAnim;
const BgElement = Element.BgElement;
//
export class AnimacionCarousel extends React.Component {
    constructor(props){
        super(props) ;
        this.state = { isMobile: this.props.isMobile } ;
    }
    //
    componentWillReceiveProps(newProps){
        try {
            if ( newProps.isMobile!=this.state.isMobile ){
                this.setState({isMobile: newProps.isMobile }) ;
            }
        } catch(errWRP){
            console.dir(errWRP) ;
        }
    }
    //
    componentDidMount(){}
    //
    render(){
        //
        let sumaY    = 190 ;
        let sumDelay = 600 ;
        //
        return(
                <BannerAnim autoPlay autoPlaySpeed={96000} autoPlayEffect={false} style={{minHeight:'650px',height:'850px'}}>
                    <Element key="1" prefixCls="banner-user-elem" >
                        <BgElement key="bg"
                            className="bg-inicial"
                            style={{
                                //backgroundColor: 'gray',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        <TweenOne style={{marginLeft:(this.state.isMobile==true ? '20px':'70px'),marginTop:(this.state.isMobile==true ? '10px':'80px')}} animation={{ x:450,y: sumaY, opacity: 0, type: 'from', delay: 300, repeat: -1,repeatDelay: 15500 }} name="TweenOne">
                            <Title level={1} style={{marginBottom:(this.state.isMobile==true ? '0': false)}}>eChatAI</Title>
                        </TweenOne>
                        {
                            this.props.translate.home.map((elemText,elemIdx)=>{
                                sumaY    += 200 ;
                                sumDelay += 900 ;
                                return(
                                    <TweenOne key={elemIdx} style={{marginLeft:(this.state.isMobile==true ? '20px':'70px')}} animation={{ x:450,y: sumaY, opacity: 0, type: 'from', delay: sumDelay, repeat: -1,repeatDelay: 15500 }} name="TweenOne">
                                        <span style={{color:'white',fontWeight:'600',backgroundColor:'#49B6F9',padding:'10px 10px 10px 10px'}}>{elemText}</span>
                                    </TweenOne>
                                ) ;
                            })
                        }
                        <TweenOne style={{marginLeft:(this.state.isMobile==true ? '20px':'70px'),marginTop:(this.state.isMobile==true ? '60px':'90px')}}
                                animation={{ x:450,y: (sumaY+100), opacity: 0, type: 'from', delay: (sumDelay+900) , repeat: -1,repeatDelay: 15500  }} name="TweenOne"
                        >
                            <div className="btn-continuar" style={{width:'230px'}}>
                                <AnimacionLink texto={"Más Información"} siguienteDiv={this.props.siguienteDiv} />
                            </div>
                        </TweenOne>
                    </Element>
                    <Element key="2" prefixCls="banner-user-elem" >
                        <BgElement key="bg" className="bg"
                            style={{
                                backgroundImage: 'url(/img/carousel/bg-inicio-2.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        <TweenOne style={{marginLeft:(this.state.isMobile==true ? '20px':'70px'),marginTop:(this.state.isMobile==true ? '10px':'80px')}} animation={{ x:450,y: 190, opacity: 0, type: 'from', delay: 300, repeat: -1,repeatDelay: 15500 }} name="TweenOne">
                            <Title level={1} style={{marginBottom:(this.state.isMobile==true ? '0': false)}}>Convertite en proveedor</Title>
                        </TweenOne>
                        <TweenOne style={{marginLeft:(this.state.isMobile==true ? '20px':'70px')}} animation={{ x:450,y: 190, opacity: 0, type: 'from', delay: 600, repeat: -1,repeatDelay: 15500 }} name="TweenOne">
                            <Title level={(this.state.isMobile==true ? 4 : 2)} style={{marginTop:'0'}}>Distribui nuestros productos Sindoh en la region</Title>
                            <Title level={3}>
                                <a href="/contacto" style={{fontWeight:'bold',borderBottom:'0.5px dotted gray'}} >Escribinos</a>
                            </Title>
                        </TweenOne>
                        <TweenOne style={{marginLeft:(this.state.isMobile==true ? '20px':'70px'),marginTop:(this.state.isMobile==true ? '60px':'90px')}}
                                animation={{ x:450,y: 290, opacity: 0, type: 'from', delay: 1300, repeat: -1,repeatDelay: 15500  }} name="TweenOne"
                        >
                            <div className="btn-continuar" style={{width:'230px'}}>
                                <AnimacionLink texto={"Más Información"} siguienteDiv={this.props.siguienteDiv} />
                            </div>
                        </TweenOne>
                        <TweenOne animation={{ x:450,y: 190, opacity: 0, type: 'from', delay: 1600, repeat: -1,repeatDelay: 15500 }}
                            name="TweenOne"
                            style={{marginLeft:(this.state.isMobile==true ? '20px':'550px'),marginTop:(this.state.isMobile==true ? '190px':'190px')}}
                        >
                            <img src="/img/carousel/resize_1080_A400_2.jpg" style={{width:'350px',height:'auto'}}></img>
                        </TweenOne>
                    </Element>
            </BannerAnim>
        )
    }
    //
} ;
//