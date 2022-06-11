import { generateTrip } from '../fish/trip';
import Observable from '../framework/observable.js';

export default class TripsModel extends Observable {
  #trips = Array.from({length: 5}, generateTrip);

  get trips() {
    return this.#trips;
  }

  updateTrip = (updateType, update) => {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting trip');
    }

    this.#trips = [...this.#trips.slice(0, index), update, ...this.#trips.slice(index + 1),];

    this._notify(updateType, update);
  };

  addTrip = (updateType, update) => {
    this.#trips = [update, ...this.#trips,];

    this._notify(updateType, update);
  };

  deleteTrip = (updateType, update) => {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting trip');
    }

    this.#trips = [...this.#trips.slice(0, index), ...this.#trips.slice(index + 1),];

    this._notify(updateType);
  };
}
