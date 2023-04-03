const dinero = monto => {
  return Number(monto).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const fechas = date => {
  return new Date(date).toLocaleString('es-Es', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const idGenerator = () => {
  const random = Math.random().toString(36).substring(2, 11);
  const date = Date.now().toString(36);
  return random + date;
};

export {dinero, fechas, idGenerator};
