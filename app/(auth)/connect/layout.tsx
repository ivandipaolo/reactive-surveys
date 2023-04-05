'use client';

import ConnectedTemplate from "@/components/AppTemplate";

export default function ConnectLayout({
  children, 
}: {
  children: React.ReactNode,
}) {
  return (
    <section>
      {children}
    </section>
  );
}