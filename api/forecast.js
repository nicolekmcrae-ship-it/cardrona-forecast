export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const params = new URLSearchParams({
      latitude: '-44.86827',
      longitude: '168.95111',
      forecast_days: '3',
      hourly: 'temperature_2m,precipitation,snowfall,wind_speed_10m,wind_direction_10m,wind_gusts_10m,cloudcover',
      daily: 'snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max,temperature_2m_max,temperature_2m_min,wind_direction_10m_dominant',
      timezone: 'Pacific/Auckland'
    })

    const url = `https://api.open-meteo.com/v1/forecast?${params}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
