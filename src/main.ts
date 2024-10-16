import "./components/map";
import { fetchData } from "./components/fetchData";
import { Restaurant } from "./interfaces/restaurants";
import { changeView, createMarker, deleteMarkers } from "./components/map";
import { restaurantInfo } from "./components/restaurantInfo";

const fetchRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const restaurants: Restaurant[] = await fetchData("/restaurants");
    console.log(restaurants)
    return restaurants;
  } catch (err) {
    throw new Error(`Error fetching restaurants: + ${err}`);
  }
};

const createRestaurantMarkers = async (): Promise<void> => {
  const restaurants = await fetchRestaurants();
  console.log(restaurants);
  restaurants.map(async (restaurant) => {
    const coords = restaurant.location.coordinates;
    createMarker(coords[1], coords[0], await restaurantInfo(restaurant));
  });
};

const sortedMarkers = async (city: string) => {
  deleteMarkers();
  const restaurants = await fetchRestaurants();
  const coordsList: number[][] = [];

  await Promise.all(
    restaurants.map(async (restaurant) => {
      if (restaurant.city === city || city === "Kaikki") {
        const coords = restaurant.location.coordinates;
        coordsList.push(coords);
        createMarker(coords[1], coords[0], await restaurantInfo(restaurant));
      }
    })
  );

  let zoomLevel = 6;
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  let screenRatio = screenWidth/screenHeight;
  console.log(screenRatio);


  if (coordsList.length > 0) {
    const avgLat = coordsList.reduce((sum, coords) => sum + coords[1], 0) / coordsList.length;
    const avgLng = coordsList.reduce((sum, coords) => sum + coords[0], 0) / coordsList.length;

    if (city === "Kaikki") {

      if (screenWidth < 800) {
        zoomLevel = 5;
      };
      console.log(zoomLevel);
      changeView(64.27256659801493, 25.866867359990998, zoomLevel);

    } else if (city === "Vantaa" && screenWidth < 700) {
      zoomLevel = 11;
      changeView(avgLat, avgLng, zoomLevel);
    } else {
      zoomLevel = 12;
      changeView(avgLat, avgLng, zoomLevel);
    }
  }
};



const delBtns = document.querySelectorAll(".sortBtn");

delBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("value");
    if (!value) throw new Error("Buttonilta ei löytynyt valueta");
    sortedMarkers(value);
    console.log("CLICK");
  });
});

createRestaurantMarkers();
