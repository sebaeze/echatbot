/*
*
*/
import React, { Component }                          from 'react' ;
import { Layout, Menu, Breadcrumb, Icon, Dropdown }  from 'antd' ;
import { Row, Col, Popover }                         from 'antd';
//
import NavMenu                             from './menu/NavMenu' ;
import {LogoEmpresa}                       from './link/LogoEmpresa'  ;
import {BotonMenuResponsive}               from './botones/BotonMenuResponsive'  ;
//
const { Header } = Layout;
//
import '../../css/estilosHeader.css' ;
import 'antd/lib/menu/style/css'     ;
import 'antd/lib/popover/style/css'  ;
//
class Encabezado extends Component {
  constructor(props) {
    super(props) ;
    this.state       = { flagScroll:false, menuNavVisible: false, isMobile: (window.innerWidth<796) } ;
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
      } catch(errDM){
          console.dir(errDM) ;
      }
  }
  //
  resize() {
    this.setState({isMobile: (window.innerWidth<796)});
    console.log('(A) ....window.innerWidth: '+window.innerWidth+' isMobile: '+this.state.isMobile+';') ;
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
        <Header className={"header"+(this.state.flagScroll==true ? " shadow-below " : "" )} theme="light"
                style={{ minHeight:'120px', backgroundColor: '#fff' ,position: 'fixed', zIndex: 9999, width: '100%' }}
        >
          <Row>
            <Col span={10}>
              <LogoEmpresa />
            </Col>
            <Col span={13}>
                {this.state.isMobile ?
                    <Popover placement="bottomRight" title={false} content={ <NavMenu translate={this.props.translate} isMobile={this.state.isMobile} /> } trigger="click">
                        <BotonMenuResponsive onClick={this.onClickMenu.bind(this)} />
                    </Popover>
                    :
                    <NavMenu translate={this.props.translate} isMobile={this.state.isMobile} />
                }
           </Col>
          </Row>
        </Header>
      ) ;
      //
    }
  }
/* */
export default Encabezado ;
/* */