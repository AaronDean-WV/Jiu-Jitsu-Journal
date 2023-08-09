import React, { useState, createContext } from "react";

const baseUrl = '/api/class';

export const ClassContext = createContext();

export const getAllClasses = () => {
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