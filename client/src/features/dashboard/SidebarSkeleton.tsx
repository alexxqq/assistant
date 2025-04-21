import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/src/shared/ui/sidebar'
import { Skeleton } from '@/src/shared/ui/skeleton'
import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'


export default function SidebarSkeleton() {
  return (
    <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[...Array(10)].map((_, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <Skeleton className="w-[230px] h-[40px] rounded-md" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarFooter>
            <Avatar>
              <Skeleton className="w-[80px] h-[80px] rounded-full" />
            </Avatar>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
  )
}