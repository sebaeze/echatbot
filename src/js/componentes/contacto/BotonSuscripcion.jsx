/*
*
*/
import React, { Component       } from 'react'  ;
import $                          from 'jquery' ;
import { BounceLoader }           from 'react-spinners' ;
import {util}                     from '../../api/estadisticas' ;
//
class BotonSuscripcion extends Component {
  constructor(props) {
    super(props) ;
    this.state = {flagLoadSpinner:false,suscripcionEnviada:false } ;
    this.onClickEnviarSuscripcion = this.onClickEnviarSuscripcion.bind(this)
  }
  //
  componentDidMount(){}
  //
  onClickEnviarSuscripcion(argEventClick){
    try {
        //
        argEventClick.preventDefault() ;
        let idformulario = this.props.idform || false ;
        if ( !idformulario ){ console.log('...ERROR: Falta id de formulario sucripcion'); }
        if ( idformulario.indexOf('#')==-1){ idformulario="#"+idformulario; }
        //
        let flagValida = this.validaForm(idformulario+" input[type=email]") ;
        if ( flagValida==false ){
            flagValida = this.validaForm(idformulario+" input[type=text]") ;
        }
        if ( flagValida==true ){
            this.setState({flagLoadSpinner:true}) ;
            let datosForm = util.valoresForm(idformulario) ;
            this.enviarSuscripcion(datosForm)
                .then(respSusc=>{
                    $(idformulario).find('input[type=email]').attr("disabled", true) ;
                    $(idformulario).find('input[type=text]').attr("disabled", true) ;
                    this.setState({flagLoadSpinner:false,suscripcionEnviada:true}) ;
                })
                .catch((errSusc)=>{
                    this.setState({flagLoadSpinner:false,suscripcionEnviada:false}) ;
                    console.dir(errSusc) ;
                }) ;
        }
        //
    } catch(errenv){
        console.dir(errenv) ;
    }
  }
  //
  enviarSuscripcion(argObjSuscripcion){
    return new Promise(function(respResu,respRej){
      try {
        const objEmail     = {method:'POST',body: JSON.stringify(argObjSuscripcion),
                                headers:{
                                     'Accept':'application/json',
                                     'Content-Type':'application/json',
                                     'accept':'application/json',
                                     'access-Control-Allow-Origin':'*',
                                     'access-Control-Allow-Methods':'*'
                                    }
                                } ;
        //
        fetch( '/suscripcion' ,objEmail)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: Enviando Suscripcion. Http Status: "+response.status+'.') ;
                }
            })
            .then(function(respDatos){
                console.log('....enviadoooo') ;
                respResu('ok') ;
            })
            .catch(function(respRechaz){
                console.dir(respRechaz) ;
                respRej(respRechaz) ;
            }) ;
            //
      } catch(errConsulta){
        respRej(errConsulta) ;
      }
    }.bind(this)) ;
  }
  //
  validaForm(argSelect){
    try {
      let nodoForm = $(argSelect) ;
      let arrayInput = [] ;
      let f ;
      if ( String($(nodoForm).prop('tagName')).toUpperCase()=="INPUT" ){
        f = nodoForm ;
        arrayInput.push( nodoForm ) ;
      } else {
        f = $(nodoForm).find('.form-group') || [];
        arrayInput = f.find('input').map( (elem) => {return elem;} ) || [] ;
      }
      let ferror   = false ;
      let emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i ;
      //
      //
      $(arrayInput).each(function() { // run all inputs
        var i    = $(this) ; // current input
        var rule = i.attr('data-rule');
        if (rule !== undefined) {
          var ierror = false; // error flag for current input
          var pos = rule.indexOf(':', 0);
          if (pos >= 0) {
            var exp = rule.substr(pos + 1, rule.length);
            rule = rule.substr(0, pos);
          } else {
            rule = rule.substr(pos + 1, rule.length);
          }
          switch (rule) {
            case 'required':
              if (i.val() === '') {
                ferror = ierror = true;
              }
              break;
            case 'minlen':
              if (i.val().length < parseInt(exp)) {
                ferror = ierror = true;
              }
              break;
            case 'email':
              if (!emailExp.test(i.val())) {
                ferror = ierror = true;
              }
              break;
            case 'checked':
              if (! i.is(':checked')) {
                ferror = ierror = true;
              }
              break;
            case 'regexp':
              exp = new RegExp(exp);
              if (!exp.test(i.val())) {
                ferror = ierror = true;
              }
              break;
          }
          //
          i.removeClass('is-invalid is-valid') ;
          if ( i.hasClass('validacionIcono') ){
            if ( ierror ){
              if ( i.attr('mandatorioSiBlanco') ){
                let nodoSiBlanco = $('#'+i.attr('mandatorioSiBlanco')) || false ;
                if ( nodoSiBlanco.prop('campoValido')==true ){
                  i.attr('warning-validacion','No hace falta si esta el email') ;
                  console.log('....otro campo es valido asi que ya fue') ;
                  ierror = false ;
                  i.prop('campoValido',true) ;
                } else {
                  console.log('....otro campo INVALIDO') ;
                  i.prop('campoValido',false) ;
                  i.addClass('is-invalid') ;
                }
              }
            } else {
              i.prop('campoValido',true) ;
              i.addClass('is-valid') ;
            }
          }
          //
          i.next('.validation').html((ierror ? ( (i.attr('warning-validacion')||i.attr('data-msg')||fase)!== false ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
        }
      });
      //
      f.children('textarea').each(function() {
        var i = $(this); // current input
        var rule = i.attr('data-rule');
        if (rule !== undefined) {
          var ierror = false; // error flag for current input
          var pos = rule.indexOf(':', 0);
          if (pos >= 0) {
            var exp = rule.substr(pos + 1, rule.length);
            rule = rule.substr(0, pos);
          } else {
            rule = rule.substr(pos + 1, rule.length);
          }
          switch (rule) {
            case 'required':
              if (i.val() === '') {
                ferror = ierror = true;
              }
              break;
  
            case 'minlen':
              if (i.val().length < parseInt(exp)) {
                ferror = ierror = true;
              }
              break;
          }
          //
          i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
          //
        }
      });
      //
      if ( ferror==true ){
        return false ;
      } else {
        return true ;
      }
      //
    } catch(errVal){
      throw errVal ;
    }
  }
  //
  render() {
    //
    return (
        //
        <React.Fragment>
            <div className='sweet-loading'>
                <BounceLoader
                sizeUnit={"px"}
                size={150}
                color={'#2dc997'}
                loading={this.state.flagLoadSpinner}
                />
            </div>
            <div className="form-group col-lg-2 col-md-2">
                <div className="text-center">
                    <button id="idButtonSuscripcion"
                            className="btn btn-info linea-suscripcion"
                            type="submit"
                            target="_blank"
                            disabled={this.state.suscripcionEnviada}
                            onClick={this.onClickEnviarSuscripcion.bind(this)}
                    >
                      Suscribirme
                    </button>
                </div>
            </div>
            <div id="idSuscripcionEnviada" className="info text-center"
                 style={this.state.suscripcionEnviada==true ? {display:'block'} : {display:'none'}}
                >
                <p>Muchas gracias por suscribirte!</p>
            </div>
        </React.Fragment>
        //
       )
    }
  }
/* */
export default BotonSuscripcion ;
/* */