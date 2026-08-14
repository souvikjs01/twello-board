import * as React from "react"
import {
    PanelsTopLeft,
    Building2,
} from "lucide-react"
import { NavPrimary } from "#/components/web/dashboard/nav-primary"
import { NavUser } from "#/components/web/dashboard/navbar"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Link, linkOptions } from "@tanstack/react-router"
import type { NavPrimaryProps } from "#/lib/types"

const navItems: NavPrimaryProps["items"] = linkOptions([
    {
        title: "Organization",
        to: "/dashboard/organization",
        icon: Building2,
        activeOptions: { exact: false }
    }
])

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/dashboard" className="flex items-center gap-3">
                                <div className="flex aspect-square bg-blue-500 text-white size-8 items-center justify-center rounded-lg">
                                    <PanelsTopLeft className="size-4" />
                                </div>

                                <div className=" grid flex-1 text-left text-sm leading-tight">
                                    <span className=" font-medium">Plannr</span>
                                    <span className="text-xs">Organize work. Ship faster.</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavPrimary items={navItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
