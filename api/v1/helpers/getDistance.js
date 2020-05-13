import fetch from 'node-fetch';

const { GOOGLE_MAP_KEY } = process.env;

const getDistance = (origin, destination) => {
  return fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&key=${GOOGLE_MAP_KEY}&destinations=${destination}`
  )
    .then(async data => {
      const res = await data.json();
      const { text } = res.rows[0].elements[0].distance;
      console.log(text);
      return text;
    })
    .catch(err => {
      return err;
    });
};

export default getDistance;
