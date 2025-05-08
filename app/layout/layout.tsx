import { Outlet } from "react-router";
import { AuthProvider } from "~/contexts/AuthContext";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
  return (
    <AuthProvider>
      <div className="layout-main">
        <div className="layout-container">
          <div className="sticky top-0 z-50">
            <Header />
          </div>
          <main className="layout-content responsive-padding-layout">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}
