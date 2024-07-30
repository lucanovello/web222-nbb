/**
 * WEB222 – Assignment 3
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
 *      Date:       July 2, 2024
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
// const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.

document.addEventListener("DOMContentLoaded", function () {
  const { artists, songs } = window;
  const menu = document.getElementById("menu");
  const footerElement = document.getElementById("footer-copyright");
  const introScreen = document.getElementById("intro-screen");
  const artistImage = document.getElementById("artist-image");
  const selectedArtistEle = document.getElementById("selected-artist");
  const songsContainer = document.getElementById("songs-container");

  // intro screen ------------------
  setTimeout(() => {
    introScreen.classList.add("fade-out");
  }, 500);
  setTimeout(() => {
    document.body.classList.remove("overflow-hidden");
    introScreen.style.display = "none";
  }, 1500);

  // Loop through all of your Artist objects and create a <button> element for each, adding it to the <nav id="menu">…</nav>
  artists.forEach((artist) => {
    const button = document.createElement("button");

    // Use each Artist"s name for the button"s text
    button.textContent = artist.name;
    button.classList = "menu-btn";

    // When the button is clicked, show that Artist"s Name, Links, and Songs.
    button.addEventListener("click", () => showArtistDetails(artist));
    menu.appendChild(button);
  });

  // Show a list of Songs in the <tbody>…</tbody> of your Table. By default, you should use your first Artist on load.
  showArtistDetails(artists[0]);

  function createSongCard(song) {
    // Create a <div> to hold the card
    const card = document.createElement("a");
    // Add the .song-card class to the <div>
    card.classList.add("card");
    card.href = song.mediaUrl;
    card.alt = song.title;
    card.target = "_blank";
    // Create a song image, use the .card-image class
    const songImg = document.createElement("img");
    songImg.style.objectPosition = song.imagePosition;
    songImg.classList.add("card-image");
    songImg.src = song.imageUrl;
    // Create a <div> for card text
    const textContainer = document.createElement("div");
    textContainer.classList.add("card-text-wrapper");
    // Create a <h2> for card song title
    const title = document.createElement("h2");
    title.classList.add("card-text-title");
    title.textContent = song.title;
    // Create a <div> for card song date & duration container
    const dateWrapper = document.createElement("div");
    dateWrapper.classList.add("card-time-wrapper");
    // Create a <time> for card song date
    const date = document.createElement("time");
    date.classList.add("card-text-date");
    date.textContent = song.released;
    // Create a <span> for card song duration
    const duration = document.createElement("span");
    duration.classList.add("card-text-duration");
    // Convert the duration in seconds to a value in mintues:seconds
    duration.textContent = `${Math.floor(song.duration / 60)}:${song.duration % 60 < 10 ? "0" : ""}${song.duration % 60} min`;

    // Append all elements to parents
    dateWrapper.appendChild(date);
    dateWrapper.appendChild(duration);
    // Create a <span> for card song explicit lyrics if true
    if (song.explicitLyrics) {
      const explicitWrapper = document.createElement("span");
      explicitWrapper.classList.add("card-text-explicit-wrapper");
      const explicit = document.createElement("p");
      explicit.classList.add("card-text-explicit");
      explicit.textContent = "E";
      explicitWrapper.appendChild(explicit);
      dateWrapper.appendChild(explicitWrapper);
    }
    textContainer.appendChild(title);
    textContainer.appendChild(dateWrapper);
    card.appendChild(songImg);
    card.appendChild(textContainer);
    songsContainer.appendChild(card);

    // Return the card"s <div> element to the caller
    return card;
  }

  // Write a function that will show a list of songs in the <tbody>…</tbody> based on the chosen Artist - OLD TABLE
  function showArtistDetails(artist) {
    // Update artist image & position
    if (artist.image) {
      artistImage.style.objectPosition = artist.imagePosition;
      artistImage.src = artist.image;
      artistImage.alt = artist.name;
    } else {
      artistImage.classList = "artist-image-hide";
    }
    // Update the text of the Selected Artist above your table with the Artist"s Name
    selectedArtistEle.textContent = artist.name;

    // Filter your Songs Array (i.e., use Array.prototype.filter()) to get all Songs for the chosen Artist
    const artistSongs = songs.filter((song) => song.artistId === artist.artistId);
    songsContainer.innerHTML = "";

    // Loop (use Array.prototype.forEach()) over your filtered song list and add them to the table"s body using DOM methods
    artistSongs.forEach((song) => {
      // Create a card element
      createSongCard(song);
    });
  }

  // Insert the current year into the footer
  const currentYear = new Date().getFullYear();
  if (footerElement) {
    footerElement.textContent = currentYear;
  }
});
