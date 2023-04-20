export function getUser() {
  return fetch('https://jsonplaceholder.typicode.com/post').then(response =>
    response.json()
  );
}
