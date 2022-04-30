const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const getRandomArray = (array) => {
  const newArray = array.slice(0, getRandomInteger(1, 5)).join(' ');
  return newArray;
};

export { getRandomInteger, getRandomArray };