/*
*
*/
import React                       from 'react' ;
import moment                      from 'moment-timezone'  ;
import { Icon, Popconfirm  }       from 'antd'  ;
import { TextoExpandClose  }       from '../../texto/TextoExpandClose'    ;
//
export const columnsSlots = (props) => {
    try {
        let outCols   = [] ;
        //
        let tempLang = navigator.language || navigator.languages[0] || 'es' ;
        moment.locale(tempLang) ;
        //
        try {
            //
            outCols = [
                {title: props.translate.table.slotName ,
                        dataIndex: 'name',width:200,key: 'name',
                        render: (text,argRow) => {
                            return(
                                <div>
                                    <span className="waiboc-tab-id-name" onClick={(argEE)=>{argEE.preventDefault();props.onClickEditSlot(argRow);}} >
                                        <u>{text}</u>
                                    </span>
                                    <br/>
                                    <div className="waiboc-tab-edit-opt"  >
                                        <a style={{fontWeight:'500',fontSize:'18px',color:'#497EC0'}}
                                            onClick={(argEE)=>{argEE.preventDefault();props.onClickEditSlot(argRow);}}
                                        >
                                            <Icon type="edit" style={{color:'green'}}/>
                                            <span style={{marginLeft:'7px'}} >{props.translate.edit}</span>
                                        </a>
                                        <Popconfirm placement="topRight" title={props.translate.form.deleteEntityConfirmation}
                                            onConfirm={()=>{props.onClickDeleteSlot(argRow)}}
                                            okText={props.translate.yes} cancelText="No"
                                        >
                                            <a >
                                                <Icon type="delete" style={{color:'red'}}/>
                                                <span style={{marginLeft:'7px'}} >{props.translate.delete}</span>
                                            </a>
                                        </Popconfirm>
                                    </div>
                                </div>
                        )},
                        sorter: (a, b) => a.name.localeCompare(b.name)
                },
                {title: props.translate.table.botAsk ,width: 250,
                        dataIndex:'question', key:'question',
                        render: (text) => {
                            return(
                                <TextoExpandClose text={text} rows={3} translate={props.translate} className={"waiboc-tab-expand-text"} />
                            )}
                },
                {title: props.translate.table.description ,width: 150,
                    dataIndex:'description', key:'description',
                    render: (text) => <span style={{fontWeight:'500',fontSize:'18px'}}>{text}</span>,
                    sorter: (a, b) => a.description.localeCompare(b.description)
                },
                {title: props.translate.table.language ,width: 150,
                    dataIndex:'language', key:'language',
                    render: (text) => <span style={{fontWeight:'600',fontSize:'18px'}}>{text}</span>,
                    sorter: (a, b) => a.language.localeCompare(b.language)
                },
                {title: props.translate.table.lastUpdate ,
                    dataIndex:'ts_last_update', key:'ts_last_update',width: 250,
                    render: (text) => <span style={{fontWeight:'600',fontSize:'18px'}}>{moment(text).fromNow()}</span>,
                    defaultSortOrder: 'descend', sorter: (a, b) => a.ts_last_update.localeCompare(b.ts_last_update)
                }
            ] ;
            //
        } catch(errPC){
            console.dir(errPC) ;
        }
        return outCols ;
        //
    } catch(errCS){
        console.log('...ERROR: ',errCS) ;
        throw errCS ;
    }
} ;
//