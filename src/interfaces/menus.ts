type Course = {
    name: string;
    price: string;
    diets: string;
  };

  type DailyMenu = {
    courses: Course[];
  };

  type DayMenu = DailyMenu & { date: string };

  type WeeklyMenu = {
    days: DayMenu[];
  };

  export type { Course, DailyMenu, WeeklyMenu };
