import { getRandomNumberInRange } from './getRandomNumberInRange';

const getRandomMonth = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const randomNumber = getRandomNumberInRange(0, 11);
  return months[randomNumber];
};

export default getRandomMonth;
