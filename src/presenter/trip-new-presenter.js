import { render, remove, RenderPosition } from '../framework/render';
import { TripFormView } from '../view/trip-form-view';
// import { isEscKeyDown } from '../utils/common';
// import { isDatesEqual } from '../utils/trip';
// import { Mode } from '../const';
import {UserAction, UpdateType} from '../const.js';

const currentDate = new Date;

const newBlankTrip = {
  basePrice: '',
  dateFrom: `${currentDate}`,
  dateTo: `${currentDate}`,
  destination: {
    description: '',
    name: '',
    pictures: [
      {
        src: '#',
        description: '',
      }
    ]
  },
  id: '',
  offers: [],
  type: '',
};

export default class NewTripPresenter {
  #listComponent = null;
  #changeData = null;
  #formComponent = null;
  #destroyCallback = null;
  #trip = newBlankTrip;

  constructor (listComponent, changeDate) {
    this.#listComponent = listComponent;
    this.#changeData = changeDate;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    this.#destroyCallback();

    if (this.#formComponent !== null) {
      return;
    }

    this.#formComponent = new TripFormView(this.#trip, true);
    this.#formComponent.setCloseFormClickHandler(this.destroy);
    this.#formComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formComponent.setDeleteFormClickHandler(this.#handleDeleteClick);
    this.#formComponent.setAddDeleteOffers();
    // render(this.#formComponent, this.#listComponent);
    render(this.#formComponent, this.#listComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeyDown);

  };


  destroy = () => {
    if (this.#formComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#formComponent);
    this.#formComponent = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFormSubmit = (trip) => {
    this.#changeData(UserAction.ADD_TRIP, UpdateType.MINOR, {id: '45645', ...trip});
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
