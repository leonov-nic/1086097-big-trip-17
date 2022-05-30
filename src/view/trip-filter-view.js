import AbstractView from '../framework/view/abstract-view';
import { filters } from '../utils/filter';

const createTripFilterTemplate = () => {

  const genetateFilters = () => (
    filters ? `${Object.keys(filters).map((filterName) =>
      `
      <div class="trip-filters__filter">
        <input id="filter-${filterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterName}" ${filterName && filterName === 'Everything' ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${filterName}" data-filter="${filterName}">${filterName}</label>
      </div>
      `
    ).join('')}` : ''
  );

  return (`
    <form class="trip-filters" action="#" method="get">
      ${genetateFilters()}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
};

export class TripFilterView extends AbstractView {
  #trips = null;

  constructor(trips) {
    super();
    this.#trips = trips;
  }

  get template() {
    return createTripFilterTemplate(this.#trips);
  }

  setFilterTypeClickHandler = (callback) => {
    this._callback.selectFilterType = callback;
    this.element.addEventListener('click', this.#filterTypeClickHandler);
  };

  #filterTypeClickHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') { return; }
    evt.preventDefault();
    this._callback.selectFilterType(evt.target.dataset.filter);
  };
}
