import { generateTrip } from '../fish/trip';
import Observable from '../framework/observable.js';

export default class TripsModel extends Observable {
  #trips = Array.from({length: 5}, generateTrip);

  get trips() {
    return this.#trips;
  }
}
