import {getRandomInteger, getRandomArray} from './utils/common';

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
  [FilterType.EVERYTHING]: 'Click «ADD NEW POINT» in menu to create your first trip',
  [FilterType.FUTURE]: 'There are no overdue trips now',
  [FilterType.PAST]: 'There are no trips today',
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

const generateDescriptionForDestination = () => {
  const descriptionForDestination = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'
  ];

  return getRandomArray(descriptionForDestination);
};

const generatePicturesForDestination = () => {
  const randomNumber = getRandomInteger(10, 600);
  return `http://picsum.photos/248/152?r=${randomNumber}`;
};

const descriptionOfTrip = [
  {
    description: generateDescriptionForDestination(),
    name: 'Chamonix',
    pictures: [
      {
        src: generatePicturesForDestination(),
        description: 'Chamonix parliament building',
      },
      {
        src: generatePicturesForDestination(),
        description: 'Chamonix parliament building',
      },
      {
        src: generatePicturesForDestination(),
        description: 'Chamonix parliament building',
      },
      {
        src: generatePicturesForDestination(),
        description: 'Chamonix parliament building',
      },
    ],
  },
  {
    description: generateDescriptionForDestination(),
    name: 'Geneva',
    pictures: [
      {
        src: generatePicturesForDestination(),
        description: 'Geneva',
      },
      {
        src: generatePicturesForDestination(),
        description: 'Geneva',
      },
    ],
  },
  {
    description: generateDescriptionForDestination(),
    name: 'Amsterdam',
    pictures: [
      {
        src: generatePicturesForDestination(),
        description: 'Amsterdam',
      },
    ],
  },
];

export { typesOfTrip, Mode, SortType, descriptionOfTrip, UpdateType, UserAction, FilterType, NoTripsTextType };
