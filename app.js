// Sidebar elements //
const sideBar = document.querySelector(".sidebar");
const menu = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");

// safely attach sidebar toggles if elements exist
if (menu && sideBar) {
  menu.addEventListener("click", function () {
    sideBar.classList.remove("close-sidebar");
    sideBar.classList.add("open-sidebar");
  });
}

if (closeIcon && sideBar) {
  closeIcon.addEventListener("click", function () {
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
  });
}

// PROJECT VIDEOS: make hover and touch play reliable
// Select all video elements inside project boxes so IDs aren't required
const projectVideos = document.querySelectorAll(".project-vidbox video");

projectVideos.forEach((video) => {
  if (!video) return;

  // Some browsers block playback unless video is muted or via a user gesture.
  // Muting ensures hover-triggered play works reliably.
  try {
    video.muted = true;
  } catch (e) {
    // ignore if setting muted fails
  }

  // preload metadata for quicker start
  video.preload = "metadata";

  // find hover-sign inside the same project box (if present)
  const hoverSign = video
    .closest(".project-vidbox")
    ?.querySelector(".hover-sign");

  // mouse events for desktop
  video.addEventListener("mouseenter", () => {
    // play returns a promise in modern browsers; catch to avoid uncaught rejections
    video.play().catch((err) => {
      // console.info can be used during debugging; avoid noisy logs for users
    });
    if (hoverSign) hoverSign.classList.add("active");
  });

  video.addEventListener("mouseleave", () => {
    video.pause();
    if (hoverSign) hoverSign.classList.remove("active");
  });

  // support touch devices: tap to toggle play/pause
  video.addEventListener("touchstart", (ev) => {
    // prevent simulated mouse events from immediately following
    ev.preventDefault();
    if (video.paused) {
      video.play().catch(() => {});
      if (hoverSign) hoverSign.classList.add("active");
    } else {
      video.pause();
      if (hoverSign) hoverSign.classList.remove("active");
    }
  });
});
