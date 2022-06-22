import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const createTripFilterTemplate = (currentFilterType, filterLockValues) => {
  const genetateFilters = () => {
    const filterNames = Object.values(FilterType);
    const futureLock = filterLockValues ? Object.entries(filterLockValues)[0] : {};
    const pastLock =  filterLockValues ? Object.entries(filterLockValues)[1] : {};

    return (FilterType ? `${filterNames.map((filterName) =>
      `<div class="trip-filters__filter">
        <input id="filter-${filterName}" class="trip-filters__filter-input visually-hidden" type="radio" ${futureLock[0] === filterName && futureLock[1] === false || pastLock[0] === filterName && pastLock[1] === false ? 'disabled' : ''} name="trip-filter-${filterName}" value="${filterName}" ${currentFilterType === filterName ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${filterName}" ${futureLock[0] === filterName && futureLock[1] === false || pastLock[0] === filterName && pastLock[1] === false ? 'data-disabled="disabled"' : ''}  data-filter="${filterName}">${filterName}</label>
      </div>`).join('')}` : '');
  };

  return (`
    <form class="trip-filters" action="#" method="get">
      ${genetateFilters()}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
};

export default class TripFilterView extends AbstractView {
  #currentFilterType = null;
  #filterLock = null;
  #filterLockValues = {};

  constructor(currentFilterType, filterLockValues) {
    super();
    this.#filterLockValues = filterLockValues;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createTripFilterTemplate(this.#currentFilterType, this.#filterLockValues);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.getAttribute('data-disabled') === 'disabled') { return; }
    if (evt.target.tagName !== 'LABEL') { return; }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filter);
  };
}
