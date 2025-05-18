export async function getVenues() {
    return fetch('http://localhost:8080/api/venue').then(response => {
        if (!response.ok) {
            throw new Error('Response not ok');
        }
        return response.json();
    });
}

export async function createEvent(formData) {
    const url = 'http://localhost:8080/api/event';

    const eventData = {
        name: formData.name,
        start_date: formData.startDate,
        end_date: formData.endDate,
        venues: formData.venues.map(venue => venue.id)
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(eventData),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    if (!response.ok) {
      const message = await response.text();
      console.error(message);
      throw new Error(message);
    }
}

export async function getEvents() {
  const url = 'http://localhost:8080/api/event';

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

export async function updateEvent(editFormData) {
  const url = `http://localhost:8080/api/event/${editFormData.id}`;

  const eventUpdateData = {
    name: editFormData.name,
    start_date: editFormData.startDate,
    end_date: editFormData.endDate,
    venues: editFormData.venues.map(venue => venue.id)
    };

  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(eventUpdateData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    const message = await response.text();
    console.error(message);
    throw new Error(message);
  }
}

export async function deleteEvent(eventId) {
  const url = `http://localhost:8080/api/event/${eventId}`

  const response = await fetch(url,{
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    const message = await response.text();
    console.error(message);
    throw new Error(message);
  }

}

export async function getReferees() {
  const url = 'http://localhost:8080/api/referee';

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get referees');
  }

  return response.json();
}

export async function acceptReferee(refereeId) {
  const url = `http://localhost:8080/api/referee/${refereeId}/approve`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to accept referee: ${refereeId}`);
  }

}