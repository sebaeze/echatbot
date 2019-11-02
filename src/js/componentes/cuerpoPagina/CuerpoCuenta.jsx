/*
*
*/
import { Layout, Menu, Icon, Typography, Row, Col, Tooltip } from 'antd'   ;
import React                             from 'react' ;
import FormUserInfo                      from '../formularios/FormUserInfo' ;
import FormChatbots                      from '../formularios/FormChatbots' ;
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
            filtroColapsado: false,
            formType: (this.props.match.params && this.props.match.params.seccion && this.props.match.params.seccion.length>0 ) ? this.props.match.params.seccion : PARAMETROS.FORM.USER_INFO
        } ;
        this.onCollapse = this.onCollapse.bind(this) ;
    }
    //
    componentDidMount(){
        try {
            //
            api.account.getUserInfo()
                .then((resDataUsr)=>{
                    let tempFormType = this.state.formType ; /* Obliga a re.render */
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
    /*
    static getDerivedStateFromProps(newProps, state) {
        console.log('......Cuerpocuenta:: getDerivedStateFromProps: ') ;
        console.dir(state) ;
        return false ; // { listaBots: newProps.listaBots } ;
    }
    */
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
            <Layout id="idAccount" style={{ paddingTop:'120px',minHeight: '100vh'}}>
                <Sider collapsible
                    width={250}
                    collapsed={this.state.filtroColapsado}
                    onCollapse={this.onCollapse}
                >
                    <Menu defaultSelectedKeys={['1']} mode="inline"
                          defaultOpenKeys={['sub1']}
                          style={{backgroundColor:'#001529',color:'white',fontWeight:'500',fontSize:'22px'}}
                    >
                        <Menu.Item key="1">
                            <Icon type="user" style={{color:'#EBF2FE'}} />
                            <Tooltip placement="topRight" title={this.props.translate.menuAdmin.userInfo} >
                                <span onClick={(argEV)=>{argEV.preventDefault();
                                            if ( this.state.formType!=PARAMETROS.FORM.USER_INFO.toUpperCase() ){
                                                this.setState({formType: PARAMETROS.FORM.USER_INFO}) ;
                                            } else{
                                                console.log('....ya estoy en user info') ;
                                            }
                                        }}
                                >
                                {this.props.translate.menuAdmin.userInfo}</span>
                            </Tooltip>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="robot" style={{color:'#EBF2FE'}} />
                            <Tooltip placement="topRight" title={this.props.translate.menuAdmin.botsConfiguration} >
                                <span onClick={(argEV)=>{argEV.preventDefault();
                                            if ( this.state.formType!=PARAMETROS.FORM.CHATBOTS.toUpperCase() ){
                                                this.setState({formType: PARAMETROS.FORM.CHATBOTS}) ;
                                            } else{
                                                console.log('....ya estoy en CHATBOTS') ;
                                            }
                                        }}
                                >Chatbots</span>
                            </Tooltip>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <Row>
                        <Col xs={24} md={24} lg={26} xl={26} xxl={26}>
                            {
                                this.state.formType.toUpperCase()==PARAMETROS.FORM.USER_INFO.toUpperCase() ?
                                    <FormUserInfo translate={this.props.translate} userInfo={this.state.userInfo} />
                                    :
                                    this.state.formType.toUpperCase()==PARAMETROS.FORM.CHATBOTS.toUpperCase() ?
                                        <TablaChatbots translate={this.props.translate} userInfo={this.state.userInfo} />
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