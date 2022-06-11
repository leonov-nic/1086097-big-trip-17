import { generateTrip } from '../fish/trip';
import Observable from '../framework/observable.js';
// import {UpdateType} from '../const.js';

export default class TripsModel extends Observable {
  #trips = Array.from({length: 5}, generateTrip);
  // #trips = [];
  #tripsApiService = null;

  constructor(tripsApiService) {
    super();
    this.#tripsApiService = tripsApiService;


    // console.log(this.#trips);
    // this.#tripsApiService.trips.then((trips) => {
    //   console.log(trips.map(this.#adaptToClient));
    // });
  }

  // init = async () => {
  //   try {
  //     const trips = await this.#tripsApiService.trips;
  //     this.#trips = trips.map(this.#adaptToClient);
  //   } catch(err) {
  //     this.#trips = [];
  //   }

  //   this._notify(UpdateType.INIT);
  // };

  #adaptToClient = (trip) => {
    const adaptedTrip = {...trip,
      dateFrom: trip['date_from'] !== null ? new Date(trip['date_from']) : trip['date_from'], // На клиенте дата хранится как экземпляр Date
      dateTo: trip['date_to'] !== null ? new Date(trip['date_to']) : trip['date_to'],
      basePrice: trip['base_price'],
      isFavorite: trip['is_favorite'],
    };

    delete adaptedTrip['date_from'];
    delete adaptedTrip['date_to'];
    delete adaptedTrip['base_price'];
    delete adaptedTrip['is_favorite'];

    return adaptedTrip;
  };

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
