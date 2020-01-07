/*
*
*/
import React, { Component }                          from 'react' ;
import { Layout, Menu, Breadcrumb, Icon, Dropdown }  from 'antd' ;
import { Row, Col, Popover }                         from 'antd';
//
import NavMenu                             from './menu/NavMenu' ;
import {LogoEmpresa}                       from './link/LogoEmpresa'  ;
import { api }                             from '../api/api' ;
import {BotonMenuResponsive}               from './botones/BotonMenuResponsive'  ;
//
const { Header } = Layout;
//
import '../../css/estilosHeader.css' ;
import 'antd/lib/menu/style/css'     ;
import 'antd/lib/popover/style/css'  ;
//
export class Encabezado extends Component {
  constructor(props) {
    super(props) ;
    this.state       = { flagScroll:false, menuNavVisible: false, isMobile: (window.innerWidth<796), userInfo: false } ;
    this.onClickMenu = this.onClickMenu.bind(this) ;
  }
  //
  componentDidMount(){
      try {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        window.addEventListener("scroll",function(argEventSCR){
          this.setState({flagScroll: (window.scrollY==0 ? false : true) }) ;
        }.bind(this)) ;
        //
        api.account.getUserInfo()
          .then((resDataUsr)=>{
              this.setState({userInfo: resDataUsr}) ;
          })
          .catch((errResDM)=>{
              console.dir(errResDM) ;
          }) ;
        //
      } catch(errDM){
          console.dir(errDM) ;
      }
  }
  //
  resize() {
    this.setState({isMobile: (window.innerWidth<796)});
   }
  //
  onClickMenu(){
    try {
      let tempFL = !this.state.menuNavVisible ;
      this.setState({menuNavVisible:tempFL}) ;
    } catch(errMV){
      console.dir(errMV) ;
    }
  }
  //
  render() {
      //
      let styleHeader = {
        minHeight: (this.state.isMobile ? '90px' : '120px'), backgroundColor: '#fff' ,position: 'fixed', zIndex: '9990', width: '100%'
      } ;
      //
      return (
        <Header className={"header"+(this.state.flagScroll==true ? " shadow-below " : "" )} theme="light" style={styleHeader} >
          <Row>
            <Col xs={10} md={10} lg={6} xl={4} xxl={4}  >
              <LogoEmpresa />
            </Col>
            <Col  xs={13} md={13} lg={16} xl={20} xxl={20} >
                {this.state.isMobile ?
                    <Popover placement="bottomRight" title={false}
                             content={ <NavMenu userInfo={this.state.userInfo} translate={this.props.translate} isMobile={this.state.isMobile} /> } trigger="click"
                    >
                        <BotonMenuResponsive onClick={this.onClickMenu.bind(this)} />
                    </Popover>
                    :
                    <NavMenu userInfo={this.state.userInfo} translate={this.props.translate} isMobile={this.state.isMobile} />
                }
           </Col>
          </Row>
        </Header>
      ) ;
      //
    }
  }
//