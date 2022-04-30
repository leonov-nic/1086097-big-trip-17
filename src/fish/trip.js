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


const generateOffersOfType = () => {
  const offersOfTrip = [
    {
      type: 'taxi',
      offers: [
        {
          id: 1,
          title: 'Upgrade to a business class',
          price: 120
        },
        {
          id: 2,
          title: 'Choose the radio station',
          price: 60
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
    }
  ];

  const randomIndex = getRandomInteger(0, offersOfTrip.length - 1);
  return offersOfTrip[randomIndex];
};

export const generateTrip = () => ({
  basePrice: getRandomInteger(500, 1500),
  dateFrom: null,
  dateTo: null,
  destination: generateDestinationOfTrip(),
  id: '0',
  isFavorite: false,
  offers: generateOffersOfType(),
  type: generateTypeOfTrip(),
});
