import { render, replace, remove } from '../framework/render';
import { TripFormView } from '../view/trip-form-view';
import { TripView } from '../view/trip-view';
import { isEscKeyDown } from '../utils/common';
// import { isDatesEqual } from '../utils/trip';

import { Mode } from '../const';

import {UserAction, UpdateType} from '../const.js';

export default class TripPresenter {
  #trip = null;
  #allOffers = null;
  #allDestinations = null;
  #tripListComponent = null;
  #changeData = null;
  #tripComponent = null;
  #formComponent = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;

  constructor (listComponent, changeDate, changeMode, alloffers, destinations) {
    this.#tripListComponent = listComponent;
    this.#changeData = changeDate;
    this.#changeMode = changeMode;
    this.#allOffers = alloffers;
    this.#allDestinations = destinations;
  }

  init = (trip) => {
    this.#trip = trip;

    const prevTripComponent = this.#tripComponent;
    const prevFormComponent = this.#formComponent;

    this.#tripComponent = new TripView(trip);
    this.#formComponent = new TripFormView(trip, this.#allOffers, this.#allDestinations, false);

    this.#tripComponent.setToFormClickHandler(this.#replaceTripToForm);
    this.#tripComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#formComponent.setCloseFormClickHandler(this.#replaceFormToTrip);
    this.#formComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formComponent.setDeleteFormClickHandler(this.#handleDeleteClick);
    this.#formComponent.setAddDeleteOffers();

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
      this.#formComponent.reset(this.#trip);
      this.#replaceFormToTrip();
    }
  };

  #replaceFormToTrip = () => {
    this.#formComponent.reset(this.#trip);
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
    this.#changeData(UserAction.UPDATE_TRIP, UpdateType.PATCH, {...this.#trip, isFavorite: !this.#trip.isFavorite});
  };

  #handleFormSubmit = (update) => {
    // const isMinorUpdate = !isDatesEqual(this.#trip.dateFrom, update.dateFrom) || !isDatesEqual(this.#trip.dateTo, update.dateTo) || this.#trip.offers.length !== update.offers.length;
    // this.#changeData(UserAction.UPDATE_TRIP, isMinorUpdate ? UpdateType.MAJOR : UpdateType.PATCH, update);
    this.#changeData(UserAction.UPDATE_TRIP, UpdateType.MINOR, update);
    // this.#replaceFormToTrip();
  };

  #handleDeleteClick = (trip) => {
    this.#changeData(UserAction.DELETE_TRIP, UpdateType.MINOR, trip);
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#formComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#formComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };
}
