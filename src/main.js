import { ListPresenter } from './presenter/list-presenter';
import TripsModel from './model/trips-model';
import FilterModel from './model/filter-model.js';

const tripMainElement = document.querySelector('.trip-main');
const siteHeaderElement = document.querySelector('.page-header');
const siteFilterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const sitePageMainElement = document.querySelector('.page-main');
const siteTripsContainer = sitePageMainElement.querySelector('.trip-events');

import TripssApiService from './trips-api-service.js';
const AUTHORIZATION = 'Basic kTy9gIdsz2317rD';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const tripsModel = new TripsModel(new TripssApiService(END_POINT, AUTHORIZATION));
const listPresenter = new ListPresenter(siteTripsContainer, siteFilterContainer, tripMainElement, tripsModel, new FilterModel);
listPresenter.init();
// tripsModel.init();

// tripsModel.init()
//   .finally(() => {
//      this.#renderButtonNewTrip();
//   });
