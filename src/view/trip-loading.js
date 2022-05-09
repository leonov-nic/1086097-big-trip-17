import AbstractView from '../framework/view/abstract-view';

const createTripLoadingTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class TripLoadingView extends AbstractView {
  getTemplate() {
    return createTripLoadingTemplate();
  }
}
