/*
*
*/
import React                                      from 'react' ;
import { Row, Col }                               from 'antd'  ;
import { CarouselImagenes  }                      from '../image/CarouselImagenes' ;
import PageBgChatbot                              from '../pages/PageHeaderChatbot' ;
import PageBgWebsiteDev                           from '../pages/PageBgWebsiteDev'  ;
//
export class InicioEncabezado extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            arrayPaginas: [
                <PageBgChatbot     key="1" siguienteDiv={this.props.siguienteDiv} translate={this.props.translate} configuracion={this.props.configuracion}  />,
                <PageBgWebsiteDev  key="2" siguienteDiv={this.props.siguienteDiv} translate={this.props.translate} configuracion={this.props.configuracion}  />
            ]
        } ;
        this.setRefCarousel = this.setRefCarousel.bind(this) ;
        this.refCarouselImg = false ;
    }
    //
    setRefCarousel(argRef){
        if ( argRef && this.refCarouselImg==false ){
        this.refCarouselImg = argRef ;
        }
    } ;
    //
    render(){
        //
        return(
            <div id={this.props.id} className="bg-inicial" >
                <Row>
                    <Row>
                        <Col xs={0}  md={0}   lg={1}  xl={1}  xxl={1}></Col>
                        <Col xs={24} md={24}  lg={22} xl={22} xxl={22} style={{height:'90vh'}} >
                            <CarouselImagenes
                                settings={{ infinite:true, autoplay: false, autoplaySpeed: 5000,centerMode:false,variableWidth:false}}
                                styleArrows={{background:'none',opacity:'0.2'}}
                                customStyle={{height:'600px'}}
                                ref={this.setRefCarousel}
                                data={this.state.arrayPaginas}
                            />
                        </Col>
                    </Row>
                </Row>
            </div>
        )
    }
    //
} ;
//