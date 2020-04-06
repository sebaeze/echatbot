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
class NavMenu extends React.Component {
    constructor(props){
        super(props);
    }
    //
    componentDidMount(){}
    //
    render(){
        //
        return(
            <div>
                <Menu
                    theme="light"
                    className="menu-header-mobile"
                    mode={ this.props.isMobile ? "vertical" : "horizontal" }
                    // style={styleMenu}
                >
                    <Menu.Item key="home">
                        <LinkRouter  url={"/"} >
                            {this.props.translate.navigation.home}
                        </LinkRouter>
                    </Menu.Item>
                    <Menu.Item key="prices">
                        <LinkRouter  url={"/#prices"} >
                            {this.props.translate.prices}
                        </LinkRouter>
                    </Menu.Item>
                    <Menu.Item key="contact">
                        <LinkRouter  url={"/#contact"} >
                            {this.props.translate.contact}
                        </LinkRouter>
                    </Menu.Item>
                    {
                        this.props.userInfo==false
                            ?   <Menu.Item key="7" className="li-no-hover" >
                                    <Button  type="primary" block
                                            className="btn-shadow-login"
                                            onClick={(argEV)=>{argEV.preventDefault();location.href="/account";}}
                                            style={{marginBottom:'20%',height:'60px',backgroundColor:'#E0E6E5',verticalAlign:'bottom',color:'black',fontWeight:'500',fontSize:'20px',padding:'8px 8px 8px 8px' }}
                                    >
                                        {this.props.translate.login}
                                    </Button>
                                </Menu.Item>
                            :   <SubMenu
                                    popupClassName="waiboc-header-submenu"
                                    key="sub1"
                                    title={
                                    <span>
                                        <Icon type="appstore" />
                                        <span style={{fontSize:'21px',fontWeight:'700'}}><u>{this.props.userInfo.name+' '+this.props.userInfo.lastName}</u></span>
                                    </span>
                                    }
                                >
                                    <Menu.Item key="5">
                                        <LinkRouter  url={"/account/"+PARAMETROS.FORM.CHATBOTS} >
                                            <Icon type="robot" />Chatbots
                                        </LinkRouter>
                                    </Menu.Item>
                                    <Menu.Item key="6">
                                        <LinkRouter  url={"/account/"+PARAMETROS.FORM.USER_INFO} >
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
export default NavMenu ;
//