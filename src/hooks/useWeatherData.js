import { useState, useEffect, useCallback } from 'react';
import { searchCoordinates, fetchAtmosphericTelemetry, interpretWeatherCode } from '../services/weatherService';

export function useWeatherData(initialCity = 'Lagos, Nigeria') {
  const [cityQuery, setCityQuery] = useState(initialCity);
  const [locationMeta, setLocationMeta] = useState({
    name: 'Lagos',
    country: 'Nigeria',
    latitude: 6.4541,
    longitude: 3.3947
  });

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C'); // 'C' ya 'F'

  // Temperature unit converter helper
  const formatTemp = useCallback(
    (celsiusVal) => {
      if (celsiusVal === undefined || celsiusVal === null) return '--°';
      if (unit === 'C') return `${Math.round(celsiusVal)}°`;
      return `${Math.round((celsiusVal * 9) / 5 + 32)}°`;
    },
    [unit]
  );

  // Weather data fetch function
  const loadWeather = useCallback(async (lat, lon, timezone) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAtmosphericTelemetry(lat, lon, timezone);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Data fetch karne mein masla aaya.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Search function for new cities
  const handleCitySearch = useCallback(
    async (cityName) => {
      setLoading(true);
      setError(null);
      try {
        const geo = await searchCoordinates(cityName);
        setLocationMeta({
          name: geo.name,
          country: geo.country,
          latitude: geo.latitude,
          longitude: geo.longitude
        });
        setCityQuery(`${geo.name}${geo.country ? ', ' + geo.country : ''}`);
        await loadWeather(geo.latitude, geo.longitude, geo.timezone);
      } catch (err) {
        setError(err.message || 'City coordinate resolve nahi ho saka.');
        setLoading(false);
      }
    },
    [loadWeather]
  );

  // Initial load
  useEffect(() => {
    handleCitySearch(initialCity);
  }, []);

  // Toggle unit C <-> F
  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  }, []);

  return {
    locationMeta,
    cityQuery,
    weatherData,
    loading,
    error,
    unit,
    formatTemp,
    toggleUnit,
    handleCitySearch,
    interpretWeatherCode
  };
}