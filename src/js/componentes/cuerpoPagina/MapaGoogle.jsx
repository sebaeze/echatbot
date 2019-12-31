/*
*
*/
import React                                           from 'react' ;
import { Map, GoogleApiWrapper, Marker, InfoWindow }   from 'google-maps-react';
//
class MapaGoogle extends React.Component {
    constructor(props){
        super(props) ;
        let tempCoordenadasIni = this.props.coordenadaInicial ? this.props.coordenadaInicial : this.props.distribuidores[0].coordenadas ;
        this.state             = {isMobile: (window.innerWidth<797),coordenadaInicial: tempCoordenadasIni, coordenadasDistri: this.props.distribuidores } ;
    }
    //
    componentDidMount(){
        try {
            window.addEventListener("resize",function(argEventSCR){
                this.setState({isMobile: (window.innerWidth<797)});
            }.bind(this)) ;
        } catch(errD){
            console.dir(errD) ;
        }
    }
    //
    componentWillReceiveProps(newProps){
        try {
            if ( this.state.coordenadaInicial!=newProps.coordenadaInicial){
                let tempArrCoord = this.state.coordenadasDistri.map((elemD)=>{
                    let tempFlagVis = (newProps.coordenadaInicial.lat==elemD.coordenadas.lat && newProps.coordenadaInicial.lng==elemD.coordenadas.lng ) ;
                    return ({
                        name: elemD.name,
                        coordenadas: elemD.coordenadas,
                        flagVisible: tempFlagVis
                    }) ;
                }) ;
                this.setState({coordenadaInicial:newProps.coordenadaInicial,flagHighlight:true, coordenadasDistri: tempArrCoord}) ;
            }
        } catch(errWP){
            console.dir(errWP) ;
        }
    }
    //
    render(){
        //
        /*
        let arrayCoordenadas = this.props.distribuidores.map((elemDist,indice)=>{
            return({
                coordenadas: elemDist.coordenadas,
                name: elemDist.name,
                flagVisible: (this.state.flagHighlight==true && this.state.coordenadaInicial.lat==elemDist.coordenadas.lat && this.state.coordenadaInicial.lng==elemDist.coordenadas.lng ) ? true : false
            }) ;
        }) ;
        //
        console.dir(arrayCoordenadas) ;
        */
        return(
            <Map
                google={this.props.google}
                //zoom={8}
                style={{width:(this.state.isMobile==true ? '350px' : '500px' ),height:(this.state.isMobile==true ? '350px' : '500px' )}}
                initialCenter={{...this.state.coordenadaInicial}}
                >
                    {
                        this.state.coordenadasDistri.map(function(elemDist,indDist){
                            console.log('......corodod:: flag: '+elemDist.flagVisible+';');
                            return (
                                (elemDist.flagVisible && elemDist.flagVisible==true) ?
                                <Marker key={indDist} name={elemDist.name} position={{ lat: elemDist.coordenadas.lat, lng: elemDist.coordenadas.lng }} >
                                    <InfoWindow visible={true}>
                                        <div> <h1>acaaaaaaaaaaaaaaaaaaa</h1> </div>
                                    </InfoWindow>
                                </Marker>
                                :
                                <Marker key={indDist} name={elemDist.name}
                                        position={{ lat: elemDist.coordenadas.lat, lng: elemDist.coordenadas.lng }} />
                            )
                        }.bind(this))
                    }
            </Map>
        )
    }
    //
} ;
//
export default GoogleApiWrapper({
    apiKey:"AIzaSyDFYMlCDfFK7GdJ8ngeJbBz4-yFbksHQmI"
  })(MapaGoogle)
//