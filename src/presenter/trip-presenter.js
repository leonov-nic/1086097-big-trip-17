import {render} from '../render';
import { tripSortView } from '../view/trip-sort-view';
import { TripListView } from '../view/trip-list-view';
import { TripFormView } from '../view/trip-form-view';
import { TripView } from '../view/trip-view';
import NoTripsView from '../view/no-trips-view';

export class TripPresenter {
  #tripListComponent = new TripListView();
  #noTripsComponent = new NoTripsView();
  #tripContainer = null;
  #tripsModel = null;
  #trips = null;

  constructor (tripContainer, tripsModel) {
    this.#tripContainer = tripContainer;
    this.#tripsModel = tripsModel;
  }

  init = () => {
    this.#trips = [...this.#tripsModel.trips];
    this.#renderList();
  };

  #renderList = () => {
    if (this.#trips.every((trip) => trip.isThere)) {
      render(this.#tripListComponent, this.#tripContainer);
      render(this.#noTripsComponent, this.#tripListComponent.element);
      return;
    }

    render(new tripSortView, this.#tripContainer);
    render(this.#tripListComponent, this.#tripContainer);

    for (let i = 0; i < this.#trips.length; i++) {
      this.#renderTrip(this.#trips[i]);
    }
  };

  #renderTrip = (trip) => {
    const tripComponent = new TripView(trip);
    const tripFormComponent = new TripFormView(trip);

    render(tripComponent, this.#tripListComponent.element);

    const replaceFormToTrip = () => {
      this.#tripListComponent.element.replaceChild(tripComponent.element, tripFormComponent.element);
    };

    function onEscKeyDown (evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToTrip();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    }

    const replaceTripToForm = () => {
      this.#tripListComponent.element.replaceChild(tripFormComponent.element, tripComponent.element);
      document.addEventListener('keydown', onEscKeyDown);
    };

    tripComponent.element.querySelector('.event__rollup-btn').addEventListener('click', replaceTripToForm);

    tripFormComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToTrip();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    tripFormComponent.element.querySelector('.event__rollup-btn').addEventListener('click', replaceFormToTrip);
  };
}
