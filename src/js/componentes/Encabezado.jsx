/*
*
*/
import React                               from 'react' ;
import { Layout, Icon }                    from 'antd'  ;
import { Row, Col }                        from 'antd'  ;
import { BackTop }                         from 'antd'  ;
//
import { LogoEmpresa }                     from './link/LogoEmpresa'  ;
import { NavMenu    }                      from './menu/NavMenu'      ;
import { MenuHeaderMobile   }              from './menu/MenuHeaderMobile'   ;
import { FiltroLenguaje }                  from './filtros/FiltroLenguaje'       ;
import { api, sendError2Backend }          from '../api/api' ;
//
const { Header } = Layout;
//
class Encabezado extends React.Component  {
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
              sendError2Backend({url: window.location.pathname,comp: ' en encabezado:: DidMount',...errResDM})
                .then((resuEnd)=>{
                  throw errResDM ;
                })
                .catch((errRes)=>{
                  throw errResDM ;
                }) ;
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
        <Header className={"waiboc-header "+(this.state.flagScroll==true ? " shadow-below " : "" )} theme="light" >
          <BackTop>
              <div className="ant-back-top-inner"><Icon type="arrow-up" /></div>
          </BackTop>
          <Row>
            <Col xs={10} md={10} lg={9} xl={9} xxl={9}  >
              <LogoEmpresa />
            </Col>
            <Col  xs={0} md={0} lg={13} xl={13} xxl={13} >
                {
                  this.state.isMobile==true
                        ? null
                        : <NavMenu translate={this.props.translate}
                                  isMobile={this.state.isMobile}
                                  userInfo={this.state.userInfo}
                          />
                }
            </Col>
            <Col  xs={10} md={10} lg={0} xl={0} xxl={0} ></Col>
            <Col xs={2} md={2} lg={2} xl={2} xxl={2} >
              <FiltroLenguaje seleccion={this.props.onchangeLanguage}
                              translate={this.props.translate}
                              customStyle={{width:'90%',marginLeft:'5%',}}
                        />
            </Col>
            <Col  xs={2} md={2} lg={0} xl={0} xxl={0} >
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
export default Encabezado ;
//