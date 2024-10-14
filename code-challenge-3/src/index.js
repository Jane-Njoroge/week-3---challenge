// Your code 
const movieDetailsUrl = 'http://localhost:3000/films/1';

fetch(movieDetailsUrl)
  .then(response => response.json())
  .then(movie => displayMovieDetails(movie));

function displayMovieDetails(movie) {
  document.getElementById('movie-title').textContent = movie.title;
  document.getElementById('movie-poster').src = movie.poster;
  document.getElementById('movie-runtime').textContent = `${movie.runtime} mins`;
  document.getElementById('movie-showtime').textContent = movie.showtime;
  const availableTickets = movie.capacity - movie.tickets_sold;
  document.getElementById('movie-available-tickets').textContent = `Available Tickets: ${availableTickets}`;
}
const allMoviesUrl = 'http://localhost:3000/films';

fetch(allMoviesUrl)
  .then(response => response.json())
  .then(movies => {
    const filmsList = document.getElementById('films');
    filmsList.innerHTML = ''; 
    movies.forEach(movie => {
      const li = document.createElement('li');
      li.textContent = movie.title;
      li.classList.add('film', 'item');
      filmsList.appendChild(li);
    });
  });
  const buyTicketButton = document.getElementById('buy-ticket-button');

buyTicketButton.addEventListener('click', () => {
  const movieDetailsUrl = 'http://localhost:3000/films/1'; // Fetch the current movie's details

  fetch(movieDetailsUrl)
    .then(response => response.json())
    .then(movie => {
      if (movie.tickets_sold < movie.capacity) {
        const newTicketsSold = movie.tickets_sold + 1;

        // Update the number of tickets sold on the server
        fetch(`http://localhost:3000/films/${movie.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tickets_sold: newTicketsSold
          })
        })
        .then(response => response.json())
        .then(updatedMovie => {
          const availableTickets = updatedMovie.capacity - updatedMovie.tickets_sold;
          document.getElementById('movie-available-tickets').textContent = `Available Tickets: ${availableTickets}`;

          // If no tickets are left, disable the button
          if (availableTickets === 0) {
            buyTicketButton.textContent = "Sold Out";
            buyTicketButton.disabled = true;
          }
        });
      }
    });
});
function updateSoldOutStatus(movie) {
    if (movie.capacity - movie.tickets_sold === 0) {
      document.getElementById('buy-ticket-button').textContent = 'Sold Out';
      document.getElementById('buy-ticket-button').disabled = true;
    }
  }
