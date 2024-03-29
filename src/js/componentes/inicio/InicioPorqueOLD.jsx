/*
*
*/
import React                                      from 'react' ;
import { Row, Col, Carousel, Typography }         from 'antd'  ;
import {ImagenConDescripcion}                     from './ImagenConDescripcion' ;
import QueueAnim                                  from 'rc-queue-anim' ;
import { AnimacionLink }                          from '../animacion/AnimacionLink' ;
//
const { Title, Paragraph, Text }  = Typography ;
//
export class InicioPorque extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {isMobile: (window.innerWidth<797),showDiv: this.props.flagShowDiv ? this.props.flagShowDiv : false } ;
    }
    //
    componentDidMount(){
        try{
            /*
            window.addEventListener("resize",function(argEventSCR){
                this.setState({isMobile: (window.innerWidth<797)});
            }.bind(this)) ;
            */
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
        return(
            <div style={{marginTop:'90px'}} >
                <Row>
                    <QueueAnim
                        animConfig={[
                                [{ x: [0, 300], opacity: [1, 0] }, { y: [ posY, 0] }],
                                [{ x: [0, 500]                  }, { y: [ posY, -50], opacity: [1, 0] }],
                            ]}
                            ease="easeInOutQuart"
                    >
                        {
                            this.state.showDiv ?
                                this.props.translate.HomeWhy.map((elemWhy,elemIdx)=>{
                                    return(
                                        //<Col xs={22} md={22} lg={7} xl={7} xxl={7}  key={elemIdx} style={{minHeight:'200px',marginLeft:'10px',marginRight:'10px'}}>
                                        <Row key={elemIdx} className="bg-azul" style={{minHeight:'80vh'}} >
                                            <Col xs={1} md={1} lg={1} xl={1} xxl={1} ></Col>
                                            <Col xs={22} md={22} lg={13} xl={13} xxl={13} >
                                                <Title level={1}  >{elemWhy.title}</Title>
                                                <Title level={3}  >{elemWhy.description}</Title>
                                                {
                                                    elemWhy.text.map((elemText,idxTT)=>{
                                                        return(
                                                            <Text key={idxTT}>{elemText}</Text>
                                                        )
                                                    })
                                                }
                                            </Col>
                                            {
                                                elemWhy.image ?
                                                <Col xs={24} md={24} lg={10} xl={10} xxl={10} >
                                                    <img src={elemWhy.image} alt="cognitive" style={{width:'100%',height:'auto'}} />
                                                </Col>
                                                :
                                                null
                                            }
                                        </Row>
                                    )
                                })
                                :
                                []
                        }
                    </QueueAnim>
                </Row>
            </div>
        ) ;
    }
} ;
//