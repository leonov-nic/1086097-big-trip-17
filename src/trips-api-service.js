import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class TripsApiService extends ApiService {
  get trips() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  updateTask = async (trip) => {
    const response = await this._load({
      url: `points/:${trip.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(trip)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (trip) => {
    const adaptedTrip = {...trip,
      'date_from': trip.dateFrom instanceof Date ? trip.dateFrom.toISOString() : null, // На сервере дата хранится в ISO формате
      'date_to': trip.dateTo instanceof Date ? trip.dateTo.toISOString() : null,
      'base_price': trip.basePrice,
      'is_favorite': trip.isFavorite,
    };

    delete adaptedTrip.dateFrom;
    delete adaptedTrip.dateTo;
    delete adaptedTrip.basePrice;
    delete adaptedTrip.isFavorite;

    return adaptedTrip;
  };
}
