import { generateTrip } from '../fish/trip';

export default class TripsModel {
  #trips = Array.from({length: 5}, generateTrip);

  get trips() {
    return this.#trips;
  }
}
