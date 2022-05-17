import { render, replace, remove } from '../framework/render';
import { TripFormView } from '../view/trip-form-view';
import { TripView } from '../view/trip-view';
import { isEscKeyDown } from '../utils/common';
import { Mode } from '../const';

export default class TripPresenter {
  #trip = null;
  #tripListComponent = null;
  #changeData = null;
  #tripComponent = null;
  #formComponent = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;

  constructor (listComponent, changeDate, changeMode) {
    this.#tripListComponent = listComponent;
    this.#changeData = changeDate;
    this.#changeMode = changeMode;
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripComponent, prevTripComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#formComponent, prevFormComponent);
    }

    remove(prevTripComponent);
    remove(prevFormComponent);
  };

  destroy = () => {
    remove(this.#tripComponent);
    remove(this.#formComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToTrip();
    }
  };

  #replaceFormToTrip = () => {
    replace(this.#tripComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #replaceTripToForm = () => {
    replace(this.#formComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
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
