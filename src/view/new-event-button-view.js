import AbstractView from '../framework/view/abstract-view';

const createNewEventButton = () => (
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `);

export default class NewEventButtonView extends AbstractView {
  constructor () {
    super();
  }

  get template() {
    return createNewEventButton();
  }

  setClickHandler = (callback) => {
    this._callback.changeBlocking = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.changeBlocking();
  };
}
