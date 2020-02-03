/*
*
*/
/*
*
*/
import React, { useState }                 from "react"      ;
import ReactDOM                            from "react-dom"  ;
//
import { InputTextAnswer }                 from '../src/js/componentes/input/InputTextEmojiAttachment' ;
//
//
import 'antd/dist/antd.css' ;
import '../src/css/estilos.css' ;
//
//
export const App = (props) => {
    //
    return (
        <div id="waiboc-main-node" >
            <InputTextAnswer  
                customStyle={{width:'500px'}}
                /*
                onChangeValue={(argEE)=>{
                    console.log('....onchange valllll:: argEE: ',argEE) ;
                }}
                */
            />
        </div>
    )
} ;
//
ReactDOM.render( <App />, document.getElementById("app") );
//