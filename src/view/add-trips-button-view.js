import AbstractView from '../framework/view/abstract-view';

const createNewEventButton = (isChangeButtonText) => (
  `<button class="trip-main__event-add-btn  btn  btn--big  ${!isChangeButtonText ? 'btn--blue' : 'btn--red'} btn--mb" type="button">${!isChangeButtonText ? 'Load more events' : 'Hide events'}</button>
  `);

export default class AddTripsButtonView extends AbstractView {
  #isChangeButtonText = false;

  constructor(isChangeButtonText) {
    super();
    this.#isChangeButtonText = isChangeButtonText;
  }

  get template() {
    return createNewEventButton(this.#isChangeButtonText);
  }

  setClickHandler = (callback, isChangeButtonText) => {
    this.#isChangeButtonText = isChangeButtonText;
    this._callback.loadMoreClick = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.loadMoreClick();
  };

  setHideClickHandler = (callback) => {
    this._callback.hideClick = callback;
    this.element.addEventListener('click', this.#hideClickHandler);
  };

  #hideClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.hideClick();
  };
}
