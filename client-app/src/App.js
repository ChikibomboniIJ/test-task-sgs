import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import CreatePage from './pages/Create';
import LoginPage from './pages/Login';
import MainPage from './pages/Main';
import ModifyPage from './pages/Modify';
import RegisterPage from './pages/Register';
import TasksPage from './pages/Tasks';
import ChangePasswordPage from './pages/ChangePassword';
import ProtectedRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <MainPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/tasks"
                        element={
                            <ProtectedRoute>
                                <TasksPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/tasks/create"
                        element={
                            <ProtectedRoute>
                                <CreatePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/tasks/modify/:id"
                        element={
                            <ProtectedRoute>
                                <ModifyPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/change-password"
                        element={
                            <ProtectedRoute>
                                <ChangePasswordPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;