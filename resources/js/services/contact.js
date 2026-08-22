// resources/js/services/contact.js
// Public (no-auth) contact form submission.

export async function submitContact(payload) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.message || 'Something went wrong. Please try again.')
    err.status = res.status
    err.errors = data.errors || {}   // Laravel 422 field errors
    throw err
  }
  return data
}

export default submitContact
