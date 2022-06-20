import { isTripExpiringToday, isTripOverdue } from '../utils/trip';

const filter = {
  Everything: (trips) => trips,
  Future: (trips) => trips.filter((trip) => isTripExpiringToday(trip.dateFrom, trip.dateTo)),
  Past: (trips) => trips.filter((trip) => isTripOverdue(trip.dateTo, trip.dateFrom)),
};

export { filter };
