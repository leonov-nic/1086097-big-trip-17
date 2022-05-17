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

const humanizeTripDueDate = (date) => dayjs(date).format('HH:mm');
const humanizeTripDueDateTwo = (date) => dayjs(date).format('MMM D');

const getDurationTime = (dateto, datefrom) => dayjs(dayjs(dateto).diff(dayjs(datefrom))).format('DD[D] HH[H] mm[M]');

const isTripExpiringToday = (datefrom) => datefrom && dayjs(datefrom).isSame(dayjs(), 'd') || datefrom && dayjs(datefrom).isAfter(dayjs(), 'd');

const isTripOverdue = (dateto) => dateto && dayjs(dateto).isBefore(dayjs(), 'd');

export { humanizeTripDueDate, humanizeTripDueDateTwo, getDurationTime, isTripExpiringToday, isTripOverdue, createPeriodOfTrips };
