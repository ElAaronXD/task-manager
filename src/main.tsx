import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './index.css'
import Home from './pages/home'
import { ThemeProvider } from './components/theme-provider'
import NotFound from './pages/not-found'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="task-manager-theme">
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>,
)
