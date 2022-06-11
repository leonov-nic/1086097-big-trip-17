const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArray = (array) => {
  const newArray = array.slice(0, getRandomInteger(1, 5)).join(' ');
  return newArray;
};

const isEscKeyDown = (evt, callback) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    callback();
  }
};

// const updateItem = (items, update) => {
//   const index = items.findIndex((item) => item.id === update.id);
//   if (index === -1) { return items; }
//   return [...items.slice(0, index), update, ...items.slice(index + 1),];
// };

export { getRandomInteger, getRandomArray, isEscKeyDown };
// export { getRandomInteger, getRandomArray, isEscKeyDown, updateItem };
