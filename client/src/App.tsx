import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";

// Auth (TanStack Query)
import { useAuthQuery, useSessionSync } from "@/features/auth";

// Contexts
import { SocketProvider } from "@/contexts/SocketContext";

// Components
import { ErrorFallback } from "@/components/ErrorFallback";
import CreateOrgDialog from "@/features/organizer/ui/components/CreateOrgDialog";
import CreateTeamDialog from "@/features/teams/ui/components/dialogs/CreateTeamDialog";
import ScrollToTop from "@/components/shared/layout/ScrollToTop";

// Routes
import AppRoutes from "@/routes/AppRoutes";

const App = () => {
  // Cross-tab session sync (instantly close all tabs on logout)
  useSessionSync();

  // Background auth check — doesn't block public pages (Home, Tournaments, etc.)
  useAuthQuery();

  return (
    <SocketProvider>
      <Toaster position="top-center" />
      <CreateOrgDialog />
      <CreateTeamDialog />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ScrollToTop />
        <AppRoutes />
      </ErrorBoundary>
    </SocketProvider>
  );
};

export default App;
