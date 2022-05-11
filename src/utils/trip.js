import dayjs from 'dayjs';

const minMax = require('dayjs/plugin/minMax');
dayjs.extend(minMax);

const createPeriodOfTrips = (trips) => {
  const arrayOfDateFrom = trips.map((trip) => dayjs(trip.dateFrom));
  const arrayOfDateTo = trips.map((trip) => dayjs(trip.dateTo));
  return `${dayjs.min([...arrayOfDateFrom]).format('MMM D')} – ${dayjs.max([...arrayOfDateTo]).format('MMM D')}`;
};

const humanizeTripDueDate = (date) => dayjs(date).format('HH:mm');
const humanizeTripDueDateTwo = (date) => dayjs(date).format('MMM D');

const getDurationTime = (dateto, datefrom) => {
  const diffTime = dayjs(dateto).diff(dayjs(datefrom));
  const days = dayjs(dateto).diff(dayjs(datefrom), 'd');
  const hours = dayjs(diffTime).format('HH');
  const minutes = dayjs(diffTime).format('mm');
  const newDiffTime = `${days}D ${hours}H ${minutes}M`;
  return newDiffTime;
};

const isTripExpiringToday = (datefrom) => datefrom && dayjs(datefrom).isSame(dayjs(), 'd') || datefrom && dayjs(datefrom).isAfter(dayjs(), 'd');

const isTripOverdue = (dateto) => dateto && dayjs(dateto).isBefore(dayjs(), 'd');

export { humanizeTripDueDate, humanizeTripDueDateTwo, getDurationTime, isTripExpiringToday, isTripOverdue, createPeriodOfTrips };
