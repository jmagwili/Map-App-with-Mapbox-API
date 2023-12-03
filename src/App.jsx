import { useState, useEffect, useRef } from "react";

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaLocationDot } from "react-icons/fa6";

const token = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  const [newPlace, setNewPlace] = useState(null);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 15,
  });

  const [mockApiData, setMockApiData] = useState([
    {
      username: "Shannon sins",
      coords: [120.9581200219007, 14.31781346759307],
    },
    {
      username: "Joshua Manalo",
      coords: [120.9650748167237, 14.336595493481354],
    },
    {
      username: "Jonel Belaro Bachar",
      coords: [120.98195064088475, 14.334375074985957],
    },
    {
      username: "Garret Cold Sucker",
      coords: [120.97472806593458, 14.328251988859591],
    },
    {
      username: "shanny sins",
      coords: [120.95176195520145, 14.325773806431215],
    },
    {
      username: "Sample Popup",
      coords: [120.95120637251404, 14.318910292569015],
    },
    {
      username: "Mantos Jonel",
      coords: [120.96523483539562, 14.319919646007861],
    },
  ]);
  console.log(mockApiData[0].coords[0]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
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

  const onClickMarker = (index) => {
    setSelectedMarker(index);
  };
  const closePopup = () => {
    setShowPopup(false);
    setSelectedMarker(null);
  };

  return (
    <>
      <div style={{ width: "50vw", height: "50vh" }}>
        <ReactMapGL
          {...viewport}
          mapboxAccessToken={token}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v12"
          interactive={true}
          onDrag={(e) => {
            setViewport({
              longitude: e.viewState.longitude,
              latitude: e.viewState.latitude,
            });
          }}
        >
          <Marker
            latitude={latitude}
            longitude={longitude}
            offsetLeft={-3.5 * viewport.zoom}
            offsetRight={-7 * viewport.zoom}
            draggable={true}
            onDragEnd={(e) => {
              setLatitude(e.lngLat.lat);
              setLongitude(e.lngLat.lng);
              console.log(e.lngLat.lat);
              console.log(e.lngLat.lng);
            }}
            onClick={onClickMarker}
          >
            <div>
              <FaLocationDot
                style={{
                  height: "40px",
                  width: "auto",
                  color: "red",
                }}
              />
            </div>
          </Marker>

          {showPopup && (
            <Popup
              latitude={latitude}
              longitude={longitude}
              offset={{
                "bottom-left": [12, -38],
                bottom: [0, -38],
                "bottom-right": [-12, -38],
              }}
              closeButton={true}
              closeOnClick={false}
              anchor="top"
              onClose={closePopup}
            >
              <h1>Popup</h1>
            </Popup>
          )}
        </ReactMapGL>
      </div>
      <h2>Multiple Locations</h2>
      <div style={{ width: "50vw", height: "50vh", marginTop: "50px"}}>
        <ReactMapGL
          longitude={mockApiData[3].coords[0]}
          latitude={mockApiData[3].coords[1]}
          zoom={12}
          mapboxAccessToken={token}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v12"
          interactive={true}
          center={mockApiData[0].coords}
        >
          {mockApiData.map((customer, index) => (
            <Marker
              key={index}
              latitude={customer.coords[1]}
              longitude={customer.coords[0]}
              onClick={() => onClickMarker(index)}
            >
              <div>
                <FaLocationDot
                  style={{
                    height: "40px",
                    width: "auto",
                    color: "red",
                  }}
                />
              </div>
            </Marker>
          ))}
          {selectedMarker !== null && (
            <Popup
              latitude={mockApiData[selectedMarker].coords[1]}
              longitude={mockApiData[selectedMarker].coords[0]}
              offset={{
                "bottom-left": [12, -38],
                bottom: [0, -38],
                "bottom-right": [-12, -38],
              }}
              closeButton={true}
              closeOnClick={false}
              anchor="top"
              onClose={closePopup}
              
            >
              <h2 style={{color:"black"}}>{mockApiData[selectedMarker].username}</h2>
            </Popup>
          )}
        </ReactMapGL>
      </div>
    </>
  );
}

export default App;
