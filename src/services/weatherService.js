// Open-Meteo High Precision Weather & Geocoding Service

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * City name se coordinates (lat, lon) search karta hai
 */
export async function searchCoordinates(cityName) {
  try {
    const response = await fetch(
      `${GEOCODING_URL}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    );
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error(`Location "${cityName}" nahi mili.`);
    }

    const firstMatch = data.results[0];
    return {
      name: firstMatch.name,
      country: firstMatch.country || '',
      latitude: firstMatch.latitude,
      longitude: firstMatch.longitude,
      timezone: firstMatch.timezone || 'auto',
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

/**
 * Lat/Lon ke zariye full institutional atmospheric telemetry fetch karta hai
 */
export async function fetchAtmosphericTelemetry(lat, lon, timezone = 'auto') {
  try {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      timezone: timezone,
      // Current conditions
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'is_day',
        'precipitation',
        'weather_code',
        'surface_pressure',
        'wind_speed_10m',
        'wind_direction_10m'
      ].join(','),
      // Hourly data (Spline curve & Chance of Rain)
      hourly: [
        'temperature_2m',
        'precipitation_probability',
        'precipitation',
        'weather_code'
      ].join(','),
      // Daily forecast (7 Days)
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_probability_max'
      ].join(','),
    });

    const response = await fetch(`${WEATHER_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Meteorological satellite link fail ho gaya.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Weather telemetry fetch error:', error);
    throw error;
  }
}

/**
 * WMO Weather Codes ko human-readable condition aur icon type mein map karta hai
 */
export function interpretWeatherCode(code) {
  // 0: Clear
  if (code === 0) return { label: 'Clear Sky', type: 'sun' };
  // 1-3: Partly Cloudy / Overcast
  if (code >= 1 && code <= 3) return { label: 'Partly Cloudy', type: 'cloud' };
  // 45, 48: Fog
  if (code === 45 || code === 48) return { label: 'Foggy', type: 'cloud' };
  // 51-55: Drizzle, 61-65: Rain
  if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65)) {
    return { label: 'Raining', type: 'rain' };
  }
  // 71-77: Snow
  if (code >= 71 && code <= 77) return { label: 'Snowing', type: 'snow' };
  // 80-82: Rain Showers
  if (code >= 80 && code <= 82) return { label: 'Rain Showers', type: 'rain' };
  // 95-99: Thunderstorm
  if (code >= 95 && code <= 99) return { label: 'Thunderstorm', type: 'thunder' };

  return { label: 'Clear', type: 'sun' };
}