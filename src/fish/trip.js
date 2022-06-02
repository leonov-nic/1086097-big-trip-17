import {getRandomInteger} from '../utils/common';
import {descriptionOfTrip} from '../const';

const generateDestinationOfTrip = () => {
  const randomIndex = getRandomInteger(0, descriptionOfTrip.length - 1);
  return descriptionOfTrip[randomIndex];
};

const getOffersOfTrip = () => {
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
    },
    {
      type: 'drive',
      offers: [
        {
          id: 1,
          title: 'Rent a car',
          price: 200
        }
      ]
    }
  ];

  const randomIndex = getRandomInteger(0, offersOfTrip.length - 1);
  return offersOfTrip[randomIndex];
};

export const generateTrip = () => {
  const offersOfTrip = getOffersOfTrip();
  return ({
    basePrice: getRandomInteger(500, 1500),
    dateFrom: `2022-0${getRandomInteger(4, 6)}-10T22:55:56.845Z`,
    dateTo: `2022-0${getRandomInteger(4, 9)}-11T${getRandomInteger(10, 18)}:22:13.375Z`,
    destination: generateDestinationOfTrip(),
    id: getRandomInteger(1, 200),
    isFavorite: getRandomInteger(0, 1),
    offers: offersOfTrip,
    type: offersOfTrip.type,
  });
};
