import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import reactLogo from './assets/react.svg';
import ReactMapGL, { Marker } from 'react-map-gl'
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaLocationDot } from "react-icons/fa6";

const token = import.meta.env.VITE_MAPBOX_TOKEN

function App() {
  const [newPlace, setNewPlace] = useState(null)
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 15,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setViewport({
          ...viewport,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <> 
      <div style={{width: '100vw',height: '100vh', margin: "solid red 20px" }}>
      <ReactMapGL 
        {...viewport}
        mapboxAccessToken={token}
        width = "100%"
        height = "100%"
        mapStyle="mapbox://styles/mapbox/streets-v12"
        interactive = {true}
        onDrag={(e)=>{
          setViewport({
            longitude: e.viewState.longitude,
            latitude: e.viewState.latitude
          })
        }}
      >

            <Marker
              latitude={latitude}
              longitude={longitude}
              offsetLeft={-3.5 * viewport.zoom}
              offsetRight={-7 * viewport.zoom}
              draggable={true}
              onDragEnd={e=>{
                setLatitude(e.lngLat.lat)
                setLongitude(e.lngLat.lng)
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