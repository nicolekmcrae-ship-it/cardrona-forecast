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
    const endDate = new Date().toISOString().split('T')[0]
    
    const params = new URLSearchParams({
      latitude: '-44.86827',
      longitude: '168.95111',
      start_date: '2022-06-03',
      end_date: endDate,
      daily: 'snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max,temperature_2m_mean,wind_direction_10m_dominant',
      timezone: 'Pacific/Auckland'
    })

    const url = `https://archive-api.open-meteo.com/v1/archive?${params}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
