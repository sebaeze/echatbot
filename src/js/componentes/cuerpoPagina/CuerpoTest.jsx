/*
*
*/
import React             from 'react' ;
//
export class CuerpoTest extends React.Component {
    constructor(props){
        super(props) ;
        console.log('...estoy en (A)') ;
    }
    //
    render(){
        console.log('...estoy en (R)') ;
        return(
            <div style={{paddingTop:'100px',minHeight:'110vh'}} >
                <br/><br/>
                <h1>estoy en test</h1>
            </div>
        )
    }
    //
} ;
//