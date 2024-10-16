import { Restaurant } from "../interfaces/restaurants";
import { weeklyMenu, dailyMenu } from "./restaurantModal";

const restaurantInfo = async (
  restaurant: Restaurant
): Promise<HTMLDivElement> => {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  div.classList.add("restaurantModal");

  const todayMenuBtn = document.createElement("button");
  const weeklyMenuBtn = document.createElement("button");
  todayMenuBtn.classList.add("modalBtn");
  weeklyMenuBtn.classList.add("modalBtn");

  todayMenuBtn.addEventListener("click", () => {
    dailyMenu(restaurant._id);
  });
  weeklyMenuBtn.addEventListener("click", () => {
    weeklyMenu(restaurant._id);
  });

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("menuBtnContainer");
  btnContainer.append(todayMenuBtn, weeklyMenuBtn);

  h3.textContent = `${restaurant.name} - ${restaurant.company}`;
  p.innerHTML = `<b>${restaurant.address}</b> <br> ${restaurant.postalCode} ${restaurant.city}`;
  todayMenuBtn.textContent = "Päivän menu";
  weeklyMenuBtn.textContent = "Viikon menu";
  div.append(h3, p, btnContainer);

  return div;
};

export { restaurantInfo };
