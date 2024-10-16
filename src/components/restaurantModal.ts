import { fetchData } from "./fetchData";
import { WeeklyMenu, DailyMenu } from "../interfaces/menus";

const closeModal = document.querySelectorAll(".modalCloseBtn");
const dailyModal = document.getElementById(
  "dailyMenu"
) as HTMLDialogElement | null;
const weeklyModal = document.getElementById(
  "weeklyMenu"
) as HTMLDialogElement | null;

if (!(dailyModal || weeklyModal)) {
  throw new Error("Modalia ei löydy");
} else {
  closeModal.forEach((btn) => {
    btn.addEventListener("click", () => {
      dailyModal?.close();
      weeklyModal?.close();
    });
  });
}

const dailyMenu = async (restaurantId: string): Promise<void> => {
  const dailyMenu: DailyMenu = await fetchData(
    `/restaurants/daily/${restaurantId}/fi`
  );

  const foodContainer = document.querySelector(
    "#dailyFoodData"
  ) as HTMLDivElement | null;

  if (!dailyModal) {
    throw new Error("Modalia ei löydy");
  } else {
    const h3 = document.getElementById("dailyH3") as HTMLHeadingElement | null;

    const getDate = new Date();
    const date = new Intl.DateTimeFormat("fi-FI", {
      dateStyle: "full",
      timeZone: "Europe/Helsinki",
    }).format(getDate);
    if (h3) {
      h3.textContent = date;
    }

    if (foodContainer) {
      foodContainer.innerHTML = "";
      const foodDiv = document.createElement("div");

      console.log(dailyMenu);
      console.log(dailyMenu.courses);

      if (!(dailyMenu.courses.length == 0)) {
        dailyMenu.courses.map((food) => {
          const foodName = document.createElement("h3");
          foodName.textContent = food.name;
          const diets = document.createElement("p");
          diets.textContent = `Allergeenit: ${food.diets}`;
          const price = document.createElement("p");
          price.textContent = food.price
            ? `Hinta: ${food.price}`
            : "Hinta: Ei saatavilla";
          foodDiv.append(foodName, diets, price);
        });
      } else {
        const noMenu = document.createElement("h4");
        noMenu.textContent = "Ei menua saatavilla";
        foodDiv.appendChild(noMenu);
      }

      foodContainer.appendChild(foodDiv);
    }

    dailyModal.showModal();
  }
};

const weeklyMenu = async (restaurantId: string): Promise<void> => {
  const weeklyMenu: WeeklyMenu = await fetchData(
    `/restaurants/weekly/${restaurantId}/fi`
  );
  const modal = document.getElementById(
    "weeklyMenu"
  ) as HTMLDialogElement | null;
  if (!modal) {
    throw new Error("Modalia ei löydy");
  } else {
    const menuContainer = document.getElementById(
      "weeklyContainer"
    ) as HTMLDivElement | null;
    const foodContainer = document.createElement("div");

    if (menuContainer) {
      menuContainer.innerHTML = "";
      foodContainer.id = "weeklyFoodData";

      console.log(weeklyMenu.days);
      if (!(weeklyMenu.days.length === 0)) {
        weeklyMenu.days.map((day) => {
          const date = document.createElement("h2");
          const dateFoodContainer = document.createElement("div");
          dateFoodContainer.classList.add("modalFoodData");
          day.courses.map((data) => {
            const foodName = document.createElement("h3");
            foodName.textContent = data.name;
            const diets = document.createElement("p");
            diets.textContent = data.diets;
            const price = document.createElement("p");
            price.textContent = data.price;

            dateFoodContainer.append(foodName, diets, price);
          });

          console.log(day);
          date.textContent = day.date;
          foodContainer.append(date, dateFoodContainer);
          if (menuContainer) {
            menuContainer.appendChild(foodContainer);
          }
        });
      } else {
        const noMenu = document.createElement("h4");
        noMenu.textContent = "Ei menua saatavilla";
        menuContainer.appendChild(noMenu);
      }
    }
    modal.showModal();
  }
};

export { weeklyMenu, dailyMenu };
