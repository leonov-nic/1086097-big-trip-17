import { render } from '../framework/render';
import { tripSortView } from '../view/trip-sort-view';
import { TripListView } from '../view/trip-list-view';
import NoTripsView from '../view/no-trips-view';
import TripPresenter from './trip-presenter';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';

import { sortTripByPrice, sortTripByTime } from '../utils/trip';

export class ListPresenter {
  #sortComponent = new tripSortView();
  #noTripsComponent = new NoTripsView();
  #tripListComponent = new TripListView();
  #tripContainer = null;
  #tripsModel = null;
  #trips = null;
  #currentSortType = SortType.DEFAULT;
  #sortedTrips = [];
  #tripPresenter = new Map();

  constructor (tripContainer, tripsModel) {
    this.#tripContainer = tripContainer;
    this.#tripsModel = tripsModel;
  }

  init = () => {
    this.#trips = [...this.#tripsModel.trips];
    this.#sortedTrips = [...this.#tripsModel.trips];
    this.#renderListOfTrips();
  };

  #renderListOfTrips = () => {
    if (this.#trips.every((trip) => trip.isThere)) {
      this.#renderNoTrips();
      return;
    }
    this.#renderSort();
    this.#renderList();
    this.#renderTrips();
  };

  #renderSort = () => {
    this.#sortComponent.setSortTypeClickHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripContainer);
  };

  #sortTrip = (type) => {
    switch (type) {
      case SortType.TIME:
        this.#sortedTrips.sort(sortTripByTime);
        break;
      case SortType.PRICE:
        this.#sortedTrips.sort(sortTripByPrice);
        break;
      default:
        this.#sortedTrips = [...this.#trips];
    }
    this.#currentSortType = type;
  };

  #handleSortTypeChange = (type) => {
    if (this.#currentSortType === type) { return;}
    this.#sortTrip(type);
    this.#clearList();
    this.#renderListOfTrips();
  };

  #renderNoTrips = () => {
    this.#renderList();
    render(this.#noTripsComponent, this.#tripListComponent.element);
  };

  #renderList = () => {
    render(this.#tripListComponent, this.#tripContainer);
  };

  #renderTrips = () => {
    for (let i = 0; i < this.#trips.length; i++) {
      this.#renderTrip(this.#trips[i]);
    }
  };

  #renderTrip = (trip) => {
    const tripPresenter = new TripPresenter(this.#tripListComponent.element, this.#handleTripChange, this.#handleModeChange);
    tripPresenter.init(trip);
    this.#tripPresenter.set(trip.id, tripPresenter);
  };

  #clearList = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
  };

  #handleTripChange = (updatedTrip) => {
    this.#trips = updateItem(this.#trips, updatedTrip);
    this.#tripPresenter.get(updatedTrip.id).init(updatedTrip);
  };

  #handleModeChange = () => {
    this.#tripPresenter.forEach((presenter) => presenter.resetView());
  };
}
