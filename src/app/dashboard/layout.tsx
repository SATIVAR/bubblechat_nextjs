"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { FileText, History, Code, Settings, BotMessageSquare } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Gerar Cotação", icon: FileText },
  { href: "/dashboard/history", label: "Histórico", icon: History },
  { href: "/dashboard/widget", label: "Widget", icon: Code },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground p-2 rounded-lg">
               <BotMessageSquare className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-headline font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              DocuQuota
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label }}
                    className="font-medium"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader />
        <main className="p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
