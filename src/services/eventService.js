export async function getVenues() {
    return fetch('http://localhost:8080/api/venue').then(response => {
        if (!response.ok) {
            throw new Error('Response not ok');
        }
        return response.json();
    });
}

export async function createEvent(formData) {
    const url = 'http://localhost:8080/api/events';

    const eventData = {
        name: formData.name,
        start_date: formData.startDate,
        end_date: formData.endDate,
        venues: [formData.location.id]
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(eventData),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    if (!response.ok) {
        throw new Error('Failed to create event');
    }
}

export async function getEvents() {
  const url = 'http://localhost:8080/api/events';

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get events');
  }

  return response.json();
}

export async function createVenue(formData) {
    const url = 'http://localhost:8080/api/venue';

    const venueData = {
        name: formData.name,
        location: formData.location,
        description: formData.description
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(venueData),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    if (!response.ok) {
      if (response.status === 409) {
        const message = await response.text();
        console.error("Błąd konfliktu:", message);
        throw new Error(message);
      } else {
        const message = await response.text();
        console.error("Inny błąd:", message);
        throw new Error(message);
      }
        
    }
}

export async function updateEvent() {
  // const url = 'http://localhost:8080/api/events';

  // const response = await fetch(url, {
  //   method: "GET",
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8",
  //     "Accept": "application/json"
  //   }
  // });

  // if (!response.ok) {
  //   throw new Error('Failed to get events');
  // }

  // return response.json();
}