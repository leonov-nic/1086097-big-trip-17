import { render, replace } from '../framework/render';
import { TripFormView } from '../view/trip-form-view';
import { TripView } from '../view/trip-view';
import { isEscKeyDown } from '../utils/common';

export default class TripPresenter {
  #trip = null;
  #tripListComponent = null;
  #tripComponent = null;
  #tripFormComponent = null;

  constructor (trip, listComponent) {
    this.#trip = trip;
    this.#tripListComponent = listComponent;
    this.#tripComponent = new TripView(trip);
    this.#tripFormComponent = new TripFormView(trip);
  }

  init = () => {
    this.#tripComponent.setToFormClickHandler(this.#setToFormClickHandler);
    this.#tripFormComponent.setCloseFormClickHandler(this.#setCloseFormClickHandler);
    this.#tripFormComponent.setFormSubmitHandler(this.#setFormSubmitHandler);
    render(this.#tripComponent, this.#tripListComponent);
  };

  #replaceFormToTrip = () => {
    replace(this.#tripComponent, this.#tripFormComponent);
  };

  #onEscKeyDown = (evt) => {
    isEscKeyDown(evt, this.#replaceFormToTrip);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceTripToForm = () => {
    replace(this.#tripFormComponent, this.#tripComponent);
  };

  #setToFormClickHandler = () => {
    this.#replaceTripToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #setCloseFormClickHandler = () => {
    this.#replaceFormToTrip();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #setFormSubmitHandler = () => {
    this.#replaceFormToTrip();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
