export async function login(username, password) {
    return {
        name: username
    }
}

async function getOrDie(url) {
    const response = await fetch(url)
    if (response.status !== 200) {
        throw new Error('')
    }
    return response.json()
}

export async function getResources() {
    try {
        const data = await getOrDie('/api/resources');
        console.log("API data:", data); // Log the response
        //return data;
    } catch (error) {
        console.error("Error fetching resources:", error);
        throw error;
    }
}

