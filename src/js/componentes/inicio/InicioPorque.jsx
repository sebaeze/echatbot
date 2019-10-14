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
        console.log('....inicioPorque:: this.state.showDiv: '+this.state.showDiv+';') ;
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
                            this.state.showDiv ?
                                this.props.translate.HomeWhy.map((elemWhy,elemIdx)=>{
                                    return(
                                        <Col xs={22} md={22} lg={7} xl={7} xxl={7}  key={elemIdx} style={{minHeight:'200px',marginLeft:'10px',marginRight:'10px'}}>
                                            <Title level={4}>{elemWhy.title}</Title>
                                            <Paragraph ellipsis={{ rows: 7, expandable: true }}>
                                                {elemWhy.description}
                                            </Paragraph>
                                        </Col>
                                    )
                                })
                                :
                                []
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