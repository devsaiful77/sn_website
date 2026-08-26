// API endpoints live under /api
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// Public assets (images in public/) are served from the site ROOT, not /api.
// Use this for images, not API_BASE_URL.
export const APP_URL = import.meta.env.VITE_APP_URL || ''

// Build a URL for a file inside public/.
//   asset('Contents/images/slider/01.jpg')
//   -> APP_URL set:  http://127.0.0.1:8000/Contents/images/slider/01.jpg
//   -> APP_URL empty: /Contents/images/slider/01.jpg   (same-origin, works fine)
export const asset = (path) => `${APP_URL}/${String(path).replace(/^\/+/, '')}`