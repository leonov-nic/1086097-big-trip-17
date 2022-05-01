import { generateTrip } from '../fish/trip';

export default class TripsModel {
  trips = Array.from({length: 7}, generateTrip);

  getTrips = () => this.trips;
}
