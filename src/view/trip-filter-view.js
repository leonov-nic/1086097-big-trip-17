import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const createTripFilterTemplate = (currentFilterType) => {

  const genetateFilters = () => (
    FilterType ? `${Object.values(FilterType).map((filterName) =>
      `<div class="trip-filters__filter">
        <input id="filter-${filterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter-${filterName}" value="${filterName}" ${currentFilterType === filterName ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${filterName}" data-filter="${filterName}">${filterName}</label>
      </div>`).join('')}` : ''
  );

  return (`
    <form class="trip-filters" action="#" method="get">
      ${genetateFilters()}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
};

export class TripFilterView extends AbstractView {
  #currentFilterType = null;
  #filterLock = null;

  constructor(currentFilterType) {
    super();
    this.#currentFilterType = currentFilterType;
  }

  setFilterLockValues = (filter) => {
    this.#filterLock = filter;
  };

  get filterBoolen() {
    return this.#filterLock;
  }

  get template() {
    return createTripFilterTemplate(this.#currentFilterType, this.#filterLock);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') { return; }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filter);
  };
}
