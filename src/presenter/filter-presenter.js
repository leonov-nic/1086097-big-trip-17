import { render, replace, remove, RenderPosition } from '../framework/render';
import { UpdateType } from '../const';
import TripFilterView from '../view/trip-filter-view';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filterComponent = null;
  #filterLockValues = null;

  constructor(filterContainer, filterModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = (filterLockValues) => {
    const prevFilterComponent = this.#filterComponent;
    this.#filterLockValues = filterLockValues;
    this.#filterComponent = new TripFilterView(this.#filterModel.filter, this.#filterLockValues);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init(this.#filterLockValues);
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
