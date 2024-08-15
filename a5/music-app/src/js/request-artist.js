/**
 * WEB222 – Assignment 5
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Luca Novello
 *      Student ID: 038515003
 *      Date:       Aug 12, 2024
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
// const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.

document.addEventListener("DOMContentLoaded", function () {
  const footerElement = document.querySelector("#footer-copyright");
  const artistImage = document.querySelector("#artist-image");
  const socialMediaInput = document.querySelector("#social-media");
  const songVideoInput = document.querySelector("#song-videos");
  const addSocialBtn = document.querySelector("#add-social-btn");
  const addSongBtn = document.querySelector("#add-song-btn");
  const SongUrlList = document.querySelector("#artist-form-url-list");
  const SocialUrlList = document.querySelector("#artist-form-social-list");
  const addedSongsTitle = document.querySelector("#added-songs-title");

  const songUrlArr = [];
  const socialUrlArr = [];

  artistImage.style.objectPosition = "50% 45%";
  artistImage.src =
    "https://cdn.aarp.net/content/dam/aarp/politics/events-and-history/2017/04/1140-the-icons-of-disco-saturday-night-fever.imgcache.rev426117a4f88c6343ebc505af5830b8ac.jpg";
  artistImage.alt = "Saturday Night Fever banner";

  // Insert the current year into the footer
  const currentYear = new Date().getFullYear();
  if (footerElement) {
    footerElement.textContent = currentYear;
  }

  // Insert added song to list
  addSongBtn.addEventListener("click", () => {
    if (songVideoInput.value) {
      if (songUrlArr.length === 0) {
        addedSongsTitle.hidden = false;
      }
      addClickHandler(songUrlArr, songVideoInput, SongUrlList, "song_videos[]");
    }
  });
  // Insert added social to list
  addSocialBtn.addEventListener("click", () => {
    if (socialMediaInput.value) {
      addClickHandler(socialUrlArr, socialMediaInput, SocialUrlList, "social_media[]");
    }
  });

  function addClickHandler(urlArr, input, parent, name) {
    urlArr.push(input.value);
    handleUrls(urlArr, parent, name);
    input.required = false;
    input.value = "";
  }

  function handleUrls(urlArr, parent, name) {
    parent.innerHTML = "";
    urlArr.forEach((url) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = url;
      parent.appendChild(input);
      displayUrl(url, parent);
    });
  }

  function displayUrl(url, parent) {
    const urlElement = document.createElement("li");
    urlElement.textContent = url;
    urlElement.classList.add("artist-form-url-list-item");
    parent.appendChild(urlElement);
  }
});
