
// Check if the user has already joined the waiting list
window.onload = function () {
  const hasJoinedWaitingList = localStorage.getItem('hasJoinedWaitingList');


  // If the user hasn't joined, show the modal
  if (hasJoinedWaitingList) {
    document.getElementById('leadsModal').style.display = 'none';
  } else {
    document.getElementById('leadsModal').style.display = 'block';
  }
};

// Get the modal
let tkModal = document.getElementById("thankYouModal");
let spinner = document.getElementById("loadingSpinner");

// Get the <span> element that closes the modal
let span = document.getElementById("tkclose");

// Handle form submission
document.getElementById('leadsForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  // Show the loading spinner
  spinner.style.display = "block";

  // Collect form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Submit the form data to the server
  fetch('https://splinx-server.onrender.com/leads/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      // Hide the spinner once the request completes
      spinner.style.display = "none";
      if (data) {
        // Set flag in localStorage after successful form submission
        localStorage.setItem('hasJoinedWaitingList', 'true');

        // Hide the leads modal
        document.getElementById('leadsModal').style.display = 'none';

        // Show the thank you modal
        tkModal.style.display = "block";

        // Optionally reset the form
        document.getElementById('leadsForm').reset();

        
      } else {
        alert('Submission failed. Please try again.');
        // Hide the spinner once the request completes
        spinner.style.display = "none";
      }
    })
});

// When the user clicks on thank you <span> (x), close the modal
span.onclick = function () {
  tkModal.style.display = "none";
};

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

// Prevent users from closing the leads modal by clicking outside
window.onclick = function (event) {
  if (event.target === document.getElementById('leadsModal')) {
    event.stopPropagation();
  }
};
