import { render, replace } from '../framework/render';
import { tripSortView } from '../view/trip-sort-view';
import { TripListView } from '../view/trip-list-view';
import { TripFormView } from '../view/trip-form-view';
import { TripView } from '../view/trip-view';
import NoTripsView from '../view/no-trips-view';
import { isEscKeyDown } from '../utils/common';

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
      replace(tripComponent, tripFormComponent);
      // tripFormComponent.element.classList.remove('active');
      // console.log(tripFormComponent.element);
    };

    const onEscKeyDown = (evt) => {
      isEscKeyDown(evt, replaceFormToTrip);
      document.removeEventListener('keydown', onEscKeyDown);
    };

    const replaceTripToForm = () => {
      // console.log(tripFormComponent.element);
      // for(let i = 0; i < this.#tripListComponent.element.children.length; i++) {
      //   if (this.#tripListComponent.element.children[i].classList.contains('active')) {
      //     this.#tripListComponent.element.children[i].remove();
      //   }
      // }
      replace(tripFormComponent, tripComponent);
      // tripFormComponent.element.classList.add('active');
    };

    tripComponent.setToFormClickHandler(() => {
      replaceTripToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    tripFormComponent.setCloseFormClickHandler(() => {
      replaceFormToTrip();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    tripFormComponent.setFormSubmitHandler(() => {
      replaceFormToTrip();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(tripComponent, this.#tripListComponent.element);
  };
}
