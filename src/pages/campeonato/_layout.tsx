import { ReactNode } from "react";
import CSNavbar from "@/components/cs/CSNavbar";
import CSFooter from "@/components/cs/CSFooter";

export default function CampeonatoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="cs-root min-h-screen bg-cs-bg-primary text-cs-text-primary font-cs-body relative overflow-x-hidden">
      <div className="cs-scanlines pointer-events-none fixed inset-0 z-[1]" aria-hidden />
      <CSNavbar />
      <main className="relative z-[2] pt-16">{children}</main>
      <CSFooter />
    </div>
  );
}
