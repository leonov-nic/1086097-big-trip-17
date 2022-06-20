import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

const createPeriodOfTrips = (trips) => {
  const allStartDates = trips.map((trip) => dayjs(trip.dateFrom));
  const allFinishDates = trips.map((trip) => dayjs(trip.dateTo));

  if (allStartDates && allFinishDates) {
    return `${dayjs.min([...allStartDates]).format('D MMM')} – ${dayjs.max([...allFinishDates]).format('D MMM')}`;
  }
};

const getOffersByType = (offers, type) => offers.find((offer) => offer.type === type).offers;

const getDestinationByName = ((destinations, name) => destinations.find((place) => place.name === name));

const humanizeTripDueDate = (date) => dayjs(date).format('HH:mm');
const humanizeTripDueDateTwo = (date) => dayjs(date).format('MMM D');

const getDurationTime = (dateto, datefrom) => {
  const diffDay = dayjs(dateto).diff(dayjs(datefrom), 'day', true);
  const diffHour = dayjs(dateto).diff(dayjs(datefrom), 'hour', true);
  const days = Math.floor(diffDay);
  const hours = Math.floor((diffDay - days) * 24 + 0.01);
  const hoursTwo = Math.floor(diffHour);
  const minutes = Math.floor((diffHour - hoursTwo) * 60 + 0.1);
  return `${days > 0 ? `${days}D` : ''} ${hours >= 0 ? `${hours}H` : ''} ${minutes}M`;
};

const getDurationTimeForSort = (dateto, datefrom) => dayjs(dateto).diff(dayjs(datefrom));

const sortTripByDate = (tripA, tripB) => {
  if (tripA.dateFrom > tripB.dateFrom) {
    return 1;
  }
  if (tripA.dateFrom < tripB.dateFrom) {
    return -1;
  }
  return 0;
};

const sortTripByPrice = (tripA, tripB) => {
  if (tripA.basePrice > tripB.basePrice) {
    return -1;
  }
  if (tripA.basePrice < tripB.basePrice) {
    return 1;
  }
  return 0;
};

const sortTripByTime = (tripA, tripB) => {
  const diffA = Math.abs(getDurationTimeForSort(tripA.dateTo, tripA.dateFrom));
  const diffB = Math.abs(getDurationTimeForSort(tripB.dateTo, tripB.dateFrom));
  if (diffA > diffB) {
    return -1;
  }
  if (diffA < diffB) {
    return 1;
  }
  return 0;
};

const isTripExpiringToday = (datefrom, dateto) => datefrom && dayjs(datefrom).isSame(dayjs(), 'd') || datefrom && dayjs(datefrom).isAfter(dayjs(), 'd') || dateto && datefrom && dayjs(datefrom).isBefore(dayjs(), 'D') && dayjs(dateto).isAfter(dayjs(), 'D');
const isTripOverdue = (dateto, datefrom) =>  dateto && dayjs(dateto).isBefore(dayjs(), 'D') || dateto && datefrom && dayjs(datefrom).isBefore(dayjs(), 'D') && dayjs(dateto).isAfter(dayjs(), 'D');
const isDateToNotCorrect = (datefrom, dateto) => dayjs(dateto).isBefore(dayjs(datefrom));

export {
  humanizeTripDueDate,
  humanizeTripDueDateTwo,
  getDurationTime,
  isTripExpiringToday,
  isTripOverdue,
  isDateToNotCorrect,
  createPeriodOfTrips,
  sortTripByPrice,
  sortTripByTime,
  sortTripByDate,
  getOffersByType,
  getDestinationByName
};
