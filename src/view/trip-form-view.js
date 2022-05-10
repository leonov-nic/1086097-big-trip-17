import AbstractView from '../framework/view/abstract-view';
import { humanizeTripDueFullDate } from '../utils/trip-form';
import { offersOfTrip } from '../const';
import { typesOfTrip } from '../const';

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
  isFavorite: false,
  offers: {
    type: '',
    offers: [],
  },
  type: '',
};

const createTripFormTemplate = (trip) => {
  const {type, basePrice, destination, dateFrom, dateTo, offers, id} = trip;

  const generateAllOffersOfTrip = ((typesoftrip, offerstrip) => typesoftrip.find((item) => item.type === offerstrip.type));
  const allCurrentOfTypeOffers = generateAllOffersOfTrip(offersOfTrip, trip);

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

  const createOffersOfTrip = () => (
    allCurrentOfTypeOffers.offers.map((offer) => {
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
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${newDateFrom}">
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
          </section>
        </section>
      </form>
    </li>
  `);
};

export class TripFormView extends AbstractView {
  #trip = null;

  constructor(trip = newBlankTrip) {
    super();
    this.#trip = trip;
  }

  get template() {
    return createTripFormTemplate(this.#trip);
  }

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
    this._callback.formSubmit();
  };
}
