import {getRandomInteger, getRandomArray} from './utils/common';

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
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
};

const offersOfTrip = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: 20
      },
      {
        id: 2,
        title: 'Book tickets',
        price: 50
      },
      {
        id: 3,
        title: 'Lunch in city',
        price: 70
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Order',
        price: 100
      },
      {
        id: 2,
        title: 'Book new tickets',
        price: 30
      },
      {
        id: 3,
        title: 'Lunch in city',
        price: 70
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 50
      },
      {
        id: 2,
        title: 'Switch to comfort',
        price: 80
      },
      {
        id: 3,
        title: 'Choose seats',
        price: 20
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Add meal',
        price: 15
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Book tickets',
        price: 555
      },
      {
        id: 2,
        title: 'Choose eat',
        price: 50
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Add breakfast',
        price: 50
      },
      {
        id: 2,
        title: 'Lunch in city',
        price: 70
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Book tickets',
        price: 40
      },
      {
        id: 2,
        title: 'Lunch in city',
        price: 30
      },
      {
        id: 3,
        title: 'Add meal',
        price: 15
      },
      {
        id: 4,
        title: 'Add breakfast',
        price: 50
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Rent a car',
        price: 200
      },
      {
        id: 2,
        title: 'Order Uber',
        price: 20
      }
    ]
  }
];

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

export { offersOfTrip, typesOfTrip, Mode, SortType, descriptionOfTrip, UpdateType, UserAction };
