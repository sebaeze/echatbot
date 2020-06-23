/*
*
*/
import React                    from 'react' ;
import { Row, Button }          from 'antd'  ;
import { AnimacionLink }        from '../animacion/AnimacionLink' ;
//
const onClickRedirectAccount = (argEE) => {
    if ( argEE && argEE.preventDefault ){ argEE.preventDefault(); }
    window.location.href="/account";
}
//
export const ActionButtons = (props) => {
    let extraClassname = props.showLoginButton==true ? "" : "active" ;
    return(
        <Row className="waiboc-home-row-actions" >
            {
                props.showLoginButton==true
                    ?   <Button type="primary" size="large" className="waiboc-btn-action active " onClick={onClickRedirectAccount} >
                            {props.translate.login}
                        </Button>
                    :   null
            }
            <AnimacionLink texto={
                            <Button type="primary" size="large" className={`waiboc-btn-action ${extraClassname}`} >
                                {props.translate.moreInfo}
                            </Button>
                        }
                        offset={130}
                        siguienteDiv={props.siguienteDiv}
            />
        </Row>
    ) ;
} ;
//