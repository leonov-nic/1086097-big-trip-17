import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeTripDueFullDate } from '../utils/trip-form';
import { getOffersByType, getDestinationByName, isDateToNotCorrect } from '../utils/trip';
import { typesOfTrip } from '../const';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createTripFormTemplate = (trip, alloffers, alldestinations, newForm) => {
  const {type, basePrice, dateFrom, dateTo, offers, id, destination, isDisabled, isSaving, isDeleting} = trip;

  const allOffers = alloffers && alloffers.length ? alloffers : [];
  const offersByType = type && allOffers.length ? getOffersByType(allOffers, type) : [];

  const destinations = alldestinations !== 'undefined' ? alldestinations : [];

  const newDateFrom = humanizeTripDueFullDate(dateFrom);
  const newDateTo = humanizeTripDueFullDate(dateTo);

  const currentTripOffers = offers ? Object.values(offers) : [];


  const createDestinationsNameOfTrip = () => (
    destinations ? destinations.map((place) => (`<option value="${place.name}"></option>`)).join('\n') : []
  );

  const createTypesOfTrip = () => (
    typesOfTrip.map((itemType) => {
      const checked = itemType === type;
      return (`
        <div class="event__type-item">
          <input id="event-type-${itemType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${itemType}" ${checked ? 'checked' : ''}>
          <label class="event__type-label  event__type-label--${itemType}" for="event-type-${itemType}-${id}">${itemType}</label>
        </div>
      `);
    }).join('\n')
  );

  const createPicturesOfTrip = () => (
    destination.pictures ? destination.pictures.map((photo) => (`<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)).join(' ') : ''
  );

  const createOffersOfTrip = () => (
    offersByType ? offersByType.map((currentOffer) => {
      const checked = currentTripOffers.some((offer) => offer.id === currentOffer.id);

      return (`
        <div class="event__offer-selector" data-offer="${currentOffer.title}">
          <input  class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${currentOffer.id}" type="checkbox" name="event-offer-luggage" ${checked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
          <label class="event__offer-label" for="event-offer-luggage-${currentOffer.id}">
            <span class="event__offer-title">${currentOffer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${currentOffer.price}</span>
          </label>
        </div>`);
    }).join('') : []
  );

  return (`
    <li class="trip-events__item" id="form-point-${id}">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type ? type : '#'}.png" alt="${type ? `Event ${type} icon` : ''}">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"  ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTypesOfTrip()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>

            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination${id}" value="${destination ? destination.name : ''}" list="destination-list-1"  ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${createDestinationsNameOfTrip()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>

            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${newDateFrom}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${newDateTo}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'saving...' : 'save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${newForm ? 'Cancel' : `${isDeleting ? 'deleting...' : 'delete'}`} </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">${offersByType.length ? 'Offers' : ''}</h3>
            <div class="event__available-offers">
              ${createOffersOfTrip()}
            </div>
          </section>

          <section class="event__section  event__section--destination">

            <h3 class="event__section-title  event__section-title--destination">${destination ? destination.name : ''}</h3>
            <p class="event__destination-description">${destination ? destination.description : ''}</p>
            <div class="event__photos-container">

            <div class="event__photos-tape">
              ${createPicturesOfTrip()}
            </div>
          </div>
          </section>
        </section>
      </form>
    </li>
  `);
};

export class TripFormView extends AbstractStatefulView {
  #datepicker = null;
  #newForm = false;
  #allOffers = null;
  #allDestinations = null;

  constructor(trip, allOffers, destinations, newForm = false) {
    super();
    this.#allOffers = allOffers;
    this.#allDestinations = destinations;
    this.#newForm = newForm;
    this._state = TripFormView.parseTripToState(trip);

    this.#setInnerHandlers();

    this.#setDatepickerTo();
    this.#setDatepickerFrom();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  reset = (trip) => {
    this.updateElement(
      TripFormView.parseTripToState(trip),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseFormClickHandler(this._callback.click);

    this.setDeleteFormClickHandler(this._callback.deleteFormClick);

    this.#setDatepickerTo();
    this.#setDatepickerFrom();

    this.setAddDeleteOffers();
  };

  get template() {
    return createTripFormTemplate(this._state, this.#allOffers, this.#allDestinations, this.#newForm);
  }

  #placeChangeHandler = (evt) => {
    if (this.#allDestinations && this.#allDestinations.some((element) => element.name === evt.target.value)) {
      this.updateElement({
        destination: getDestinationByName(this.#allDestinations, evt.target.value)
      });
    } else {
      this.updateElement({
        destination: {...this._state.destination, description: '', name: '', pictures: []},
      });
    }

    this.updateElement({
      offers: [],
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'LABEL') { return; }
    this.updateElement({
      type: evt.target.textContent,
    });
    // repeating: {...this._state.repeating, [evt.target.value]: evt.target.checked},
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    if (isNaN(evt.target.value)) { return 0; }
    this._setState({
      basePrice: Math.trunc(evt.target.value),
    });
  };

  static parseTripToState = (trip) => (
    {...trip, isDisabled: false, isSaving: false, isDeleting: false,}
  );

  static parseStateToTrip = (state) => {
    const trip = {...state};

    delete trip.isDisabled;
    delete trip.isSaving;
    delete trip.isDeleting;

    return trip;
  };

  setCloseFormClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeFormClickHandler);
  };

  #closeFormClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(TripFormView.parseStateToTrip(this._state));
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#placeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);
  };

  #dateToChangeHandler = ([userDate]) => {
    if (isDateToNotCorrect(this._state.dateFrom, userDate)) {
      this.updateElement({
        dateTo: this._state.dateFrom,
      });
      return;
    }

    this.updateElement({
      dateTo: userDate,
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    if (isDateToNotCorrect(userDate, this._state.dateTo)) {
      this.updateElement({
        dateFrom: this._state.dateTo,
      });
      return;
    }

    this.updateElement({
      dateFrom: userDate,
    });
  };

  #setDatepickerFrom = () => {
    if (this._state.dateFrom) {
      this.#datepicker = flatpickr(this.element.querySelector('input[name="event-start-time"]'),
        {dateFormat: 'y/m/d H:i', defaultDate: this._state.dateFrom, onChange: this.#dateFromChangeHandler, enableTime: true,},
      );
    }
  };

  #setDatepickerTo = () => {
    if (this._state.dateTo) {
      this.#datepicker = flatpickr(this.element.querySelector('input[name="event-end-time"]'),
        {dateFormat: 'y/m/d H:i', defaultDate: this._state.dateTo, onChange: this.#dateToChangeHandler, enableTime: true,},
      );
    }
  };

  setDeleteFormClickHandler = (callback) => {
    this._callback.deleteFormClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteFormClick(TripFormView.parseStateToTrip(this._state));
  };

  setAddDeleteOffers = () => {
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#changeTheQuantityOffersOfTripHandler);
  };

  #changeTheQuantityOffersOfTripHandler = (evt) => {
    const nameOfTheSelectedOffer = evt.target.closest('.event__offer-selector').dataset.offer;
    const offersByType = getOffersByType(this.#allOffers, this._state.type);

    const foundOffer = offersByType.filter((item) => item.title === nameOfTheSelectedOffer);

    if (!this._state.offers.some((offer) => offer.title === nameOfTheSelectedOffer)) {
      this.updateElement({
        offers: [...this._state.offers, ...foundOffer],
      });
    } else {
      this.updateElement({
        offers: [...this._state.offers.filter((offer) => offer.title !== nameOfTheSelectedOffer)],
      });
    }
  };
}
