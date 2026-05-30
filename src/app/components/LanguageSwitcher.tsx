"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    
    startTransition(() => {
      // Basic fallback for next-intl routing if there is no wrapper
      // Pathname generally looks like /en/salary-calculator or /salary-calculator
      let newPathname = pathname;
      
      const locales = ['en', 'tl', 'ceb'];
      const pathParts = pathname.split('/');
      
      // Check if the first path segment is a locale
      if (locales.includes(pathParts[1])) {
        pathParts[1] = nextLocale;
        newPathname = pathParts.join('/');
      } else {
        // If it's a default locale without a prefix, inject the new locale
        newPathname = `/${nextLocale}${pathname}`;
      }
      
      router.replace(newPathname);
    });
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <select
        value={locale}
        onChange={onSelectChange}
        disabled={isPending}
        style={{
          appearance: "none",
          backgroundColor: "var(--surface-color, #f4f4f5)",
          border: "1px solid var(--border-color, #e4e4e7)",
          borderRadius: "6px",
          padding: "6px 28px 6px 12px",
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--text-primary, #18181b)",
          cursor: isPending ? "not-allowed" : "pointer",
          outline: "none",
          opacity: isPending ? 0.7 : 1,
        }}
      >
        <option value="en">English</option>
        <option value="tl">Tagalog</option>
        <option value="ceb">Bisaya</option>
      </select>
      <div 
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: "var(--text-secondary, #71717a)"
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
  );
}
