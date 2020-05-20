/*
*
*/
import React, { Suspense }        from 'react' ;
import { Skeleton }               from 'antd'  ;
//
export const getComponent = (Component,argOpt={rows:1}) => props => {
    try {
      return (
        <Suspense fallback={ <Skeleton active  paragraph={{ rows: argOpt.rows }}  /> }>
            <Component {...props} />
        </Suspense>
      )
    } catch(errGC){
      console.log('...getComponent:: ERROR: ',errGC) ;
    }
  } ;
  //