import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { Loader2 } from "lucide-react";

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

  // TanStack Query handles the initial auth check automatically on mount
  const { isLoading } = useAuthQuery();

  // Show a loading screen with a spinner during initial auth check
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#02000a] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-sm font-bold text-gray-400 animate-pulse">Initializing KRM Esports...</p>
      </div>
    );
  }

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
