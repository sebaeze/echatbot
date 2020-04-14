/*
*
*/
import React                      from 'react' ;
// import { WaibocReactWidget }      from 'waiboc-widget-react' ;
import { WaibocReactWidget }      from '../../../../../waiboc-widget-react/lib/index' ;
//
class ChatbotHome extends React.Component {
    //
    constructor(props){
        super(props) ;
        this.state = {
            flagShow: false
        }
    } ;
    //
    componentDidMount(){
        setTimeout(() => {
            this.setState({ flagShow: true }) ;
        }, 6000 ) ;
    }
    //
    render(){
        //
        return(
            <WaibocReactWidget
                idAgent={ __ID_WIDGET__ }
                backEndServer={ __URL_WIDGET__ }
                // options={false}
            />
        ) ;
        //
    }
    //
} ;
//
export default ChatbotHome ;
//