import AbstractView from '../framework/view/abstract-view.js';

const createTripLoadingTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoTripsView extends AbstractView {
  get template() {
    return createTripLoadingTemplate();
  }
}
