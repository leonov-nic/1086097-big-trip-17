import { createElement } from '../render';
import dayjs from 'dayjs';
import { min } from '../utils';

// dayjs.extend(minMax)

const createTripInfoTemplate = (trip) => {

  const trips = [...trip.getTrips()];

  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title"></h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>
    `);
};

export default class TripInfoView {
  constructor(trip) {
    this.trip = trip;
  }

  getTemplate() {
    return createTripInfoTemplate(this.trip);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
