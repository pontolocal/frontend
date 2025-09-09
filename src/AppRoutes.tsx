import { createBrowserRouter } from 'react-router-dom'

// --- Page & Layout Imports ---
// Import the main application shell/layout.
import App from './App'
// Import all the page components that will be used in the routes.
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import NotFoundPage from './pages/NotFoundPage'
import TestPage from './pages/TestPage'

/**
 * Creates and exports the application's router configuration.
 * This object defines all the available URL paths and which components to render for each path.
 */
export const router = createBrowserRouter([
  {
    // The root path of the application.
    path: "/",
    // The <App /> component acts as the layout for all nested child routes.
    // It will render a shared UI (like navbars, footers) and an <Outlet /> for the children.
    element: <App />,
    // Child routes are rendered inside the <App /> component's <Outlet />.
    children: [
      {
        // `index: true` marks this as the default child route for the "/" path.
        index: true,
        element: <LoginPage />,
      },
      {
        // Renders the SignUpPage at the "/signup" path.
        path: "signup",
        element: <SignUpPage />,
      },
      {
        // Renders the ForgotPasswordPage at the "/forgot-password" path.
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        // Renders the ResetPasswordPage at the "/reset-password" path.
        path: "reset-password",
        element: <ResetPasswordPage />,
      },

      //teste de botão
      {
              path: "test",
              element: <TestPage />,
            },
          ],
        },
        // ...
  
  
  // --- Catch-all 404 Route ---
  // The "*" path matches any URL that was not matched by the routes above.
  // This is used to display a "Not Found" page for invalid URLs.
  {
    path: "*",
    element: <NotFoundPage />,
  },
])