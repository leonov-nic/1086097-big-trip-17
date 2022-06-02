import { render, RenderPosition, remove } from '../framework/render';
import { tripSortView } from '../view/trip-sort-view';
import { TripListView } from '../view/trip-list-view';
import NoTripsView from '../view/no-trips-view';
import TripPresenter from './trip-presenter';

import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortTripByPrice, sortTripByTime } from '../utils/trip';

import TripInfoView from '../view/trip-info-view';
import FilterPresenter from '../presenter/filter-presenter';
import {filter} from '../utils/filter';

export class ListPresenter {
  #sortComponent = null;
  #infoComponent = null;

  #tripListComponent = new TripListView();
  #tripContainer = null;
  #filterContainer = null;
  #mainContainer = null;
  #tripsModel = null;
  #filterModel = null;

  #noTripsComponent = null;

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  #tripPresenter = new Map();

  constructor (tripContainer, filterContainer, mainContainer, tripsModel, filterModel) {
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;

    this.#tripContainer = tripContainer;
    this.#filterContainer = filterContainer;
    this.#mainContainer = mainContainer;

    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const filterPresenter = new FilterPresenter(this.#filterContainer, this.#filterModel);
    filterPresenter.init();
    this.#renderListOfTrips();
  };

  get trips() {
    this.#filterType = this.#filterModel.filter;
    const trips = this.#tripsModel.trips;
    const filteredTrips = filter[this.#filterType](trips);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredTrips.sort(sortTripByTime);
      case SortType.PRICE:
        return filteredTrips.sort(sortTripByPrice);
    }
    return filteredTrips;
  }

  #renderListOfTrips = () => {
    const trips = this.trips;
    const tripsCount = trips.length;

    if (tripsCount === 0) {
      this.#renderNoTrips();
      return;
    }

    this.#infoComponent = new TripInfoView(this.#tripsModel.trips);
    render(this.#infoComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);

    this.#renderSort();
    this.#renderList();
    this.#renderTrips(this.trips);
  };

  #renderSort = () => {
    this.#sortComponent = new tripSortView(this.#currentSortType);
    this.#sortComponent.setSortTypeClickHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripContainer);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#tripsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this.#tripsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this.#tripsModel.deleteTrip(updateType, update);
        break;
    }
    // Здесь будем вызывать обновление модели.
  };

  #handleModelEvent = (updateType, updatedTrip) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#tripPresenter.get(updatedTrip.id).init(updatedTrip);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderListOfTrips();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this.#clearList({resetSortType: true});
        this.#renderListOfTrips();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #handleSortTypeChange = (type) => {
    if (this.#currentSortType === type) {return;}
    this.#currentSortType = type;
    this.#handleModelEvent(UpdateType.MINOR);
  };

  #renderNoTrips = () => {
    this.#noTripsComponent = new NoTripsView(this.#filterType);
    this.#renderList();
    render(this.#noTripsComponent, this.#tripListComponent.element);
  };

  #renderList = () => {
    render(this.#tripListComponent, this.#tripContainer);
  };

  #renderTrips = (trips) => {
    for (let i = 0; i < trips.length; i++) {
      this.#renderTrip(trips[i]);
    }
  };

  #renderTrip = (trip) => {
    const tripPresenter = new TripPresenter(this.#tripListComponent.element, this.#handleViewAction, this.#handleModeChange);

    tripPresenter.init(trip);
    this.#tripPresenter.set(trip.id, tripPresenter);
  };

  #clearList = ({resetSortType = false} = {}) => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noTripsComponent);
    remove(this.#infoComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  // #handleTripChange = (updatedTrip) => {
  //   // this.#trips = updateItem(this.#trips, updatedTrip);
  //   this.#tripPresenter.get(updatedTrip.id).init(updatedTrip);
  // };

  #handleModeChange = () => {
    this.#tripPresenter.forEach((presenter) => presenter.resetView());
  };
}
