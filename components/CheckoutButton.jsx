import { useState } from "react";
import { useRouter } from "next/router";

export default function CheckoutButton({ slug, tierId, label, className }) {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleClick = async () => {
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, tierId }),
      });

      if (response.status === 401) {
        router.push(`/login?callbackUrl=${encodeURIComponent(router.asPath)}`);
        return;
      }

      if (!response.ok) {
        const { error: message } = await response.json().catch(() => ({}));
        throw new Error(message || "Something went wrong. Please try again.");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (submitError) {
      setStatus("error");
      setError(submitError.message);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleClick} disabled={status === "submitting"} className={className}>
        {status === "submitting" ? "Redirecting…" : label}
      </button>
      {error ? <p className="mt-2 text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
