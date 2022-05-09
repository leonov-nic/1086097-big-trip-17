import dayjs from 'dayjs';

const humanizeTripDueDate = (date) => dayjs(date).format('HH:mm');
const humanizeTripDueDateTwo = (date) => dayjs(date).format('MMM D');

const getDurationTime = (dateto, datefrom) => {
  const diffTime = dayjs(dateto).diff(dayjs(datefrom));
  const hours = dayjs(diffTime).format('HH');
  const minutes = dayjs(diffTime).format('mm');
  const newDiffTime = `${hours}H ${minutes}M`;
  return newDiffTime;
};

export { humanizeTripDueDate, humanizeTripDueDateTwo, getDurationTime };
