/*global google*/
import React, { useState, useEffect } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

import GoogleMapDarkStyle from './GoogleMapDarkStyle';


const CinemaMap = withScriptjs(withGoogleMap((props) => {
    let isUnmounted = false;
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState(null);
    const [selectedMarkerId, setSelectedMarkerId] = useState(false);
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [location, setLocation] = useState(null);
    const [myLocation, setMyLocation] = useState({
        latitude: 48.125759,
        longitude: 11.5737859,
    });

    const onMapMounted = ref => {
        setMap(ref);
    }

    useEffect(() => {
        getMyLocation();

        return () => {
            isUnmounted = true;
        }
    }, []);

    const getMyLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            if (isUnmounted) {
                setMyLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }
        }, error => {
            console.error('Error locating your position', error);
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.error('User denied the request for Geolocation.');
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error('Location information is unavailable.');
                    break;
                case error.TIMEOUT:
                    console.error('The request to get user location timed out.');
                    break;
                case error.UNKNOWN_ERROR:
                    console.error('An unknown error occurred.');
                    break;
                default:
                    console.error('Error locating your position', error);
                    break;
            }
        });
    }

    const getNearbyCinemas = e => {
        if (location
            && location.latitude === myLocation.latitude
            && location.longitude === myLocation.longitude) {
            return;
        }

        setLocation(myLocation);
        const service = new google.maps.places.PlacesService(map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
        const request = {
            location: new google.maps.LatLng(myLocation.latitude, myLocation.longitude),
            query: 'cinema in munich',
            radius: 20000,
        };
        service.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                createMarkers(results);
            }
        });
    }

    const createMarkers = places => {
        const receivedMarkers = [];
        for (let i = 0; i < places.length; i++) {
            const place = places[i];
            const marker = {
                id: place.id,
                name: place.name,
                position: place.geometry.location,
                address: place.formatted_address,
            }
            receivedMarkers.push(marker);
        }
        setMarkers(receivedMarkers);
    }

    const setInfoWindow = id => {
        setSelectedMarkerId(id);
        setShowInfoWindow(true);
    }

    const closeInfoWindow = () => {
        setSelectedMarkerId(null);
        setShowInfoWindow(false);
    }

    return (
        <GoogleMap
            defaultZoom={14}
            onTilesLoaded={getNearbyCinemas}
            ref={onMapMounted}
            defaultOptions={{
                fullscreenControl: false,
                mapTypeControl: false,
                scaleControl: false,
                zoomControl: false,
                streetViewControl: false,
                overviewMapControl: false,
                rotateControl: false,
                styles: GoogleMapDarkStyle
            }}
            defaultCenter={{ lat: myLocation.latitude, lng: myLocation.longitude }}
        >
            {markers && markers.map(marker =>
                <Marker
                    key={marker.id}
                    position={marker.position}
                    onClick={() => setInfoWindow(marker.id)}>
                    {(showInfoWindow && selectedMarkerId === marker.id) &&
                        <InfoWindow onCloseClick={closeInfoWindow}>
                            <div style={{ color: '#000', padding: '5px' }}>
                                <h6>{marker.name}</h6>
                                <p>
                                    {marker.address.split(',')[0]}
                                    <br />
                                    {marker.address.split(',')[1]}
                                </p>
                                <a
                                    href={`http://www.google.com/search?q=${marker.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Find on Google
                                </a>
                            </div>
                        </InfoWindow>
                    }
                </Marker>
            )}
        </GoogleMap >
    )
}));

export default ({ isMarkerShown, myLocation }) => {
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    return (
        <CinemaMap
            isMarkerShown={isMarkerShown ? myLocation !== null : false}
            myLocation={myLocation}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
}