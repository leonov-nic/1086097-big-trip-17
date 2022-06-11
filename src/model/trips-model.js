// import { generateTrip } from '../fish/trip';
import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';
import { getOffersByType } from '../utils/trip';

export default class TripsModel extends Observable {
  // #trips = Array.from({length: 5}, generateTrip);
  #trips = [];
  #allOffers = [];
  #destinations = [];
  #tripsApiService = null;

  constructor(tripsApiService) {
    super();
    this.#tripsApiService = tripsApiService;
  }

  init = async () => {
    try {
      const trips = await this.#tripsApiService.trips;
      const allOffers = await this.#tripsApiService.offers;
      this.#allOffers = allOffers;
      this.#destinations = await this.#tripsApiService.destinations;
      this.#trips = trips.map((trip) => this.#adaptToClient(trip, allOffers));
    } catch(err) {
      this.#trips = [];
      this.#allOffers = [];
    }

    this._notify(UpdateType.INIT);
  };

  #adaptToClient = (trip, allOffers) => {
    const allOfferByType = getOffersByType(allOffers, trip.type);
    const currentOffers = allOfferByType.filter((offer) => trip['offers'].includes(offer.id));

    const adaptedTrip = {...trip,
      dateFrom: trip['date_from'] !== null ? new Date(trip['date_from']) : trip['date_from'], // На клиенте дата хранится как экземпляр Date
      dateTo: trip['date_to'] !== null ? new Date(trip['date_to']) : trip['date_to'],
      basePrice: trip['base_price'],
      isFavorite: trip['is_favorite'],
      offers: currentOffers,
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

  get alloffers() {
    return this.#allOffers;
  }

  get destinations() {
    return this.#destinations;
  }

  updateTrip = async (updateType, update) => {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting trip');
    }

    try {
      const response = await this.#tripsApiService.updateTrip(update);
      const updatedTrip = this.#adaptToClient(response, this.#allOffers);
      this.#trips = [...this.#trips.slice(0, index), updatedTrip, ...this.#trips.slice(index + 1),];
      this._notify(updateType, updatedTrip);
    } catch(err) {
      throw new Error('Can\'t update trip');
    }
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
