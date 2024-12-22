import { API_URL } from "./config";

async function handleRequest(url, options) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error?.message || data.error || 'An error occurred');
        }
        return data;
    } catch (error) {
        throw error; 
    }
}

export async function login(username, password) {
    const data = await handleRequest(`${API_URL}/users/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);

    return data;
}

export async function register(username, email, password, passwordConfirmed) {
    return await handleRequest(`${API_URL}/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, password_confirmed: passwordConfirmed })
    });
}

export async function logout() {
    const data = await handleRequest(`${API_URL}/users/logout/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ refresh: localStorage.getItem('refresh_token') })
    });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    return data;
}

export async function changePassword(oldPassword, newPassword, newPasswordConfirmed) {
    return await handleRequest(`${API_URL}/users/change-password/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
            new_password_confirmed: newPasswordConfirmed
        })
    });
}

export async function refreshToken() {
    const data = await handleRequest(`${API_URL}/users/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: localStorage.getItem('refresh_token') })
    });
    localStorage.setItem('access_token', data.access);
    return data;
}

export async function isTokenVerified() {
    return await handleRequest(`${API_URL}/users/token/verify/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('refresh_token') })
    });
}
