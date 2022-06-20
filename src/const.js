const HTTPMethod = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST',
};

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
};

const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PAST: 'Past',
};

const SortType = {
  DEFAULT: 'default',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_TRIP: 'UPDATE_TRIP',
  ADD_TRIP: 'ADD_TRIP',
  DELETE_TRIP: 'DELETE_TRIP',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const NoTripsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const typesOfTrip = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  typesOfTrip,
  Mode,
  SortType,
  UpdateType,
  UserAction,
  FilterType,
  NoTripsTextType,
  HTTPMethod,
  TimeLimit, };
