/*
*
*/
import React                           from 'react' ;
import { Row, Col, Typography }        from 'antd'  ;
//
const { Title, Paragraph } = Typography ;
//
export class CuerpoAbout extends React.Component {
    constructor(props){
        super(props) ;
    } ;
    //
    render(){
        return (
            <div id="idAbout" style={{paddingTop:'45px',minHeight:'90vh',backgroundColor:'#F4F4F4'}}>
                <div>
                    <Row style={{paddingTop:'120px'}}>
                        <Col xs={2}  md={2}  lg={4}  xl={4}  xxl={4}></Col>
                        <Col xs={20} md={20} lg={18} xl={18} xxl={18}>
                            <Title level={2} style={{textAlign:'center'}}>Sobre nosotros</Title>
                            <Paragraph ellipsis={{ rows: 5, expandable: true }}  style={{fontSize:'20px'}} >
                            En Sindoh BA, nuestro proposito es introducir las soluciones de copiado de Sindoh en Argentina.

                            A pesar de poseer tecnologia de alto rendimiento y bajo consumo, la empresa aun no ha desembarcado todo
                            su potencial en la región.
                            </Paragraph>
                        </Col>
                        <Col xs={2} md={2} lg={4} xl={4} xxl={4}></Col>
                    </Row>
                    <Row style={{paddingTop:'50px'}}>
                        <Col xs={2}  md={2}  lg={4}  xl={4}  xxl={4}></Col>
                        <Col xs={20} md={20} lg={18} xl={18} xxl={18}>
                            <Title level={2} style={{textAlign:'center'}}>Sindoh</Title>
                            <Paragraph ellipsis={{ rows: 9, expandable: true }} style={{fontSize:'20px'}}>
                            La marca coreana Sindoh es una compañía mundial especializada en impresión desde su creación en 1960. Sindoh es el mayor
                            fabricante de equipos de oficina del mundo. Y SINDOHBA es un representante mayorista de la marca en Argentina SINDOH pretende ser el referente de las empresas del sector de oficina con el siguiente lema de gestión:
                            “With Customer, With Cost, With Ownership.”
                            (Con los clientes, con el gasto, con la propiedad).
                            Después de haber sido fabricante de las primeras fotocopiadoras y facsímiles en Corea, SINDOH ha enfocado su camino en ser un
                            socio de soluciones de la producción mundial. Su crecimiento la ha llevado a convertir su cultura corporativa centrada en las personas, en amor por el país, lugar de trabajo y la gente, la capacidad tecnológica y la asociación con los profesionales generando
                            confianza.
                            </Paragraph>
                        </Col>
                        <Col xs={2} md={2} lg={4} xl={4} xxl={4}></Col>
                    </Row>
                </div>
            </div>
        )
    } ;
    //
} ;
//