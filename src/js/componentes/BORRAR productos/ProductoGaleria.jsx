/*
*
*/
import React, { Component }   from 'react' ;
import Fade                   from 'react-reveal/Fade'  ;
import {apiCarrito}           from '../../api/apiCarrito' ;
//
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'  ;
import '../../../css/estilos.css'   ;
//
class ProductoGaleria extends Component {
  constructor(props) {
    super(props);
    this.onClickMeGustaProducto = this.onClickMeGustaProducto.bind(this) ;
    this.maxItemsVisibles       = this.props.maxCantidad ;
    this.state                  = {muestraMeGusta:false,muestraCarrito:false,muestraProductos:false} ;
    this.onClickAgregarCarrito  = this.onClickAgregarCarrito.bind(this) ;
  }
  //
  componentDidMount(){
      this.setState({muestraProductos:true}) ;
  }
  //
  onClickMeGustaProducto(argEventMeGusta){
      try{
        argEventMeGusta.preventDefault() ;
        this.setState({ muestraMeGusta: !this.state.muestraMeGusta });
      } catch(errMeGust){
          console.dir(errMeGust) ;
      }
  }
  //
  onClickAgregarCarrito(argEvent){
    try {
        argEvent.preventDefault() ;
        console.log('.....voy a agregar al carrito: ');
        //
        apiCarrito.add( this.props.item ) ;
        //
        this.setState({muestraCarrito:true}) ;
        //
    } catch(errCar){ console.dir(errCar); }
  }
  //
  render() {
    //
    let urlProducto = "/catalogo/"+this.props.item.categoriaSegunTitulo+"/"+(this.props.item._id||this.props.item.id)+"-"+this.props.item.nombre.replace(/\//g,'-') ;
    urlProducto     = urlProducto.replace(/ /g,'-') ;
    //
    const divProd  = () => {
        return (
            <Fade bottom when={this.state.muestraProductos}>
                <div className="producto-item mb-3 col-xs-12 col-sm-12 col-md-4 col-lg-3"
                precio={this.props.item.precio} key={this.props.indice}
                marca={this.props.item.marca}
                condicion={this.props.item.condicion}
                id={this.props.item._id||this.props.item.id}
                style={this.props.indice>this.maxItemsVisibles ? { display: 'none' } : {} }>
                <div className="product-grid">
                    <div className="row d-flex justify-content-end">
                        <Fade left when={this.state.muestraMeGusta}>
                            <div className="fa fa-heart producto-corazon mr-5" ></div>
                        </Fade>
                        <Fade left when={this.state.muestraCarrito}>
                            <div className="fa fa-shopping-cart producto-corazon mr-4" ></div>
                        </Fade>
                    </div>
                    <div className="product-image">
                        <a href={urlProducto} >
                            <img className="pic-1" src={this.props.item.imagenes[0].secure_url}/>
                            <img className="pic-2" src={this.props.item.imagenes.length>1 ? this.props.item.imagenes[1].secure_url : this.props.item.imagenes[0].secure_url}/>
                        </a>
                        <ul className="social">
                            <li>
                                <a href={urlProducto} data-tip="Ampliar" >
                                    <i className="fa fa-search"></i>
                                </a></li>
                            <li>
                                <a href="" data-tip="Me gusta" onClick={this.onClickMeGustaProducto} idproducto={this.props.item._id||this.props.item.id}>
                                    <i className={"fa "+(this.state.muestraMeGusta ? "fa-thumbs-down" : "fa-thumbs-up")}  idproducto={this.props.item._id||this.props.item.id}></i>
                                </a>
                            </li>
                            <li>
                                <a href="" data-tip="Agregar al carrito"  onClick={this.onClickAgregarCarrito.bind(this)} idproducto={this.props.item._id||this.props.item.id}>
                                    <i className="fa fa-shopping-cart"  idproducto={this.props.item._id||this.props.item.id}></i>
                                </a>
                            </li>
                        </ul>
                        <span className="product-new-label">{this.props.item.estado}</span>
                    </div>
                        <ul className="rating"> <li className="fa fa-star"></li><li className="fa fa-star"></li><li className="fa fa-star"></li>
                        <li className="fa fa-star"></li><li className="fa fa-star disable"></li></ul>
                        <div className="product-content">
                            <h3 className="title">
                                <a href={this.props.item.urlExterna} target="_blank">{this.props.item.nombre}</a>
                            </h3>
                            <div className="price">$ {String(this.props.item.precio).replace('.',',')}</div>
                                <a className="add-to-cart" href="" onClick={this.onClickAgregarCarrito.bind(this)} >+ Agregar a carrito</a>
                            </div>
                </div>
            </div>
            </Fade>
        )};
    //
    return ( divProd() ) ;
  }
  //
}
/* */
export default ProductoGaleria ;
/* */