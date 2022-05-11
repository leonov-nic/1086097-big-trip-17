import { isTripExpiringToday, isTripOverdue } from '../utils/trip';

const filters = {
  Everything: (trips) => trips.map((trip) => trip),
  Future: (trips) => trips.filter((trip) => isTripExpiringToday(trip.dateFrom)),
  Past: (trips) => trips.filter((trip) => isTripOverdue(trip.dateTo)),
};

export { filters };
