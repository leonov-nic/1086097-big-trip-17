const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
};

const SortType = {
  DEFAULT: 'default',
  TIME: 'time',
  PRICE: 'price',
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

export { offersOfTrip, typesOfTrip, Mode, SortType };
