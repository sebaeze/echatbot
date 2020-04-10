/*
*
*/
import React                             from 'react' ;
import { Menu, Button, Icon }            from 'antd'  ;
import LinkRouter                        from '../link/LinkRouter' ;
import { api        }                    from '../../api/api'      ;
import { PARAMETROS }                    from '../../utils/parametros' ;
//
const { SubMenu } = Menu ;
//
export class NavMenu extends React.Component {
    constructor(props){
        super(props) ;
        //
        let tempKey = window.location.pathname.length>0 ? String(window.location.pathname).trim().toLowerCase() : String(window.location.hash).trim().toLowerCase() ;
        tempKey     =  tempKey.substr(1).indexOf("/")==-1 ? tempKey : ( tempKey.split("/").length>1 ? tempKey.split("/")[2] : tempKey.split("/")[1] );
        //console.log('...tempKey: ',tempKey,' window.location: ',window.location) ;
        this.state = {
            keyCurrent: tempKey
        } ;
        //
    }
    //
    componentDidMount(){}
    //
    render(){
        //
        return(
            <div>
                <Menu theme="light" className="menu-header-mobile"
                    mode={ this.props.isMobile ? "inline" : "horizontal" }
                    // mode={"inline"}
                    getPopupContainer={(trigger) => {return trigger.parentNode ;}}
                    subMenuOpenDelay={0.3}
                    subMenuCloseDelay={0.3}
                    selectedKeys={[this.state.keyCurrent]}
                    onSelect={
                        (argSS)=>{
                            //console.log('...onselect:: argSS: ',argSS) ;
                            if ( argSS.key ){
                                this.setState({keyCurrent: argSS.key}) ;
                            }
                            if ( this.props.onClickMenu ){
                                this.props.onClickMenu() ;
                            }
                        }
                    }
                    // style={styleMenu}
                >
                    <Menu.Item key="/">
                        <LinkRouter targetApp={PARAMETROS.APP_ID.HOME} url={"/"} >
                            {this.props.translate.navigation.home}
                        </LinkRouter>
                    </Menu.Item>
                    <Menu.Item key="prices">
                        <LinkRouter  targetApp={PARAMETROS.APP_ID.HOME} url={"/#prices"} >
                            {this.props.translate.prices}
                        </LinkRouter>
                    </Menu.Item>
                    <Menu.Item key="contact">
                        <LinkRouter  targetApp={PARAMETROS.APP_ID.HOME} url={"/#contact"} >
                            {this.props.translate.contact}
                        </LinkRouter>
                    </Menu.Item>
                    {
                        this.props.userInfo==false
                            ?   <Menu.Item key="7" className="li-no-hover btn-login" >
                                    <Button  type="primary" block
                                            className="btn-shadow-login"
                                            onClick={(argEV)=>{argEV.preventDefault();location.href="/account";}}
                                            style={{marginBottom:'20%',height:'60px',backgroundColor:'#E0E6E5',verticalAlign:'bottom',color:'black',fontWeight:'500',fontSize:'20px',padding:'8px 8px 8px 8px' }}
                                    >
                                        {this.props.translate.login}
                                    </Button>
                                </Menu.Item>
                            :   <SubMenu popupClassName="waiboc-header-submenu" key="sub-menu-account"
                                    title={
                                        <span>
                                            <Icon type="appstore" />
                                            <span style={{fontSize:'21px',fontWeight:'700'}}><u>{this.props.userInfo.name+' '+this.props.userInfo.lastName}</u></span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key={PARAMETROS.FORM.CHATBOTS.toLowerCase()}>
                                        <LinkRouter  targetApp={PARAMETROS.APP_ID.ADMIN} url={"/account/"+PARAMETROS.FORM.CHATBOTS} >
                                            <Icon type="robot" />Chatbots
                                        </LinkRouter>
                                    </Menu.Item>
                                    <Menu.Item key={PARAMETROS.FORM.USER_INFO.toLowerCase()} >
                                        <LinkRouter  targetApp={PARAMETROS.APP_ID.ADMIN} url={"/account/"+PARAMETROS.FORM.USER_INFO} >
                                            <Icon type="profile" />{this.props.translate.myProfile}
                                        </LinkRouter>
                                    </Menu.Item>
                                    <Menu.Item key="7">
                                        <a  onClick={(argEVC)=>{
                                            argEVC.preventDefault() ;
                                            api.account.logout() ;
                                            window.location.href = "/logout" ;
                                        }}
                                        >
                                            <Icon type="logout" />{this.props.translate.logout}
                                        </a>
                                    </Menu.Item>
                                </SubMenu>
                        }
                </Menu>
            </div>
        ) ;
    }
    //
}
//