import { render, replace, remove } from '../framework/render';
import { TripFormView } from '../view/trip-form-view';
import { TripView } from '../view/trip-view';
import { isEscKeyDown } from '../utils/common';

export default class TripPresenter {
  #trip = null;
  #tripListComponent = null;
  #changeData = null;
  #tripComponent = null;
  #formComponent = null;

  constructor (listComponent, changeDate) {
    this.#tripListComponent = listComponent;
    this.#changeData = changeDate;
  }

  init = (trip) => {
    this.#trip = trip;

    const prevTripComponent = this.#tripComponent;
    const prevFormComponent = this.#formComponent;

    this.#tripComponent = new TripView(trip);
    this.#formComponent = new TripFormView(trip);

    this.#tripComponent.setToFormClickHandler(this.#replaceTripToForm);
    this.#tripComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#formComponent.setCloseFormClickHandler(this.#replaceFormToTrip);
    this.#formComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevTripComponent === null || prevFormComponent === null) {
      render(this.#tripComponent, this.#tripListComponent);
      return;
    }

    if (this.#tripListComponent.contains(prevTripComponent.element)) {
      replace(this.#tripComponent, prevTripComponent);
    }

    if (this.#tripListComponent.contains(prevFormComponent.element)) {
      replace(this.#formComponent, prevFormComponent);
    }

    remove(prevTripComponent);
    remove(prevFormComponent);
  };

  destroy = () => {
    remove(this.#tripComponent);
    remove(this.#formComponent);
  };

  #replaceFormToTrip = () => {
    replace(this.#tripComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceTripToForm = () => {
    replace(this.#formComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    isEscKeyDown(evt, this.#replaceFormToTrip);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#trip, isFavorite: !this.#trip.isFavorite});
  };

  #handleFormSubmit = (trip) => {
    this.#changeData(trip);
    this.#replaceFormToTrip();
  };
}
