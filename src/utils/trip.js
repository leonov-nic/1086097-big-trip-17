import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

const createPeriodOfTrips = (trips) => {
  const arrayOfDateFrom = trips.map((trip) => dayjs(trip.dateFrom));
  const arrayOfDateTo = trips.map((trip) => dayjs(trip.dateTo));

  if (arrayOfDateFrom.length && arrayOfDateTo.length) {
    return `${dayjs.min([...arrayOfDateFrom]).format('MMM D')} – ${dayjs.max([...arrayOfDateTo]).format('MMM D')}`;
  }
};

const generateAllOffersOfTrip = ((offers, type) => offers.find((item) => item.type === type));

const getDestinationByName = ((destinations, name) => destinations.find((item) => {
  const df = destinations.some((element) => element.name === name)
  if (!df) return 'Geneva';
  return item.name === name
}));

const humanizeTripDueDate = (date) => dayjs(date).format('HH:mm');
const humanizeTripDueDateTwo = (date) => dayjs(date).format('MMM D');

const getDurationTime = (dateto, datefrom) => dayjs(dayjs(dateto).diff(dayjs(datefrom))).format('DD[D] HH[H] mm[M]');
const getDurationTimeForSort = (dateto, datefrom) => dayjs(dateto).diff(dayjs(datefrom));

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

export {
  humanizeTripDueDate,
  humanizeTripDueDateTwo,
  getDurationTime,
  isTripExpiringToday,
  isTripOverdue,
  createPeriodOfTrips,
  sortTripByPrice,
  sortTripByTime,
  generateAllOffersOfTrip,
  getDestinationByName
};
