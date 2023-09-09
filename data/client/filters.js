export const getCompanies = () => {
  return fetch(`/api/filter/company`)
    .then((r) => {
      let p = r.json();
      return Promise.resolve(p);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const getDivision = () => {
  return fetch(`/api/filter/division`)
    .then((r) => {
      let p = r.json();
      return Promise.resolve(p);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const getAstm = () => {
  return fetch(`/api/filter/astm`)
    .then((r) => {
      let p = r.json();
      return Promise.resolve(p);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const getCertificate = () => {
  return fetch(`/api/filter/certificate`)
    .then((r) => {
      let p = r.json();
      return Promise.resolve(p);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};
