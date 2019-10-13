/*
*
*/
import React                           from 'react' ;
import {Row, Col, Typography}          from 'antd'  ;
import { ImageLoader }                 from '../image/ImageLoader' ;
//
const { Text, Title }      = Typography ;
//
export class ImagenConDescripcion extends React.Component {
    constructor(props){
        super(props) ;
    }
    //
    render(){
        //
        return (
            <div>
                <Row>
                    <Col xs={1} md={1}   lg={4} xl={4} xxl={4}></Col>
                    <Col xs={24} md={24} lg={7} xl={20} xxl={20}  >
                        <ImageLoader className="nada" loadingClassName={"nada"} loadedClassName={"nada"} style={{width: this.props.width,height:'auto'}} src={this.props.imagenItem.img} alt="imagen" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} md={24} lg={4} xl={4} xxl={4}  >
                        <Title>{this.props.imagenItem.titulo}</Title>
                        <Text  type="secondary" style={{backgroundColor:'white'}}>{this.props.imagenItem.descripcion}</Text>
                    </Col>
                </Row>
            </div>
        ) ;
        //
    }
    //
} ;
//