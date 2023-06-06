export const fetchAdditionalData = async (films, vehicles, starships, speciesURL, planetURL) => {
  let result = {};

  if (films) {
    let fetchedFilms = [];
    for (let filmURL of films) {
      const dataFilm = await (await fetch(filmURL)).json();
      const id = filmURL.split('/films/')[1].split('/')[0];
      fetchedFilms.push({ id, name: dataFilm.title, episodeId: dataFilm.episode_id });
    }
    result.films = fetchedFilms;
  }

  if (vehicles) {
    let fetchedVehicles = [];
    for (let vehicleURL of vehicles) {
      const dataVehicle = await (await fetch(vehicleURL)).json();
      const id = vehicleURL.split('/vehicles/')[1].split('/')[0];
      fetchedVehicles.push({ id, name: dataVehicle.name, model: dataVehicle.model });
    }
    result.vehicles = fetchedVehicles;
  }

  if (starships) {
    let fetchedStarships = [];
    for (let starshipURL of starships) {
      const dataStarship = await (await fetch(starshipURL)).json();
      const id = starshipURL.split('/starships/')[1].split('/')[0];
      fetchedStarships.push({ id, name: dataStarship.name, model: dataStarship.model });
    }
    result.starships = fetchedStarships;
  }

  if (speciesURL) {
    const dataSpecies = await (await fetch(speciesURL)).json();
    result.species = dataSpecies.name;
  }

  if (planetURL) {
    const dataPlanet = await (await fetch(planetURL)).json();
    result.homeworld = dataPlanet.name;
  }

  return result;
};
