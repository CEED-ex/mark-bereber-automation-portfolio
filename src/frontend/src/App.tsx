import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { CursorFollower } from "./components/CursorFollower";
import { Footer } from "./components/Footer";
import { GlobalBackground } from "./components/GlobalBackground";
import { Navbar } from "./components/Navbar";
import { StickyAuditBar } from "./components/StickyAuditBar";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";

// Stamps data-scrolling on <body> while the user is actively scrolling.
// CSS uses this to cut backdrop-filter blur cost during scroll.
function ScrollBlurReducer() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      document.body.setAttribute("data-scrolling", "1");
      clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.removeAttribute("data-scrolling");
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);
  return null;
}

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col relative">
      <ScrollBlurReducer />
      {/* Global particle background — visible on every page */}
      <GlobalBackground />
      <Navbar />
      <main className="flex-1 relative z-10 pt-16 pb-16">
        <Outlet />
      </main>
      <Footer />
      <StickyAuditBar />
      <Toaster richColors position="top-right" />
      {/* Custom cursor follower — disabled on touch devices */}
      <CursorFollower />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const caseStudiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case-studies",
  component: CaseStudiesPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  caseStudiesRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
