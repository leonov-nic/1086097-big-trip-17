import { ListPresenter } from './presenter/list-presenter';
import TripsModel from './model/trips-model';
import FilterModel from './model/filter-model.js';

const tripMainElement = document.querySelector('.trip-main');
const siteHeaderElement = document.querySelector('.page-header');
const siteFilterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const sitePageMainElement = document.querySelector('.page-main');
const siteTripsContainer = sitePageMainElement.querySelector('.trip-events');

const listPresenter = new ListPresenter(siteTripsContainer, siteFilterContainer, tripMainElement, new TripsModel, new FilterModel);
listPresenter.init();
