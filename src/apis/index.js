const config = {
  // URL: 'https://static.adbrix.io/front/coding-test'
  URL: '.'
}

const event1 = async () => {
  // const response = await fetch(`${config.URL}/event_1.json`)
  const response = await fetch('/event/event_1.json')
  return response.json()
}

const event3 = async () => {
  // const response = await fetch(`${config.URL}/event_3.json`)
  const response = await fetch('/event/event_3.json')
  return response.json()
}

const API = {
  event1,
  event3
}

export default API
