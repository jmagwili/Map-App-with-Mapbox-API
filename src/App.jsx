import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import reactLogo from './assets/react.svg';
import ReactMapGL, { Marker } from 'react-map-gl'
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [count, setCount] = useState(0);
  const [longitude, setLongitude] = useState(0); 
  const [latitude, setLatitude] = useState(0);
  const [newPlace, setNewPlace] = useState(null) 
  
  const token = 'pk.eyJ1Ijoiam1hZ3dpbGkiLCJhIjoiY2xwaGZwaHh0MDJtOTJqbzVkanpvYjRkNSJ9.fZFeViJyigw6k1ebFAbTYA'
  
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(position.coords.longitude)
    })
    

    
  
  
  })

  const [viewport, changeViewPort] = useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 8

})
  
  return (
    <>
      
      <div style={{width: '100vw',height: '100vh', margin: "solid" }}>
      <ReactMapGL 
      //{...viewport}
      longitude={longitude}
      latitude={latitude}
      zoom={8}
      mapboxAccessToken={token}
      width = "100%"
      height = "100%"
      mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {newPlace ? (
          <>
            <Marker
              latitude={latitude}
              longitude={longitude}
              offsetLeft={-3.5 * viewport.zoom}
              offsetRight={-7 * viewport.zoom}
              onViewPortChange={(viewport)=>changeViewPort(viewport)}
            >

            </Marker>
          </>
        ):null}
      </ReactMapGL>
      </div>
    </>
  );
}

export default App;