"use client";

import { store } from "@/lib/store";
import { Provider as ReduxProvider } from "react-redux";
import { CalendarProvider } from "@/feature/CalendarContext";
import IsLoginProvider from "@/feature/context/IsLoginContext";

interface ChildrenProps {
  children: React.ReactNode;
}

function ClientMiddleware({ children }: ChildrenProps) {
  return (
    <IsLoginProvider>
      <CalendarProvider>{children}</CalendarProvider>
    </IsLoginProvider>
  );
}

export default function Providers({ children }: ChildrenProps) {
  return (
    <ReduxProvider store={store}>
      <ClientMiddleware>{children}</ClientMiddleware>
    </ReduxProvider>
  );
}
