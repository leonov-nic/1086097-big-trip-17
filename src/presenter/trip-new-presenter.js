import { render, remove, RenderPosition } from '../framework/render';
import TripFormView from '../view/trip-form-view';
import { UserAction, UpdateType } from '../const';
import dayjs from 'dayjs';

const today = dayjs(new Date());

const newBlankTrip = {
  basePrice: '',
  dateFrom: `${today}`,
  dateTo: `${today}`,
  destination: {
    description: '',
    name: '',
    pictures: [
      {
        src: '',
        description: '',
      }
    ]
  },
  offers: [],
  type: '',
};

export default class NewTripPresenter {
  #listComponent = null;
  #changeData = null;
  #formComponent = null;
  #destroyCallback = null;
  #trip = newBlankTrip;
  #allOffersOfTrips = null;
  #allDestinations = null;

  constructor (listComponent, changeDate) {
    this.#listComponent = listComponent;
    this.#changeData = changeDate;
  }

  init = (callback, allOffers, destinations) => {
    this.#allDestinations = destinations;
    this.#destroyCallback = callback;
    this.#allOffersOfTrips = allOffers;
    this.#destroyCallback();

    if (this.#formComponent !== null) {
      return;
    }

    this.#formComponent = new TripFormView(this.#trip, this.#allOffersOfTrips, this.#allDestinations, true);
    this.#formComponent.setCloseFormClickHandler(this.destroy);
    this.#formComponent.setOnEscKeyDown(this.destroy);
    this.#formComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formComponent.setDeleteFormClickHandler(this.#handleDeleteClick);
    this.#formComponent.setAddDeleteOffersHandler();

    render(this.#formComponent, this.#listComponent, RenderPosition.AFTERBEGIN);
  };

  destroy = () => {
    if (this.#formComponent === null) {
      return;
    }

    this.#destroyCallback?.();
    remove(this.#formComponent);
    this.#formComponent = null;
  };

  setSaving = () => {
    this.#formComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#formComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formComponent.shake(resetFormState);
  };

  #handleFormSubmit = (trip) => {
    if(!trip.basePrice || !trip.type || !trip.destination.name) {return;}
    this.#changeData(UserAction.ADD_TRIP, UpdateType.MAJOR, trip);
    // this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
