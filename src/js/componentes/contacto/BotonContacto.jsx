/*
*
*/
import React, { Component       } from 'react'  ;
import $                          from 'jquery' ;
import { BounceLoader }           from 'react-spinners' ;
import {util}                     from '../../api/estadisticas' ;
//
class BotonContacto extends Component {
  constructor(props) {
    super(props) ;
    this.state = {flagLoadSpinner:false,consultaEnviada:false } ;
    this.onClickEnviarConsulta = this.onClickEnviarConsulta.bind(this) ;
    this.onClickMasConsultas   = this.onClickMasConsultas.bind(this)   ;
  }
  //
  componentDidMount(){}
  //
  onClickEnviarConsulta(argEventClick){
    try {
        //
        argEventClick.preventDefault() ;
        let idformulario = argEventClick.target.getAttribute('idform') || false ;
        if ( !idformulario ){ console.log('...ERROR: Falta id de formulario consulta'); }
        if ( idformulario.indexOf('#')==-1){ idformulario="#"+idformulario; }
        console.log('....idformulario: '+idformulario) ;
        //
        let flagValida = this.validaForm(idformulario) ;
        if ( flagValida==true ){
            this.setState({flagLoadSpinner:true}) ;
            let datosForm = util.valoresForm(idformulario) ;
            this.enviarConsulta(datosForm) ;
            var myVar = setTimeout(function(){
                this.setState({flagLoadSpinner:false}) ;
                this.setState({consultaEnviada:true}) ;
            }.bind(this), 2000);
        }
        //
    } catch(errenv){
        console.dir(errenv) ;
    }
  }
  //
  onClickMasConsultas(argEventMaConsultas){
      try {
        argEventMaConsultas.preventDefault() ;
        this.setState({consultaEnviada:false}) ;
      } catch(errMasConsul){
          console.dir(errMasConsul) ;
      }
  }
  //
  validaForm(argSelect){
    try {
      let nodoForm = $(argSelect) ;
      let f        = $(nodoForm).find('.form-group') ;
      let ferror   = false ;
      let emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i ;
      //
      f.find('input').each(function() { // run all inputs
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
  enviarConsulta(argConsulta){
    return new Promise(function(respResu,respRej){
      try {
        //
        const objEmail     = {method:'POST',body:JSON.stringify(argConsulta),
                              headers:{
                                   'Accept':'application/json',
                                   'Content-Type':'application/json',
                                   'accept':'application/json',
                                   'access-Control-Allow-Origin':'*',
                                   'access-Control-Allow-Methods':'*'
                                  }
                              } ;
        //
        fetch( '/consulta' ,objEmail)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: Enviando email. Http Status: "+response.status+'.') ;
                }
            })
            .then(function(respDatos){
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
            <div className="text-center">
                <button
                    id="idButtonEnviarConsulta"
                    type="submit" target="_blank"
                    idform={this.props.idform}
                    onClick={this.onClickEnviarConsulta.bind(this)}>
                    Enviar Mensaje
                </button>
            </div>
            <div id="idConsultaEnviada" className="overlay info text-center "
                 style={ this.state.consultaEnviada==true ? {display:'block'}: {display:'none'} }>
                <p>Su consulta fue enviada.</p>
                <p>Contestaremos a la brevedad.</p>
                <button id="idButtonNuevaConsulta" type="submit"
                        onClick={ this.state.consultaEnviada==true ? this.onClickMasConsultas.bind(this) : null }
                        >Enviar otra consulta</button>
            </div>
        </React.Fragment>
        //
       )
    }
  }
/* */
export default BotonContacto ;
/* */