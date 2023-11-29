import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import reactLogo from './assets/react.svg';
import ReactMapGL, { Marker } from 'react-map-gl'
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaLocationDot } from "react-icons/fa6";

const token = import.meta.env.VITE_MAPBOX_TOKEN

function App() {
  const [count, setCount] = useState(0);
  const [longitude, setLongitude] = useState(0); 
  const [latitude, setLatitude] = useState(0);
  const [newPlace, setNewPlace] = useState(null) 
  
  
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position)=>{
      
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(latitude,longitude)
    },
      (error)=>{
        console.log(error)
      }, 
      {
        enableHighAccuracy: true
      }) 
  })

  const [viewport, changeViewPort] = useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 8
})
  
  return (
    <> 
      <div style={{width: '100vw',height: '100vh', margin: "solid red 20px" }}>
      <ReactMapGL 
      //{...viewport}
      longitude={longitude}
      latitude={latitude}
      zoom={15} 
      mapboxAccessToken={token}
      width = "100%"
      height = "100%"
      mapStyle="mapbox://styles/mapbox/streets-v12"
      
      >
        <Marker
              latitude={latitude}
              longitude={longitude}
              offsetLeft={-3.5 * viewport.zoom}
              offsetRight={-7 * viewport.zoom}
              draggable={true}
              onDragEnd={(e)=>{
                console.log(e.lngLat.lng,e.lngLat.lat)
              }}
            >
              <div>
                <FaLocationDot 
                  style={{
                    height: "40px",
                    width:"auto",
                    color:"red"
                  }}
                />

                </div>
            </Marker>
      </ReactMapGL>
      </div>
    </>
  );
}

export default App;