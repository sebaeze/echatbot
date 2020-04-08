/*
*
*/
import React, { Component }                          from 'react' ;
import { Layout, Menu, Breadcrumb, Icon, Dropdown }  from 'antd'  ;
import { Row, Col, Popover }                         from 'antd'  ;
import { BackTop }                                   from 'antd'  ;
//
import {LogoEmpresa}                       from './link/LogoEmpresa'  ;
import { MenuHeaderMobile   }              from './menu/MenuHeaderMobile'   ;
import { api }                             from '../api/api' ;
//
const { Header } = Layout;
//
// import 'antd/lib/menu/style/css'     ;
// import 'antd/lib/popover/style/css'  ;
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
      return (
        <Header className={(this.state.flagScroll==true ? " shadow-below " : "" )} theme="light" >
          <BackTop>
              <div className="ant-back-top-inner"><Icon type="arrow-up" /></div>
          </BackTop>
          <Row>
            <Col xs={10} md={10} lg={10} xl={10} xxl={10}  >
              <LogoEmpresa />
            </Col>
            <Col  xs={13} md={13} lg={14} xl={14} xxl={14} >
                <MenuHeaderMobile
                      isMobile={this.state.isMobile}
                      marcas={this.state.marcas}
                      userInfo={this.state.userInfo}
                      categorias={this.state.categorias}
                      translate={this.props.translate}
                />
           </Col>
          </Row>
        </Header>
      ) ;
      //
    }
  }
//