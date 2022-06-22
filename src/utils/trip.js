import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(minMax);
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
const sortTripByDate = (tripA, tripB) => dayjs(tripA.dateFrom) - dayjs(tripB.dateFrom);
const sortTripByPrice = (tripA, tripB) => tripB.basePrice - tripA.basePrice;
const sortTripByTime = (tripA, tripB) =>  getDurationTimeForSort(tripB.dateTo, tripB.dateFrom) - getDurationTimeForSort(tripA.dateTo, tripA.dateFrom);

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
