const darkTheme = document.getElementById("icon") as HTMLImageElement | null;

if (darkTheme) {
  darkTheme.onclick = () => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
      darkTheme.src = "src/img/dm.png";
    } else {
      darkTheme.src = "src/img/lm.png";
    }
  };
};
