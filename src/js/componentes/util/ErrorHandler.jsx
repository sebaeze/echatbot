/*
*
*/
import React              from 'react' ;
import { sendError2Backend }            from '../../api/api' ;
//
export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    //
    componentDidCatch(error, info) {
      //
      console.log('....Error handler: error: ',error,' info: ',info,';') ;
      sendError2Backend({url: window.location.pathname,...error})
        .then((resuEnd)=>{
            this.setState({ hasError: true });
        })
        .catch((errRes)=>{
            this.setState({ hasError: true });
        }) ;
    //
    }
    //
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
      return this.props.children;
    }
}
//