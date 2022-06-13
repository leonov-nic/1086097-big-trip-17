import ApiService from './framework/api-service';
import { HTTPMethods } from './const';

export default class TripsApiService extends ApiService {
  get trips() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  updateTrip = async (trip) => {
    const response = await this._load({
      url: `points/${trip.id}`,
      method: HTTPMethods.PUT,
      body: JSON.stringify(this.#adaptToServer(trip)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  addTrip = async (trip) => {
    const response = await this._load({
      url: 'points',
      method: HTTPMethods.POST,
      body: JSON.stringify(this.#adaptToServer(trip)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteTrip = async (trip) => {
    await this._load({
      url: `points/${trip.id}`,
      method: 'DELETE',
    });
  };

  #adaptToServer = (trip) => {
    // debugger;
    const adaptedTrip = {...trip,
      'date_from': trip.dateFrom instanceof Date ? trip.dateFrom.toISOString() : new Date(trip.dateFrom).toISOString(), // На сервере дата хранится в ISO формате
      'date_to': trip.dateTo instanceof Date ? trip.dateTo.toISOString() : new Date(trip.dateTo).toISOString(),
      'base_price': trip.basePrice,
      'is_favorite': trip.isFavorite ? trip.isFavorite : false,
      'offers': trip.offers.length ? trip.offers.map((offer) => offer.id) : [],
    };

    delete adaptedTrip.dateFrom;
    delete adaptedTrip.dateTo;
    delete adaptedTrip.basePrice;
    delete adaptedTrip.isFavorite;

    return adaptedTrip;
  };
}
