import { render } from '../framework/render.js';
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

    const replaceFormToTrip = () => {
      this.#tripListComponent.element.replaceChild(tripComponent.element, tripFormComponent.element);
      tripFormComponent.element.classList.remove('active');
    };

    function onEscKeyDown (evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToTrip();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    }

    const replaceTripToForm = () => {

      document.addEventListener('keydown', onEscKeyDown);





      // for(let i = 0; i < this.#tripListComponent.element.children.length; i++) {
      //   if (this.#tripListComponent.element.children[i].classList.contains('active')) {
      //     this.#tripListComponent.element.children[i].remove();
      //   }
      // }





      this.#tripListComponent.element.replaceChild(tripFormComponent.element, tripComponent.element);
      tripFormComponent.element.classList.add('active');
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
