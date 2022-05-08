import dayjs from 'dayjs';

const humanizeTripDueFullDate = (date) => dayjs(date).format('YY/MM/DD HH:mm');

export { humanizeTripDueFullDate };
