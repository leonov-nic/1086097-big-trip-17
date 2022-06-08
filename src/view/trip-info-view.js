import AbstractView from '../framework/view/abstract-view';
import { createPeriodOfTrips }  from '../utils/trip';

const createTripInfoTemplate = (trips) => {
  const period = trips.length ? createPeriodOfTrips(trips) : '';

  const namesOfDestination = trips.map((item) => item.destination.name);
  const threeNamesOfDestination = trips.map((item) => item.destination.name).join(' — ');

  const basicСostOfAllOffers = trips.map((item) => Number(item.basePrice)).reduce((sum, elem) => sum + elem);
  const costOfAllOffers = [];
  let totalСost = basicСostOfAllOffers;
  let sumOfAllOffers = 0;
  trips.forEach((trip) => {
    if (trip.offers) {
      trip.offers.forEach((offer) => costOfAllOffers.push(offer.price));
    }
  });
  if (costOfAllOffers.length !== 0) {
    sumOfAllOffers = costOfAllOffers.reduce((sum, elem) => sum + elem);
    totalСost = sumOfAllOffers + basicСostOfAllOffers;
  }

  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${trips.length > 3 ? `${namesOfDestination.slice(0, 1)} —...— ${namesOfDestination.slice(-1)}` : threeNamesOfDestination}</h1>

        <p class="trip-info__dates">${period}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalСost}</span>
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
