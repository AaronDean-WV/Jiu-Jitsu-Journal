const baseUrl = 'https://localhost:5001/api/Class';

export const getAllClasses = () => {
  return fetch(baseUrl) 
    .then((res) => res.json())
};

export const getById = (id) => {
  return fetch(`${baseUrl}/${id}`)
    .then((res) => res.json())
};
export const getClassByUserId = (id) => {
  return fetch(`${baseUrl}/GetByUserId/${id}`)
    .then((res) => res.json())
};


export const addClass = (singleClass) => { 
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleClass),
  });
};