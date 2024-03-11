import 'leaflet/dist/leaflet.css'
import {MapContainer,TileLayer} from 'react-leaflet'
import './map.css'

function Map(){
    return(
        
              <MapContainer style={{height:'400px'}} center={[-2.38437,29.46436]} zoom={13}>
                       <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
              </MapContainer>  
    )
}

export default Map