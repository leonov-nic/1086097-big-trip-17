import { TripFilterView } from './view/trip-filter-view';
import TripInfoView from './view/trip-info-view';
import { ListPresenter } from './presenter/list-presenter';

import { RenderPosition } from './framework/render';
import { render } from './framework/render';

import TripsModel from './model/trips-model';
const tripsModel = new TripsModel;

const siteTripMainElement = document.querySelector('.trip-main');

const siteHeaderElement = document.querySelector('.page-header');
const siteFilterContainer = siteHeaderElement.querySelector('.trip-controls__filters');

const sitePageMainElement = document.querySelector('.page-main');
const siteTripsContainer = sitePageMainElement.querySelector('.trip-events');

render(new TripInfoView(tripsModel.trips), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new TripFilterView(tripsModel.trips), siteFilterContainer);

const tripPresenter = new ListPresenter(siteTripsContainer, tripsModel);
tripPresenter.init();
