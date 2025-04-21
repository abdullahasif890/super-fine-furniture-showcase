import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-white shadow-sm">
      <nav className="container mx-auto flex justify-between items-center h-16 px-4 md:px-8">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          My Store
        </Link>
        <div className="flex gap-4">
          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "font-semibold text-blue-600"
                : "hover:text-blue-600"
            }
          >
            Home
          </Link>
          <Link
            to="/catalog"
            className={
              location.pathname === "/catalog"
                ? "font-semibold text-blue-600"
                : "hover:text-blue-600"
            }
          >
            Catalog
          </Link>
          <Link
            to="/notes"
            className={
              location.pathname === "/notes"
                ? "font-semibold text-blue-600"
                : "hover:text-blue-600"
            }
          >
            Notes
          </Link>
          {user ? (
            <Button variant="outline" size="sm" onClick={signOut}>
              Logout
            </Button>
          ) : (
            <Link
              to="/admin"
              className={
                location.pathname === "/admin"
                  ? "font-semibold text-blue-600"
                  : "hover:text-blue-600"
              }
            >
              Admin
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
