import { generateTrips } from '../fish/trip';

export default class TripsModel {
  #trips = Array.from({length: 5}, generateTrips);

  get trips() {
    return this.#trips;
  }
}
