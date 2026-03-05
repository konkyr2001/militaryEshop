import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function NoPage() {
  return <Navigate to="/error" replace />
}
