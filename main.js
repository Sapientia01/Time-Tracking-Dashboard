fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const distributions = document.querySelector(".distributions ");
    const dailyBtn = document.querySelector(".daily");
    const weeklyBtn = document.querySelector(".weekly");
    const monthlyBtn = document.querySelector(".monthly");
    let timeframe = "weekly";

    function generate(timeframe, data, index) {
      let card;
      let title = data[index].title;
      let cur = data[index].timeframes[timeframe].current;
      let prev = data[index].timeframes[timeframe].previous;
      let prevTime = "week";

      card = document.createElement("div");
      card.classList.add("card");
      card.classList.add(`${title}`);

      card.innerHTML = `
          <div class="card_icon">
            <img src="images/icon-${title}.svg" alt="${title}" />
          </div>
          <div class="content">
            <nav>
              <p>${title}</p>
              <img src="images/icon-ellipsis.svg" alt="Nav" />
            </nav>
            <div class="duration">
              <h1 class="cur_time">${cur}hrs</h1>
              <p class="prev_time">Last ${prevTime}- ${prev}hrs</p>
            </div>
          </div>
        `;
      distributions.append(card);
    }
    function ChangeTimeFrame(timeframe, prev_time) {
      let prevTimes = document.querySelectorAll(".prev_time");
      let curTimes = document.querySelectorAll(".cur_time");
      for (let i = 0; i < 6; i++) {
        let cur = data[i].timeframes[timeframe].current;
        let prev = data[i].timeframes[timeframe].previous;

        curTimes[i].textContent = `${cur} hrs`;
        prevTimes[i].textContent = `Last ${prev_time} - ${prev} hrs`;
      }
    }

    for (let i = 0; i < 6; i++) {
      generate(timeframe, data, i);
    }

    dailyBtn.addEventListener("click", () => {
      dailyBtn.classList.add("active");
      weeklyBtn.classList.remove("active");
      monthlyBtn.classList.remove("active");
      timeframe = "daily";
      ChangeTimeFrame(timeframe, "day");
    });
    weeklyBtn.addEventListener("click", () => {
      weeklyBtn.classList.add("active");
      dailyBtn.classList.remove("active");
      monthlyBtn.classList.remove("active");
      timeframe = "weekly";
      ChangeTimeFrame(timeframe, "week");
    });
    monthlyBtn.addEventListener("click", () => {
      monthlyBtn.classList.add("active");
      dailyBtn.classList.remove("active");
      weeklyBtn.classList.remove("active");
      timeframe = "monthly";
      ChangeTimeFrame(timeframe, "month");
    });
  })
  .catch((error) => {
    console.error("Error is:", error);
  });
