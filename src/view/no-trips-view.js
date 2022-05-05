import {createElement} from '../render.js';

const createTripLoadingTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoTripsView {
  #element = null;

  get template() {
    return createTripLoadingTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
