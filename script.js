function downloadProfiles() {
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then(data => {
        displaySuccessMessage();
        displayProfiles(data.results);
      })
      .catch(error => console.error('Error fetching profiles:', error));
  }

  function displaySuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
  }

  function displayProfiles(profiles) {
    const container = document.getElementById('profiles-container');
    container.innerHTML = '';

    profiles.forEach(profile => {
      const profileDiv = document.createElement('div');
      profileDiv.classList.add('profile');

      const img = document.createElement('img');
      img.src = profile.picture.large;
      img.alt = 'Profile Picture';
      profileDiv.appendChild(img);

      const infoDiv = document.createElement('div');
      infoDiv.classList.add('info');

      const { city, country, postcode } = profile.location;

      const fields = ['cell', 'city', 'country', 'postcode'];

      fields.forEach(field => {
        const p = document.createElement('p');
        if (field === 'city') {
          p.textContent = `City: ${city}`;
        } else if (field === 'country') {
          p.textContent = `Country: ${country}`;
        } else if (field === 'postcode') {
          p.textContent = `Postcode: ${postcode}`;
        } else {
          p.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)}: ${profile[field]}`;
        }
        infoDiv.appendChild(p);
      });

      profileDiv.appendChild(infoDiv);
      container.appendChild(profileDiv);
    });
  }