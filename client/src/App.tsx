
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
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
import SendNotification from "./pages/SendNotification";
import NotFound from "./pages/NotFound";
import KurirMobile from "./pages/KurirMobile";
import ApprovalRequests from "./pages/ApprovalRequests";
import { AuthProvider } from "./contexts/Auth";
import { WorkflowProvider } from "./contexts/WorkflowContextSimple";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DevStatus } from "./components/DevStatus";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WorkflowProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes with role-based access */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Master Admin only routes */}
              <Route path="/manage-admin" element={
                <ProtectedRoute allowedRoles={['master_admin']}>
                  <ManageAdmin />
                </ProtectedRoute>
              } />
              
              <Route path="/manage-pic" element={
                <ProtectedRoute allowedRoles={['master_admin']}>
                  <ManagePIC />
                </ProtectedRoute>
              } />
              
              <Route path="/manage-kurir" element={
                <ProtectedRoute allowedRoles={['master_admin', 'admin']}>
                  <ManageKurir />
                </ProtectedRoute>
              } />
              
              <Route path="/approval" element={
                <ProtectedRoute allowedRoles={['master_admin']}>
                  <Approval />
                </ProtectedRoute>
              } />
              
              {/* Admin and Master Admin routes */}
              <Route path="/approval-requests" element={
                <ProtectedRoute allowedRoles={['master_admin', 'admin']}>
                  <ApprovalRequests />
                </ProtectedRoute>
              } />
              
              <Route path="/reports" element={
                <ProtectedRoute allowedRoles={['master_admin', 'admin']}>
                  <Reports />
                </ProtectedRoute>
              } />
              
              <Route path="/send-notification" element={
                <ProtectedRoute allowedRoles={['master_admin', 'admin']}>
                  <SendNotification />
                </ProtectedRoute>
              } />
              
              {/* PIC and above routes */}
              <Route path="/attendance" element={
                <ProtectedRoute allowedRoles={['master_admin', 'admin', 'pic']}>
                  <Attendance />
                </ProtectedRoute>
              } />
              
              <Route path="/performance" element={
                <ProtectedRoute allowedRoles={['master_admin', 'admin', 'pic']}>
                  <Performance />
                </ProtectedRoute>
              } />
              
              <Route path="/notifications" element={
                <ProtectedRoute allowedRoles={['master_admin', 'admin', 'pic']}>
                  <Notifications />
                </ProtectedRoute>
              } />
              
              <Route path="/approval-status" element={
                <ProtectedRoute allowedRoles={['master_admin', 'admin', 'pic']}>
                  <ApprovalStatus />
                </ProtectedRoute>
              } />
              
              {/* All authenticated users routes */}
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              
              {/* Kurir specific route */}
              <Route path="/kurir-mobile" element={
                <ProtectedRoute allowedRoles={['kurir']}>
                  <KurirMobile />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <DevStatus />
          </BrowserRouter>
        </TooltipProvider>
      </WorkflowProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
