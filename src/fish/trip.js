import {getRandomInteger, getRandomArray} from '../utils.js';

const generateTypeOfTrip = () => {
  const typeOfTrip = [
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

  const randomIndex = getRandomInteger(0, typeOfTrip.length - 1);
  return typeOfTrip[randomIndex];
};

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

const generateDestinationOfTrip = () => {
  const descriptionOfTrip = [
    {
      description: generateDescriptionForDestination(),
      name: 'Chamonix',
      pictures: [
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

  const randomIndex = getRandomInteger(0, descriptionOfTrip.length - 1);
  return descriptionOfTrip[randomIndex];
};


const getOffersOfType = () => {
  const offersOfTrip = [
    {
      type: 'taxi',
      offers: [
        {
          id: 1,
          title: 'Order Uber',
          price: 20
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
          title: 'Add meal',
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
        }
      ]
    }
  ];

  return offersOfTrip;
};

export const generateTrip = () => ({
  basePrice: getRandomInteger(500, 1500),
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: generateDestinationOfTrip(),
  id: '0',
  isFavorite: getRandomInteger(0, 1),
  offers: getOffersOfType(),
  type: generateTypeOfTrip(),
});
