/*
*
*/
/*
*
*/
import React, { useState }                 from "react"      ;
import ReactDOM                            from "react-dom"  ;
//
import { InputTextAnswer }                 from '../src/js/componentes/input/InputTextAnswer' ;
//
export const App = (props) => {
    //
    return (
        <InputTextAnswer  customStyle={{width:'500px'}} />
    )
} ;
//
ReactDOM.render( <App />, document.getElementById("app") );
//