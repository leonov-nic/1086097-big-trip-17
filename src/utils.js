import dayjs from 'dayjs';

const humanizeTripDueDate = (date) => dayjs(date).format('HH:mm');
const humanizeTripDueDateTwo = (date) => dayjs(date).format('MMM D');
const humanizeTripDueDateThird = (date) => dayjs(date).format('YY/MM/DD HH:mm');
const getDurationTime = (dateto, datefrom) => dayjs(dateto).diff(dayjs(datefrom), 'Minute');

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArray = (array) => {
  const newArray = array.slice(0, getRandomInteger(1, 5)).join(' ');
  return newArray;
};

const minFromArray = (items) => {
  const minItem = items.reduce((accumulator, currentValue) => accumulator < currentValue ? accumulator : currentValue);
  return minItem;
};

export { getRandomInteger, getRandomArray, humanizeTripDueDate, humanizeTripDueDateTwo, getDurationTime, minFromArray, humanizeTripDueDateThird };
