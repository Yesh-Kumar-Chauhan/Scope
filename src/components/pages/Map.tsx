import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';
import { getMapData } from '../../apis/personnelApi'; // Adjust the import as necessary
import MapModal from './../modals/MapModal';

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDr5GZbwW5_GL81bmc_WqF2xRexOFpUzuY',
  });

  const [hoveredMarker, setHoveredMarker] = useState<any>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSiteData, setSelectedSiteData] = useState<any>(null); // State for selected site data

  const storedCenter = JSON.parse(localStorage.getItem('mapCenter') || '{}');
  const [center, setCenter] = useState(
    storedCenter.lat && storedCenter.lng
      ? { lat: storedCenter.lat, lng: storedCenter.lng }
      : { lat: 40.763430, lng: -73.523940 }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMapData();
        const formattedData = formatMapData(data);
        const newMarkerData = generateMarkerData(formattedData);
        setMarkers(newMarkerData);
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };

    fetchData();
  }, []);

  const formatMapData = (data: any[]) => {
    const groupedData: Record<string, { [key: string]: any }> = {};
  
    data.forEach((item: any) => {
      const { site, timesheet, personel } = item;
      const siteKey = site.siteNumber.toString();
  
      if (!groupedData[siteKey]) {
        groupedData[siteKey] = {
          ...site,
          ...timesheet,
          personal: [],
        };
      }
      if (timesheet.personID == personel.personalID) {
        const personalWithTimes = {
          ...personel,
          timeIn: timesheet.timeIn,
          timeOut: timesheet.timeOut,
          lunchIn:timesheet.lunchIn,
          lunchOut:timesheet.lunchOut,
          position:timesheet.position
        };
        groupedData[siteKey].personal.push(personalWithTimes);
      } else {
        groupedData[siteKey].personal.push(personel);
      }
    });
  
    return Object.values(groupedData);
  };
  

  const generateMarkerData = (formattedData: any[]) => {
    return formattedData.map((siteData: any, i: any) => {
      const { personal } = siteData;

      return {
        id: i,
        position: { lat: siteData?.latitude, lng: siteData?.longitude },
        name: `${siteData.siteNumber} ${siteData.siteName}`,
        description: `Total Staff :  ${personal?.length}`,
        siteData: siteData // Adding the siteData to the marker for later use
      };
    });
  };

  const handleMarkerClick = (marker: typeof markers[0]) => {
    setSelectedMarker(marker);
    setSelectedSiteData(marker.siteData); // Set the site data when the marker is clicked
    setIsModalOpen(true);
  };

  const handleHover = useCallback((marker: typeof markers[0]) => {
    setHoveredMarker(marker);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMarker(null);
    setSelectedSiteData(null); // Clear selected site data when closing modal
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ height: '100%', width: '100%', borderRadius: '32px', minHeight: '350px' }}
      center={center}
      zoom={5}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={{
            url: hoveredMarker && hoveredMarker.id === marker.id
              ? require('./../../assets/images/marker.png') // Change to light icon on hover
              : require('./../../assets/images/darkMarker.png'), // Default dark icon
            fillColor: '#EB00FF',
            scale: 7,
          }}
          onMouseOver={() => handleHover(marker)}
          onMouseOut={() => setHoveredMarker(null)}
          onClick={() => handleMarkerClick(marker)}
        />
      ))}

      {hoveredMarker && (
        <InfoWindow
          position={hoveredMarker.position}
          onCloseClick={() => setHoveredMarker(null)}
        >
          <div onClick={() => handleMarkerClick(hoveredMarker)} className="mapInfo" style={{ cursor: 'pointer' }}>
            <h3>{hoveredMarker.name}</h3>
            <p>{hoveredMarker.description}</p>
          </div>
        </InfoWindow>
      )}

      {isModalOpen && (
        <MapModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          selectedSiteData={selectedSiteData}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
