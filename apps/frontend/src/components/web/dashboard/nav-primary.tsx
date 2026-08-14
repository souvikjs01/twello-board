import type { NavPrimaryProps } from "#/lib/types";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

export function NavPrimary({ items }: NavPrimaryProps) {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item, idx) => {
                        return (
                            <SidebarMenuItem key={idx}>
                                <SidebarMenuButton asChild size="sm">
                                    <Link
                                        to={item.to}
                                        activeOptions={item.activeOptions}
                                        activeProps={{
                                            "data-active": true,
                                        }}
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
