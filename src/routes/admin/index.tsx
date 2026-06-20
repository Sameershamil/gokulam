import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { adminLogin } from "@/lib/api/siteData.functions";
import { Plane, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

// Keep simple client-side check using sessionStorage (server-side validation on actions)
const AUTH_KEY = "gokulam_admin_auth";
function isAdminLoggedIn() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

export const Route = createFileRoute("/admin/")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn()) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await adminLogin({ data: { password } });
      if (result.success) {
        sessionStorage.setItem(AUTH_KEY, "1");
        navigate({ to: "/admin/dashboard" });
      } else {
        setError(result.error || "Incorrect password. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent/60 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white/20 grid place-items-center">
            <Plane className="w-6 h-6 text-white -rotate-45" />
          </div>
          <div className="text-white">
            <div className="font-extrabold text-xl tracking-tight">GOKULAM</div>
            <div className="text-[10px] tracking-[0.25em] text-white/70">HOLIDAYS · ADMIN</div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
              <p className="text-sm text-muted-foreground">Sign in to manage your website</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground/80 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Default password: <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">gokulam2024</code>
          </p>
        </div>

        <p className="text-center text-white/60 text-xs mt-6">
          <a href="/" className="hover:text-white transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  );
}
