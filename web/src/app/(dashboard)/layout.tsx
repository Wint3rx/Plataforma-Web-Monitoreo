"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Thermometer, 
  LineChart, 
  Users, 
  Menu, 
  LogOut,
  User
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Temperatura", href: "/temperatura", icon: Thermometer },
  { name: "Predicciones", href: "/predicciones", icon: LineChart },
  { name: "Accesos", href: "/accesos", icon: Users },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <h2 className="text-lg font-bold text-primary">IoT Server Room</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <span className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive ? "bg-secondary/20 text-secondary" : "hover:bg-muted text-muted-foreground"
                }`}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-card border-b border-border">
          <div className="flex items-center gap-4">
            {/* Botón menú móvil */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold capitalize text-primary">
              {pathname.replace('/', '') || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Admin</span>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Cerrar Sesión</span>
            </Button>
          </div>
        </header>

        {/* Sidebar - Móvil (Colapsable) */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-card">
            <nav className="p-2 space-y-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <span className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    pathname === item.href ? "bg-secondary/20 text-secondary" : "text-muted-foreground"
                  }`}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}