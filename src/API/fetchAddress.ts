
import React from 'react'

const fetchAddress = async (latitude: number, longitude: number) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'geolocation/1.0 (newgmail@gmail.com)',
            },
        })
        if (!response.ok) {
          
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        if (data) {
          const address = data.display_name
          return address
        }

      } catch (error) {
        console.log('Error fetching address:', error)
      }
  }

export default fetchAddress

