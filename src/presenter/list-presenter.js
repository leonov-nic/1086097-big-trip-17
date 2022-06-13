import { render, RenderPosition, remove } from '../framework/render';
import { tripSortView } from '../view/trip-sort-view';
import { TripListView } from '../view/trip-list-view';
import NoTripsView from '../view/no-trips-view';
import TripPresenter from './trip-presenter';

import { SortType, UpdateType, UserAction, FilterType } from '../const';
import { sortTripByPrice, sortTripByTime, sortTripByDate } from '../utils/trip';

import TripInfoView from '../view/trip-info-view';
import FilterPresenter from '../presenter/filter-presenter';
import {filter} from '../utils/filter';

import NewTripPresenter from './trip-new-presenter';
import NewEventButtonView from '../view/new-event-button-view';
import TripLoadingView from '../view/trip-loading-view';

export class ListPresenter {
  #newEventButtonViewComponent = null;
  #sortComponent = null;
  #infoComponent = null;
  #loadingComponent = new TripLoadingView();
  #isLoading = true;

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

  #tripNewPresenter = null;

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
    this.#tripNewPresenter = new NewTripPresenter(this.#tripListComponent.element, this.#handleViewAction);
    const filterPresenter = new FilterPresenter(this.#filterContainer, this.#filterModel);
    filterPresenter.init();

    this.#tripsModel.init()
      .finally(() => {
        this.#renderButtonNewTrip();
      });
    this.#renderListOfTrips();
  };

  get allOffers() {
    const offers = this.#tripsModel.alloffers;
    return offers;
  }

  get destinations() {
    const destinations = this.#tripsModel.destinations;
    return destinations;
  }

  get trips() {
    this.#filterType = this.#filterModel.filter;
    const trips = this.#tripsModel.trips;

    const filteredTrips = filter[this.#filterType](trips);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredTrips.sort(sortTripByTime);
      case SortType.PRICE:
        return filteredTrips.sort(sortTripByPrice);
      case SortType.DEFAULT:
        return filteredTrips.sort(sortTripByDate);
    }
    return filteredTrips;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#tripPresenter.get(update.id).setSaving();
        this.#tripsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this.#tripNewPresenter.setSaving();
        this.#tripsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this.#tripPresenter.get(update.id).setDeleting();
        this.#tripsModel.deleteTrip(updateType, update);
        break;
    }
    // обновление модели.
  };

  #handleModelEvent = (updateType, updatedTrip) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPresenter.get(updatedTrip.id).init(updatedTrip);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderListOfTrips();
        break;
      case UpdateType.MAJOR:
        this.#clearList({resetSortType: true});
        this.#renderListOfTrips();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearList();
        this.#renderListOfTrips();
        break;
    }
  };

  #renderButtonNewTrip = () => {
    this.#newEventButtonViewComponent = new NewEventButtonView();
    this.#newEventButtonViewComponent.setClickHandler(this.#handleNewTripButtonClick);
    render(this.#newEventButtonViewComponent, this.#mainContainer);
  };

  createNewTrip = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#tripNewPresenter.init(callback, this.allOffers, this.destinations);
  };

  #handleNewTripFormClose = () => {
    this.#newEventButtonViewComponent.element.disabled = false;
  };

  #handleNewTripButtonClick = () => {
    this.createNewTrip(this.#handleNewTripFormClose);
    this.#newEventButtonViewComponent.element.disabled = true;
  };

  #renderListOfTrips = () => {
    this.#renderList();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const trips = this.trips;
    const tripsCount = trips.length;

    if (tripsCount === 0) {
      this.#renderNoTrips();
      return;
    }

    this.#renderInfo();
    this.#renderSort();
    this.#renderTrips(this.trips);
  };

  #renderSort = () => {
    this.#sortComponent = new tripSortView(this.#currentSortType);
    this.#sortComponent.setSortTypeClickHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderInfo = () => {
    this.#infoComponent = new TripInfoView(this.#tripsModel.trips);
    render(this.#infoComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#tripListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (type) => {
    if (this.#currentSortType === type) {return;}
    this.#currentSortType = type;
    this.#handleModelEvent(UpdateType.MINOR);

    if (this.#currentSortType === SortType.DEFAULT) {
      this.#handleModelEvent(UpdateType.MAJOR);
    }
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
    const tripPresenter = new TripPresenter(this.#tripListComponent.element, this.#handleViewAction, this.#handleModeChange, this.allOffers, this.destinations);
    tripPresenter.init(trip, );
    this.#tripPresenter.set(trip.id, tripPresenter);
  };

  #clearList = ({resetSortType = false} = {}) => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
    this.#tripNewPresenter.destroy();

    remove(this.#sortComponent);
    remove(this.#noTripsComponent);
    remove(this.#infoComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #handleModeChange = () => {
    this.#tripPresenter.forEach((presenter) => presenter.resetView());
    this.#tripNewPresenter.destroy();
  };
}
