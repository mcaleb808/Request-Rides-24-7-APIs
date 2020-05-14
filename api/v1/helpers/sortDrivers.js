const sortDrivers = drivers => {
  return drivers.sort((a, b) => {
    const valueA = a.distance.split(' ')[0];
    const valueB = b.distance.split(' ')[0];
    const x = a.distance.split(' ')[1] === 'm' ? valueA / 1000 : valueA;
    const y = b.distance.split(' ')[1] === 'm' ? valueB / 1000 : valueB;
    if (+x < +y) {
      return -1;
    }
    if (+x > +y) {
      return 1;
    }
    return 0;
  });
};

export default sortDrivers;
