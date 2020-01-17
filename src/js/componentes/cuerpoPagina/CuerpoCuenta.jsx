/*
*
*/
import { Layout, Menu, Icon, Typography, Row, Col, Tooltip } from 'antd'   ;
import React                             from 'react' ;
import FormUserInfo                      from '../formularios/FormUserInfo' ;
import { TablaChatbots }                 from '../tablas/TablaChatbots'     ;
import { api }                           from '../../api/api' ;
import { PARAMETROS }                    from '../../utils/parametros' ;
//
import '../../../css/estilosAccount.css' ;
//
const { Header, Content, Footer, Sider } = Layout ;
const { SubMenu }                        = Menu   ;
const { Title   }                        = Typography ;
//
export class CuerpoCuenta extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            userInfo: false,
            filtroColapsado: this.props.configuracion.isMobile==true ? true : false,
            formType: (this.props.match.params && this.props.match.params.seccion && this.props.match.params.seccion.length>0 ) ? this.props.match.params.seccion : PARAMETROS.FORM.USER_INFO
        } ;
        this.onCollapse     = this.onCollapse.bind(this) ;
        this.onClickFormUrl = this.onClickFormUrl.bind(this) ;
    }
    //
    componentDidMount(){
        try {
            //
            console.log('....CuerpoCuenta:: componentDidMount:: ') ;
            api.account.getUserInfo()
                .then((resDataUsr)=>{
                    let tempFormType = this.state.formType ; /* Obliga a re.render */
                    console.log('....(B) CuerpoCuenta:: componentDidMount:: resDataUsr: ',resDataUsr) ;
                    this.setState({formType: tempFormType, userInfo: resDataUsr}) ;
                })
                .catch((errResDM)=>{
                    console.dir(errResDM) ;
                }) ;
                //
        } catch(errCDM){
            console.dir(errCDM) ;
        }
    }
    //
    onClickFormUrl(argTarget){
        try {
            if ( this.state.formType!=argTarget.toUpperCase() ){
                this.setState({formType: argTarget.toUpperCase() }) ;
            }
        } catch(errOCF){
            console.log('....CuerpoCuenta:: ERROR:: onClickFormurl:: ',errOCF) ;
        }
    }
    //
    onCollapse(argCollapse){
        try {
            this.setState({filtroColapsado:argCollapse}) ;
        } catch(errOC){
            console.dir(errOC) ;
        }
    }
    //
    render(){
        //
        return(
            <Layout id="waiboc-account" style={{ paddingTop:'120px',minHeight: '100vh'}}>
                <Sider collapsible
                    width={250}
                    collapsed={this.state.filtroColapsado}
                    onCollapse={this.onCollapse}
                    style={{backgroundColor:'#EBF2FE',color:'#002DFF',fontWeight:'600',fontSize:'22px'}}
                    trigger={
                        <Icon type="appstore" />
                    }
                >
                    <Menu mode="inline"
                          style={{backgroundColor:'#EBF2FE',color:'black',fontWeight:'600',fontSize:'22px'}}
                          selectedKeys={[this.state.formType]}
                    >
                        <Menu.Item key={PARAMETROS.FORM.USER_INFO} >
                            <Icon type="user" onClick={()=>{this.onClickFormUrl(PARAMETROS.FORM.USER_INFO);}}  />
                            <Tooltip placement="topRight" title={this.props.translate.menuAdmin.userInfo} >
                                <span  onClick={()=>{this.onClickFormUrl(PARAMETROS.FORM.USER_INFO);}} > {this.props.translate.menuAdmin.userInfo}</span>
                            </Tooltip>
                        </Menu.Item>
                        <Menu.Item key={PARAMETROS.FORM.CHATBOTS} >
                            <Icon type="robot"  onClick={()=>{this.onClickFormUrl(PARAMETROS.FORM.CHATBOTS);}} />
                            <Tooltip placement="topRight" title={this.props.translate.menuAdmin.botsConfiguration} >
                                <span onClick={()=>{this.onClickFormUrl(PARAMETROS.FORM.CHATBOTS);}}  >Chatbots</span>
                            </Tooltip>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <Row>
                        <Col xs={24} md={24} lg={26} xl={26} xxl={26}>
                            {
                                this.state.formType.toUpperCase()==PARAMETROS.FORM.USER_INFO.toUpperCase() ?
                                    <FormUserInfo translate={this.props.translate} userInfo={this.state.userInfo} configuracion={this.props.configuracion} />
                                    :
                                    this.state.formType.toUpperCase()==PARAMETROS.FORM.CHATBOTS.toUpperCase() ?
                                        <TablaChatbots translate={this.props.translate} userInfo={this.state.userInfo} configuracion={this.props.configuracion} />
                                        : null
                            }
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
    //
} ;
//