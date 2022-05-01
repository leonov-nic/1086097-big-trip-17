import { TripFilterView } from './view/trip-filter-view';
import TripInfoView from './view/trip-info-view';
import { TripPresenter } from './presenter/trip-presenter';

import { RenderPosition } from './render';
import { render } from './render';

import TripsModel from './model/trips-model';
const tripsModel = new TripsModel;

console.log(tripsModel);

const siteTripMainElement = document.querySelector('.trip-main');

const siteHeaderElement = document.querySelector('.page-header');
const siteFilterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const sitePageMainElement = document.querySelector('.page-main');
const siteEventsContainer = sitePageMainElement.querySelector('.trip-events');

render(new TripFilterView, siteFilterContainer);
render(new TripInfoView(tripsModel), siteTripMainElement, RenderPosition.AFTERBEGIN);

const tripPresenter = new TripPresenter();
tripPresenter.init(siteEventsContainer, tripsModel);
