export async function getVenues() {
    return fetch('http://localhost:8080/api/venue').then(response => {
        if (!response.ok) {
            throw new Error('Response not ok');
        }
        return response.json();
    });
}