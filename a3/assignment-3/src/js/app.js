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
  const selectedArtistEle = document.getElementById("selected-artist");
  const songsTable = document.getElementById("songs");
  const songsHead = document.getElementById("songs-head");

  // Loop through all of your Artist objects and create a <button> element for each, adding it to the <nav id=”menu”>…</nav>
  artists.forEach((artist) => {
    const button = document.createElement("button");

    // Use each Artist’s name for the button’s text
    button.textContent = artist.name;
    button.classList = "menu-btn";

    // When the button is clicked, show that Artist’s Name, Links, and Songs.
    button.addEventListener("click", () => showArtistDetails(artist));
    menu.appendChild(button);
  });

  // Show a list of Songs in the <tbody>…</tbody> of your Table. By default, you should use your first Artist on load.
  showArtistDetails(artists[0]);

  // Write a function that will show a list of songs in the <tbody>…</tbody> based on the chosen Artist
  function showArtistDetails(artist) {
    // Update the text of the Selected Artist above your table with the Artist’s Name
    selectedArtistEle.textContent = artist.name;

    // Clear Table Head
    songsHead.innerHTML = "";

    // Clear Table Head Row
    const headTr = document.createElement("tr");

    // Clear Table Head Row Cells
    const titleHead = document.createElement("td");
    const yearHead = document.createElement("td");
    const durationHead = document.createElement("td");
    const explicitHead = document.createElement("td");

    // Add classes to Table Head Row Cells
    titleHead.classList = "songs-table-head-cell song-title";
    yearHead.classList = "songs-table-head-cell song-year";
    durationHead.classList = "songs-table-head-cell song-duration";
    explicitHead.classList = "songs-table-head-cell song-explicit";

    // Add Text to Table Head Row Cells
    titleHead.textContent = "Song Name";
    yearHead.textContent = "Year Recorded";
    durationHead.textContent = "Duration (mm:ss)";
    explicitHead.textContent = "Explicit";

    // Append Cells to Table Head Row
    headTr.appendChild(titleHead);
    headTr.appendChild(yearHead);
    headTr.appendChild(durationHead);
    headTr.appendChild(explicitHead);

    // Append Table Head Row to Table Head
    songsHead.appendChild(headTr);

    // Clear the current <tr>…</tr> rows from the <tbody>…</tbody>
    songsTable.innerHTML = "";

    // Filter your Songs Array (i.e., use Array.prototype.filter()) to get all Songs for the chosen Artist
    const artistSongs = songs.filter((song) => song.artistId === artist.artistId);

    // Loop (use Array.prototype.forEach()) over your filtered song list and add them to the table’s body using DOM methods
    artistSongs.forEach((song) => {
      // Create a <tr> element
      const tr = document.createElement("tr");
      tr.classList = "songs-table-row";

      // Create <td> elements for the song’s name, year, and duration
      const titleCell = document.createElement("td");
      const yearCell = document.createElement("td");
      const durationCell = document.createElement("td");
      titleCell.classList = "songs-table-cell song-title";
      yearCell.classList = "songs-table-cell song-year";
      durationCell.classList = "songs-table-cell song-duration";

      // If the song has explicit lyrics, indicate that
      const explicitCell = document.createElement("td");
      explicitCell.classList = "songs-table-cell song-explicit";

      // Make the song’s title a link to the URL for the song
      titleCell.innerHTML = `<a class="songs-table-cell-links" href="${song.mediaUrl}" target="_blank">${song.title}</a>`;
      yearCell.textContent = song.released;

      // Convert the duration in seconds to a value in mintues:seconds
      durationCell.textContent = `${Math.floor(song.duration / 60)}:${song.duration % 60 < 10 ? "0" : ""}${song.duration % 60}`;
      explicitCell.textContent = song.explicitLyrics ? "Yes" : "No";

      // Append these <td> elements to the <tr>
      tr.appendChild(titleCell);
      tr.appendChild(yearCell);
      tr.appendChild(durationCell);
      tr.appendChild(explicitCell);

      // Append this <tr> to the <tbody>
      songsTable.appendChild(tr);
    });
  }
});
