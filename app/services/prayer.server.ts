export function listPrayerRequests() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
}

export function getPrayerRequest(id: string){
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then((response) => response.json())
  .then((json) => console.log(json));
}

type PrayerPayload = {
    title: string,
    body: string,
    userId: string,
}

export function postPrayerRequest(payload: PrayerPayload) {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
}
