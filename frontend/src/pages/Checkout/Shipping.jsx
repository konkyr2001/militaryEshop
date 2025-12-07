import { Map, Marker } from '@vis.gl/react-maplibre';
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from 'react';
import './Shipping.css';
import Loading from '../../components/Shared/Loading';

// const URL = 'https://nominatim.openstreetmap.org/reverse';

const mapURL = 'https://api.tomtom.com/search/2/reverseGeocode';
const mapKey = import.meta.env.VITE_MAPS_TOM_TOM_KEY;
const routingURL = 'https://api.geoapify.com/v1/routing';
const routingKey = import.meta.env.VITE_MAP_ROUTING_GEOAPIFY;
function Shipping({ location, setLocation, setIsDialogOpen, shippingRef, defaultLocation, setShippingCost }) {
    const modalRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState(location.coordinates)
    const [viewState, setViewState] = useState({
        ...location.coordinates,
        zoom: 9,
    });

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                modalRef &&
                !modalRef.current.contains(event.target) &&
                !shippingRef.current.contains(event.target)
            ) {
                setIsDialogOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMapClick = (event) => {
        const newPos = {
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
        };

        // Recenter the map to the clicked location
        setPosition((prev) => ({
            longitude: newPos.longitude,
            latitude: newPos.latitude,
        }));

        setViewState((prev) => ({
            ...prev,
            longitude: newPos.longitude,
            latitude: newPos.latitude,
        }));

        getRealLocation(newPos);
        getShippingCost(newPos);
    };

    const handleUseMyLocation = (e) => {
        e.preventDefault();
        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const newPos = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                };

                // Recenter map to user location
                setViewState((prev) => ({
                    ...prev,
                    longitude: newPos.longitude,
                    latitude: newPos.latitude,
                    zoom: 14, // optional: zoom in
                }));

                // Recenter the map to the clicked location
                setPosition((prev) => ({
                    longitude: newPos.longitude,
                    latitude: newPos.latitude,
                }));
                getRealLocation(newPos);
                getShippingCost(newPos);
            },
            () => alert("Could not get your location")
        );
    };

    async function getRealLocation(newPos) {
        try {
            const response = await fetch(`${mapURL}/${newPos.latitude},${newPos.longitude}.json?key=${mapKey}`)
            if (response.ok) {
                const result = await response.json();
                const locationMessage = setLocationMessage(result.addresses[0].address);
                console.log(locationMessage)
                setLocation({
                    ...location,
                    coordinates: newPos,
                    message: locationMessage,
                });
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    async function getShippingCost(newPos) {
        try {
            setIsLoading(true);
            const response = await fetch(`${routingURL}?waypoints=${defaultLocation.latitude},${defaultLocation.longitude}|${newPos.latitude},${newPos.longitude}&mode=truck&apiKey=${routingKey}`)
            if (response.ok) {
                const result = await response.json();
                setIsLoading(false);
                const distance = result.features[0].properties.distance;
                setShippingCost(parseInt(distance / 100000));
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error.message);
        }
    }

    function setLocationMessage(result) {
        let text = '';
        const city = result.localName;
        if (city)
            text += city + ', ';
        const country = result.country;
        if (country)
            text += country + ', ';
        const postalCode = result.postalCode;
        if (postalCode)
            text += postalCode;
        const trim = text.trim();
        const finalText = trim.charAt(trim.length - 1) === ',' ? trim.slice(0, -1) : trim;
        return finalText;
    }

    return <>
        {isLoading && <Loading />}
        <div className='map-modal border-cyan-500' ref={modalRef}>
            <div className='triangle-up absolute border-b-cyan-500 border-b-[15px] -top-4 left-1/2 -translate-x-1/2'></div>
            <div className='map-container'>
                <div className='map w-full flex justify-center items-center h-[300px]'>
                    <Map
                        {...viewState}
                        onMove={(evt) => setViewState(evt.viewState)} // allow manual pan/zoom
                        style={{ width: "100%", height: "100%", borderRadius: "15px" }}
                        mapStyle="https://tiles.openfreemap.org/styles/liberty"
                        onClick={handleMapClick}
                        attributionControl={false}
                    >
                        {position && (
                            <Marker
                                longitude={position.longitude}
                                latitude={position.latitude}
                            />
                        )}
                    </Map>
                    <button
                        onClick={(e) => handleUseMyLocation(e)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-[15px] absolute bottom-0 left-0"
                    >
                        Use My Location
                    </button>
                </div>

            </div>
        </div>
    </>
}

export default Shipping;