import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeTripDueFullDate } from '../utils/trip-form';
import { generateAllOffersOfTrip, getDestinationByName } from '../utils/trip';
import { offersOfTrip, typesOfTrip } from '../const';
import {descriptionOfTrip} from '../const';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const newBlankTrip = {
  basePrice: '',
  dateFrom: 'null',
  dateTo: 'null',
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
  offers: {
    type: '',
    offers: [],
  },
  type: '',
};

const createTripFormTemplate = (trip) => {
  const {type, basePrice, dateFrom, dateTo, offers, id, destination} = trip;

  const currentOffers = generateAllOffersOfTrip(offersOfTrip, type);

  const newDateFrom = humanizeTripDueFullDate(dateFrom);
  const newDateTo = humanizeTripDueFullDate(dateTo);

  const currentTripOffers = Object.values(offers.offers);


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
    getDestinationByName(descriptionOfTrip, destination.name).pictures.map((item) => (`<img class="event__photo" src="${item.src}" alt="${item.description}">`)).join(' ')
  );

  const createOffersOfTrip = () => (
    currentOffers.offers.map((offer) => {
      const checked = currentTripOffers.some((item) => item.id === offer.id);

      return (`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id}" type="checkbox" name="event-offer-luggage" ${checked ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`);
    }).join('')
  );

  return (`
    <li class="trip-events__item" id="form-point-${id}">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination${id}" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${newDateFrom} ">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${newDateTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${createOffersOfTrip()}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">${destination.name}</h3>
            <p class="event__destination-description">${destination.description}</p>
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

  constructor(trip = newBlankTrip) {
    super();

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

    this.#setDatepickerTo();
    this.#setDatepickerFrom();
  };

  get template() {
    return createTripFormTemplate(this._state);
  }

  #placeChangeHandler = (evt) => {
    if (descriptionOfTrip.some((element) => element.name === evt.target.value)) {
      this.updateElement({
        destination: getDestinationByName(descriptionOfTrip, evt.target.value)
      });
    }
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      type: evt.target.textContent,
    });
    // repeating: {...this._state.repeating, [evt.target.value]: evt.target.checked},
    this.updateElement({
      offers: {...this._state.offers, offers: []},
    });
  };

  static parseTripToState = (trip) => ({...trip,
    // noCheckedOffer: false,
  });

  static parseStateToTask = (state) => {
    const trip = {...state};

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
    this._callback.formSubmit(TripFormView.parseStateToTask(this._state));
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#placeChangeHandler);
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
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
}
