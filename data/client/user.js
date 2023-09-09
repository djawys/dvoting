export const createUser = (user) => {
  return fetch(`/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((r) => {
      let p = r.json();
      return Promise.resolve(p);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};
