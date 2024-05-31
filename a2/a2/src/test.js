const data = require('./data');
const { results } = data;

function speciesCoordinates3(data) {
  for (const result in data.results) {
    console.log('test');
    console.log(result.location);
    const formattedLocation = result.location.split(',').join(', ');
    console.log(`"${result.species_guess}" observed at coordinates (${formattedLocation})`);
  }
}
speciesCoordinates3(results);
// Our unit test files need to access the functions we defined
// above, so we export them here.
exports.speciesCoordinates3 = speciesCoordinates3;
