import { render } from '../framework/render';
import { tripSortView } from '../view/trip-sort-view';
import { TripListView } from '../view/trip-list-view';
import NoTripsView from '../view/no-trips-view';
import TripPresenter from './trip-presenter';

export class ListPresenter {
  #sortComponent= new tripSortView();
  #noTripsComponent = new NoTripsView();
  #tripListComponent = new TripListView();
  #tripContainer = null;
  #tripsModel = null;
  #trips = null;

  constructor (tripContainer, tripsModel) {
    this.#tripContainer = tripContainer;
    this.#tripsModel = tripsModel;
  }

  init = () => {
    this.#trips = [...this.#tripsModel.trips];
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
    render(this.#sortComponent, this.#tripContainer);
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
    const tripPresenter = new TripPresenter(trip, this.#tripListComponent.element);
    tripPresenter.init();
  };
}
