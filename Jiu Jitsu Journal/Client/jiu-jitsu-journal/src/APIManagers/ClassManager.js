import React from "react";

const baseUrl = '/api/class';

export const getAllClassess = () => {
  return fetch(baseUrl) 
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