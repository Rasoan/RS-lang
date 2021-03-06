const putWithTokenRequest = (url, token, body) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  });
};

export default putWithTokenRequest;
