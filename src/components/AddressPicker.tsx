import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import axios from 'axios'

interface AddressPickerProps {
  mapboxToken: string
  initialCenter?: { lat: number; lng: number }
  onLocationSelected?: (location: SelectedLocation) => void
}

interface SelectedLocation {
  lat: number
  lng: number
  address: string
}

interface MapboxResult {
  id: string
  place_name: string
  geometry: {
    coordinates: [number, number]
  }
}

const MapUpdater: React.FC<{ center: { lat: number; lng: number } }> = ({
  center,
}) => {
  const map = useMap()
  map.setView([center.lat, center.lng], map.getZoom())
  return null
}

const AddressPicker: React.FC<AddressPickerProps> = ({
  mapboxToken,
  initialCenter = { lat: -23.55052, lng: -46.633308 },
  onLocationSelected,
}) => {
  const [search, setSearch] = useState<string>('')
  const [results, setResults] = useState<MapboxResult[]>([])
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null)

  const searchAddress = async () => {
    if (!search) return

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          search,
        )}.json`,
        {
          params: {
            access_token: mapboxToken,
          },
        },
      )
      setResults(response.data.features)
    } catch (error) {
      console.error('Erro ao buscar endereços:', error)
    }
  }

  const handleSelectLocation = (location: MapboxResult) => {
    const [lng, lat] = location.geometry.coordinates
    const selected = { lat, lng, address: location.place_name }
    setSelectedLocation(selected)
    setResults([])
    if (onLocationSelected) {
      onLocationSelected(selected)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
    >
      <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar endereço..."
          style={{ width: '80%', padding: '10px' }}
        />
        <button onClick={searchAddress} style={{ marginLeft: '10px' }}>
          Buscar
        </button>
      </div>
      <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
        {results.map(result => (
          <div
            key={result.id}
            style={{
              cursor: 'pointer',
              padding: '10px',
              borderBottom: '1px solid #ddd',
            }}
            onClick={() => handleSelectLocation(result)}
          >
            {result.place_name}
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <MapContainer
          center={
            selectedLocation || {
              lat: initialCenter.lat,
              lng: initialCenter.lng,
            }
          }
          zoom={10}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {selectedLocation && <MapUpdater center={selectedLocation} />}
          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
          )}
        </MapContainer>
      </div>
    </div>
  )
}

export default AddressPicker
