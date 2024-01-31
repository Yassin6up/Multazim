// DataStorage.js
let storedData = {};

export const setStoredData = (data) => {
    
  storedData = data;

};

export const getStoredData = () => {
  return storedData;
};
