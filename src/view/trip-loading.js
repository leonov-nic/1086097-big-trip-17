import {createElement} from '../render.js';

const createTripLoadingTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class TripLoadingView {
  getTemplate() {
    return createTripLoadingTemplate();
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
