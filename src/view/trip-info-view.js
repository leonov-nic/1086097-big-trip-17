import AbstractView from '../framework/view/abstract-view';
import { createPeriodOfTrips }  from '../utils/trip';

const createTripInfoTemplate = (trips) => {
  const period = trips.length ? createPeriodOfTrips(trips) : '';
  const names = trips.map((item) => item.destination.name).join(' — ');

  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${names}</h1>

        <p class="trip-info__dates">${period}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>
  `);
};

export default class TripInfoView extends AbstractView {
  #trips = null;

  constructor(trips) {
    super();
    this.#trips = trips;
  }

  get template() {
    return createTripInfoTemplate(this.#trips);
  }
}
