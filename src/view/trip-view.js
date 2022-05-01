import { createElement } from '../render';
import { humanizeTripDueDate, getDurationTime, humanizeTripDueDateTwo } from '../utils';


const createTripTemplate = (trip) => {
  const {type, basePrice, destination, dateFrom, dateTo, isFavorite, offers} = trip;

  const newDateTo = dateTo !== null ? humanizeTripDueDate(dateTo) : '';
  const dateStart = humanizeTripDueDateTwo(dateFrom);
  const newDateFrom = dateFrom !== null ? humanizeTripDueDate(dateFrom) : '';
  const durationTime = getDurationTime(dateTo, dateFrom);
  const hour = Math.round(durationTime / 60);
  const minute = (getDurationTime(dateTo, dateFrom)) - 60 * hour;
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  const getOffersOfTrip = (offerstrip, typeoftrip) => {
    const offersOfTrip =  offerstrip.find((item) => item.type === typeoftrip);
    return offersOfTrip;
  };

  const createAdditionalServices = () => (
    getOffersOfTrip(offers, type) !== undefined ? `${Object.values(getOffersOfTrip(offers, type).offers).map((offer) =>
      `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
      `
    ).join('\n')}` : ''
  );

  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${ dateStart }</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${ type } ${ destination.name }</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${ newDateFrom }</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${ newDateTo }</time>
          </p>
          <p class="event__duration">${hour && hour > 0 ? `${hour}H`: '' } ${ minute }M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${ basePrice }</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createAdditionalServices(offers, type)}
        </ul>
        <button class="event__favorite-btn ${ favoriteClassName }" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `);
};

export class TripView {
  constructor(trip) {
    this.trip = trip;
  }

  getTemplate() {
    return createTripTemplate(this.trip);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
