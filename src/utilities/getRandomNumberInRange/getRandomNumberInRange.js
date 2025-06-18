const getRandomNumberInRange = (minimum, maximum) => {
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

export default getRandomNumberInRange;