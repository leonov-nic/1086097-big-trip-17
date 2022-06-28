import AbstractView from '../framework/view/abstract-view';

const createNewEventButton = () => (
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--blue btn--mb" type="button">Load more events</button>
  `);

export default class AddTripsButtonView extends AbstractView {
  constructor () {
    super();
  }

  get template() {
    return createNewEventButton();
  }

  setClickHandler = (callback) => {
    this._callback.loadMoreClick = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    console.log('hello');
    this._callback.loadMoreClick();
  };
}
