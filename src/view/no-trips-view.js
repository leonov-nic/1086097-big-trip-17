import AbstractView from '../framework/view/abstract-view';
import { NoTripsTextType } from '../const.js';

const createTripLoadingTemplate = (filterType) => {

  const textValue = NoTripsTextType[filterType];

  return (`<p class="trip-events__msg">${textValue}</p>`);
};

export default class NoTripsView extends AbstractView {
  #filterType = null;

  constructor (filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createTripLoadingTemplate(this.#filterType );
  }
}
