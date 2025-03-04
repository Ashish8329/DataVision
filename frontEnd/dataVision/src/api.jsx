

export async function fetchData() {
    try {
        const url = 'http://127.0.0.1:8000/data/'
        const response = await fetch(url); // Replace with actual API URL
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
