"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <button onClick={copy} className="btn-ghost font-mono !text-[13px]">
      {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
      <span className="max-w-[60vw] truncate">{copied ? "Copied to clipboard" : email}</span>
    </button>
  );
}
