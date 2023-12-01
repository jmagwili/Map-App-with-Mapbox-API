import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import ReactMapGL, { Marker, Popup } from 'react-map-gl'
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

  const [showPopup,setShowPopup] = useState(false);
  

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


  const onClickMarker = () => {
    setShowPopup(true);
  }
  const closePopup = () => {
    setShowPopup(false);
  };

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
                console.log(e.lngLat.lat)
                console.log(e.lngLat.lng)
              }}
              onClick={onClickMarker}
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

            {showPopup && (<Popup
              latitude={latitude}
              longitude={longitude}
              offset={{
                'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
              }}
              closeButton={true}
              closeOnClick={false}
              anchor='top'
              onClose={closePopup}
              >
              <h1>Popup</h1>
            </Popup>)}

            

        
      </ReactMapGL>
      </div>
    </>
  );
}

export default App;