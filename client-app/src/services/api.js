import { refreshToken } from "./auth";
import { API_URL } from "./config";

async function handleApiRequest(url, options = {}) {
    const accessToken = localStorage.getItem('access_token');

    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        let response = await fetch(url, options);

        if (response.status === 401) {
            await refreshToken();
            const newAccessToken = localStorage.getItem('access_token');
            options.headers['Authorization'] = `Bearer ${newAccessToken}`;
            response = await fetch(url, options);
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred');
        }

        if (response.status === 204 || response.status === 205) {
            return null;
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function fetchTasks() {
    return await handleApiRequest(`${API_URL}/tasks/`, {
        method: 'GET',
    });
}

export async function fetchTaskById(id) {
    return await handleApiRequest(`${API_URL}/tasks/${id}`, {
        method: 'GET',
    });
}

export async function createTask(task) {
    return await handleApiRequest(`${API_URL}/tasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
}

export async function updateTask(taskId, status) {
    return await handleApiRequest(`${API_URL}/tasks/${taskId}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(status)
    });
}

export async function deleteTask(taskId) {
    return await handleApiRequest(`${API_URL}/tasks/${taskId}/`, {
        method: 'DELETE',
    });
}
