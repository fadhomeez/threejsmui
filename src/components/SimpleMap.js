import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 1.2806776729153755, 
      lng: 103.8492175265739
    },
    zoom: 17
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '40vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCSuvGozgSqjbX7zNnO3M5-PV62kQ6onH8" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={1.2806776729153755}
          lng={103.8492175265739}
          text="PARATLAS PTE LTD"
        />
      </GoogleMapReact>
    </div>
  );
}