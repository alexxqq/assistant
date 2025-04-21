import React from 'react'
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/src/shared/ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/src/shared/ui/dropdown-menu'
import Link from 'next/link'
import { Inbox, MoreHorizontalIcon } from 'lucide-react'

import UpdateModal from "@/src/features/dashboard/UpdateModal";
import DeleteModal from './DeleteModal'

type Props = {chat:{id:string, title:string}}
export default function SidebarItem({chat}: Props) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenuItem key={chat.id}>
    <SidebarMenuButton asChild>
      <Link href={`/c/${chat.id}`}>
        <Inbox />
        <span>{chat.title}</span>
      </Link>
    </SidebarMenuButton>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction
          showOnHover
          className="rounded-sm data-[state=open]:bg-accent"
        >
          <MoreHorizontalIcon />
          <span className="sr-only">More</span>
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-24 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align={isMobile ? "end" : "start"}
      >
        <UpdateModal chatId={chat.id}/>
        <DeleteModal chatId={chat.id}/>
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarMenuItem>
  )
}