/*
*
*/
import React, { Component }          from 'react' ;
//
export class BotonMenuResponsive extends Component {
    constructor(props){
        super(props) ;
    }
    //
    render(){
        return(
            <i aria-label="icon: menu" tabIndex="-1" className="anticon anticon-menu nav-phone-icon"
                style={{float:'right',marginRight:'25px',marginTop:'35px',border: '1px solid gray', padding: '2.5px 2.5px 2.5px 2.5px' }}
                onClick={ this.props.onClick }
            >
                <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="menu" width="2.5em" height="2.5em" fill="currentColor" aria-hidden="true">
                    <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                </svg>
            </i>
        ) ;
    }
    //
} ;
//