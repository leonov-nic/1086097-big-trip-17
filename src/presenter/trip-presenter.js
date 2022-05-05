import {render} from '../render';
import { tripSortView } from '../view/trip-sort-view';
import { TripListView } from '../view/trip-list-view';
import { TripFormView } from '../view/trip-form-view';
import { TripView } from '../view/trip-view';

export class TripPresenter {
  #tripListComponent = new TripListView();
  #tripContainer = null;
  #tripsModel = null;
  #trips = null;

  init = (tripContainer, tripsModel) => {
    this.#tripContainer = tripContainer;
    this.#tripsModel = tripsModel;
    this.#trips = [...this.#tripsModel.trips];

    render(new tripSortView, this.#tripContainer);
    render(this.#tripListComponent, this.#tripContainer);

    for (let i = 0; i < this.#trips.length; i++) {
      this.#renderTrip(this.#trips[i]);
    }
  };

  #renderTrip = (trip) => {
    const tripComponent = new TripView(trip);
    const tripFormComponent = new TripFormView(trip);

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

    render(tripComponent, this.#tripListComponent.element);
  };
}
