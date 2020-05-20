//
import React                   from 'react' ;
import { Tag }                 from 'antd'  ;
//
const tagColors = ['blue','volcano','lime','geekblue','gold','magenta','purple'] ;
//
export const arrayTags = (text) => {
    try {
        //
        let tempTT = Array.isArray(text)==true ?
                        text.map((elemTT,idxTT)=>{
                            let idxColor = idxTT<tagColors.length ? idxTT : (idxTT % tagColors.length) ;
                            let color    = tagColors[ idxColor ] ;
                            return (
                                <span key={idxTT} style={{fontWeight:'500',display:'block',width:'100%'}} >
                                    <Tag color={color}>{elemTT}</Tag>
                                </span>
                            )
                        })
                        : <Tag color={tagColors[0]}>{text}</Tag> ;
        //
        return tempTT ;
        //
    } catch(errAT){
        console.log('...errAT: ',errAT) ;
        throw errAT ;
    }
} ;
//