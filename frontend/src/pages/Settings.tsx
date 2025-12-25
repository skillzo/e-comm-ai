import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getBaseUrl, setBaseUrl, getCurrentBaseUrl } from "../utils/baseUrl";
import { api } from "../utils/api";

export default function Settings() {
  const [baseUrl, setBaseUrlState] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load persisted BASE_URL on mount
  useEffect(() => {
    const currentUrl = getCurrentBaseUrl();
    // Remove /api suffix for display
    const displayUrl = currentUrl.replace(/\/api$/, "");
    setBaseUrlState(displayUrl);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      // Update persisted value
      setBaseUrl(baseUrl);

      // Update API client
      const finalUrl =
        baseUrl.trim() === ""
          ? "http://localhost:3000/api"
          : baseUrl.trim().endsWith("/api")
          ? baseUrl.trim()
          : baseUrl.trim() + "/api";

      api.setBaseUrl(finalUrl);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBaseUrlState("http://localhost:3000");
    setBaseUrl("");
    api.setBaseUrl("http://localhost:3000/api");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-background-light text-text-light min-h-screen">
      <Header />
      <main className="max-w-lg mx-auto px-4 mt-[10%]">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600 mb-6">
            Configure API base URL for backend connection
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              Settings updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="baseUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                API Base URL
              </label>
              <input
                id="baseUrl"
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrlState(e.target.value)}
                placeholder="http://localhost:3000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current: {getCurrentBaseUrl()}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Leave empty to use default: http://localhost:3000/api
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-black text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Settings"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Reset
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-black font-medium"
            >
              ← Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
