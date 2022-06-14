import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const createTripFilterTemplate = (filter, currentFilterType) => {
  const {name} = filter;

  const genetateFilters = () => (
    FilterType ? `${Object.values(FilterType).map((filterName) =>
      `<div class="trip-filters__filter">
        <input id="filter-${filterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter-${name}" value="${filterName}" ${currentFilterType === filterName ? 'checked' : ''}>
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
  #filters = null;

  constructor(filters, currentFilterType) {
    super();
    this.#currentFilterType = currentFilterType;
    this.#filters = filters;
  }

  get template() {
    return createTripFilterTemplate(this.#filters, this.#currentFilterType);
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
