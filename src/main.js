import { ListPresenter } from './presenter/list-presenter';
import TripsModel from './model/trips-model';

const tripMainElement = document.querySelector('.trip-main');
const siteHeaderElement = document.querySelector('.page-header');
const siteFilterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const sitePageMainElement = document.querySelector('.page-main');
const siteTripsContainer = sitePageMainElement.querySelector('.trip-events');

const tripPresenter = new ListPresenter(siteTripsContainer, siteFilterContainer, tripMainElement, new TripsModel);
tripPresenter.init();
