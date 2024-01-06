/**
 * handles out of bounds click event for an element or list of elements.
 * @param {Event} event DOM event
 * @param {Element[] | Element} elements - Array of Elements or a single Element
 * @param {Function} callback Success callback on event
 */
function handleOutOfBoundsClickEvent(event, elements, callback) {
  const elementsArray = Array.isArray(elements) ? elements : [elements];

  const isOutOfBounds = elementsArray.every(
    (element) => !element.contains(event.target)
  );

  if (isOutOfBounds && callback) {
    callback();
  }
}

const navbar = document.querySelector("nav");
const navbarLogo = document.querySelector("#navbar-logo");
const navbarCoral = document.querySelectorAll("#navbar-coral");
const menuSvg = document.querySelector("#hamburger");
const menuButton = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-navbar");
const leftTriggerButton = document.querySelector(".indicators .left");
const rightTriggerButton = document.querySelector(".indicators .right");
const currentTitle = document.querySelector("#currentTitle");
const musicPlayer = document.querySelectorAll(".music");

const rearrangeListLeft = () => {
  const titlesList = document.querySelector(".titles-list");
  const activeItem = titlesList.querySelector(".title.active");
  const lastItem = titlesList.lastElementChild;
  titlesList.removeChild(lastItem);
  titlesList.insertBefore(lastItem, titlesList.firstElementChild);
  activeItem.classList.remove("active");
  const allItems = titlesList.querySelectorAll(".title");
  const newActiveItem = allItems.item(Math.floor(allItems.length / 2));
  const movieName = newActiveItem.querySelector("span");
  newActiveItem.classList.add("active");

  currentTitle.textContent = movieName.textContent;
};

const rearrangeListRight = () => {
  const titlesList = document.querySelector(".titles-list");
  const activeItem = titlesList.querySelector(".title.active");
  const firstItem = titlesList.firstElementChild;
  titlesList.removeChild(firstItem);
  titlesList.appendChild(firstItem);
  activeItem.classList.remove("active");
  const allItems = titlesList.querySelectorAll(".title");
  const newActiveItem = allItems.item(Math.floor(allItems.length / 2));
  newActiveItem.classList.add("active");
  const movieName = newActiveItem.querySelector("span");
  newActiveItem.classList.add("active");

  currentTitle.textContent = movieName.textContent;
};

if (leftTriggerButton && rightTriggerButton) {
  leftTriggerButton.addEventListener("click", () => {
    rearrangeListLeft();
  });

  rightTriggerButton.addEventListener("click", () => {
    rearrangeListRight();
  });

  setInterval(() => {
    rearrangeListRight();
  }, 5000);
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = Math.floor(seconds % 60);
  return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}

if (navbar.classList.contains("show-transparent")) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("fixed");
      navbarLogo.src = "./assets/images/logo-dark.png";
      navbarCoral.forEach((item) => {
        item.src = "./assets/images/coral-dark.svg";
      });
      menuSvg.fill = "#134153";
    } else {
      navbar.classList.remove("fixed");
      navbarLogo.src = "./assets/images/logo.png";
      navbarCoral.forEach((item) => {
        item.src = "./assets/images/coral.svg";
      });
      menuSvg.fill = "#EEF8FB";
    }
  });
} else {
  navbar.classList.add("fixed");
  navbarLogo.src = "./assets/images/logo-dark.png";
  navbarCoral.forEach((item) => {
    item.src = "./assets/images/coral-dark.svg";
  });

  menuSvg.fill = "#EEF8FB";
}

if (menuButton) {
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}

document.addEventListener("click", function (event) {
  handleOutOfBoundsClickEvent(event, [mobileMenu, menuButton], function () {
    mobileMenu.classList.remove("show");
  });
});

function updatePlaybackTime(element, audio) {
  var timeLeft = formatTime(audio.duration - audio.currentTime);
  element.textContent = timeLeft;
}

if (musicPlayer.length > 0) {
  musicPlayer.forEach((player) => {
    const btn = player.querySelector("button");
    const audio = player.querySelector("audio");
    const timeStampElement = player.querySelector(".music-timer");

    btn.addEventListener("click", () => {
      const currentPlaying = document.querySelector(".music.playing");
      const currentPlayingAudio = currentPlaying?.querySelector("audio");
      const currentTimeStampElement =
        currentPlaying?.querySelector(".music-timer");

      if (player.classList.contains("playing")) {
        player.classList.remove("playing");
        audio.pause();
        audio.removeEventListener("timeupdate", () =>
          updatePlaybackTime(timeStampElement, audio)
        );
      } else if (currentPlaying) {
        currentPlaying.classList.remove("playing");
        currentPlayingAudio.pause();
        currentPlayingAudio.removeEventListener("timeupdate", () =>
          updatePlaybackTime(currentTimeStampElement, currentPlayingAudio)
        );
        player.classList.add("playing");
        audio.play();
        audio.addEventListener("timeupdate", () =>
          updatePlaybackTime(timeStampElement, audio)
        );
      } else {
        player.classList.add("playing");
        audio.play();
        audio.addEventListener("timeupdate", () =>
          updatePlaybackTime(timeStampElement, audio)
        );
      }
    });
  });
}
