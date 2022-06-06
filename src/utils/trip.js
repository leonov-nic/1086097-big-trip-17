import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

// console.log(dayjs())

// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
// dayjs.extend(isSameOrBefore);

const createPeriodOfTrips = (trips) => {
  const arrayOfDateFrom = trips.map((trip) => dayjs(trip.dateFrom));
  const arrayOfDateTo = trips.map((trip) => dayjs(trip.dateTo));

  if (arrayOfDateFrom.length && arrayOfDateTo.length) {
    return `${dayjs.min([...arrayOfDateFrom]).format('MMM D')} – ${dayjs.max([...arrayOfDateTo]).format('MMM D')}`;
  }
};

const isDatesEqual = (dateA, dateB) => dayjs(dateA).isSame(dateB);

const generateAllOffersOfTrip = ((offers, type) => offers.find((item) => item.type === type));

const getDestinationByName = ((destinations, name) => destinations.find((item) => item.name === name));

const humanizeTripDueDate = (date) => dayjs(date).format('HH:mm');
const humanizeTripDueDateTwo = (date) => dayjs(date).format('MMM D');

const getDurationTime = (dateto, datefrom) => `${Number(dayjs(dayjs(dateto).diff(dayjs(datefrom))).format('MM')) > 1 ?
  dayjs(dayjs(dateto).diff(dayjs(datefrom))).format('M[Months] DD[D] HH[H] mm[M]') :
  dayjs(dayjs(dateto).diff(dayjs(datefrom))).format('M[Month] DD[D] HH[H] mm[M]')}`;

const getDurationTimeForSort = (dateto, datefrom) => dayjs(dateto).diff(dayjs(datefrom));

const sortTripByDate = (tripA, tripB) => {
  if (tripA.dateFrom > tripB.dateFrom) {
    return -1;
  }
  if (tripA.dateFrom < tripB.dateFrom) {
    return 1;
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
  const diffA = getDurationTimeForSort(tripA.dateTo, tripA.dateFrom);
  const diffB = getDurationTimeForSort(tripB.dateTo, tripB.dateFrom);
  if (diffA > diffB) {
    return -1;
  }
  if (diffA < diffB) {
    return 1;
  }
  return 0;
};

const isTripExpiringToday = (datefrom) => datefrom && dayjs(datefrom).isSame(dayjs(), 'd') || datefrom && dayjs(datefrom).isAfter(dayjs(), 'd');
const isTripOverdue = (dateto) => dateto && dayjs(dateto).isBefore(dayjs(), 'd');
// const isTripOverdue = (dateto) => dateto && dayjs(dateto).isSameOrBefore(dayjs(), 'd');

export {
  humanizeTripDueDate,
  humanizeTripDueDateTwo,
  getDurationTime,
  isTripExpiringToday,
  isTripOverdue,
  createPeriodOfTrips,
  sortTripByPrice,
  sortTripByTime,
  sortTripByDate,
  generateAllOffersOfTrip,
  getDestinationByName,
  isDatesEqual
};
