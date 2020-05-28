/*
*
*/
import React, { useState }          from 'react' ;
import { Typography }               from 'antd'  ;
//
const { Paragraph } = Typography ;
//
export const TextoExpandClose = (props) => {
    try {
        //
        const { className } = props ;
        const [expandable, setExpandable] = useState(true) ;
        const toggle = () => setExpandable(p => !p);
        //
        return(
            <div className={className} >
                <Paragraph ellipsis={{ rows: (props.rows ? props.rows : 2), expandable }} >
                    {props.text}
                </Paragraph>
                <a onClick={toggle}>
                    {
                        expandable==true    ?   props.translate.i18n.expand  :   props.translate.i18n.close
                    }
                </a>
            </div>
        )
        //
    } catch(errTEXC){
        console.log('...errTEXC: ',errTEXC) ;
        throw errTEXC ;
    }
} ;
//