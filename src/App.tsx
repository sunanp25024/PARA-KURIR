
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ManageAdmin from "./pages/ManageAdmin";
import ManagePIC from "./pages/ManagePIC";
import ManageKurir from "./pages/ManageKurir";
import Attendance from "./pages/Attendance";
import Performance from "./pages/Performance";
import Settings from "./pages/Settings";
import Approval from "./pages/Approval";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import ApprovalStatus from "./pages/ApprovalStatus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manage-admin" element={<ManageAdmin />} />
          <Route path="/manage-pic" element={<ManagePIC />} />
          <Route path="/manage-kurir" element={<ManageKurir />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/approval" element={<Approval />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/approval-status" element={<ApprovalStatus />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
