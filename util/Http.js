export default class Http {
  static request(url, method, param, callback) {
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: param ? JSON.stringify(param) : param,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(callback)
      .catch((error) => {
        console.error(error);
      });
  }
}