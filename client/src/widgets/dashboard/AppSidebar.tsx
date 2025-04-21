import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarFooter,
} from "@/src/shared/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui/avatar";
import { useAppSelector, useAppDispatch } from "@/src/shared/redux/hooks";

import { logout } from "@/src/entities/auth/model/authThunks";
import { selectAuthError,selectCurrentUser,selectAuthLoading } from "@/src/entities/auth/model/authSlice";
import { useFetchChats } from "../chat/lib/useFetchChats";
import { IChat } from "@/src/features/chat/models/types";


import { toast } from "sonner";
import SidebarSkeleton from "@/src/features/dashboard/SidebarSkeleton";
import SidebarItem from "@/src/features/dashboard/SidebarItems";
export function AppSidebar() {
  const user = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const { chats, loading: chatLoading, error: chatError } = useFetchChats();
  const dispatch = useAppDispatch();



  if (error) toast(error);


  if (chatLoading || loading || !user) {
    return (
     <SidebarSkeleton/>
    );
  }

  if (chatError) toast(chatError);


  const handleLogout = async () => {
    dispatch(logout());
  };


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <Link
            href="/"
            className="mb-2 ml-2 mt-2 block text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            + New chat
          </Link>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats &&
                chats.map((chat: IChat) => (
                    <SidebarItem chat={chat} key={chat.id} />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <div style={{display:'flex', justifyContent:"space-between", padding:"0 1rem 0 1rem"}}>
          <Link href="/me">
            <Avatar>
              <AvatarImage src={user.picture} />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          </Link>

          <button onClick={handleLogout}>
            {loading ? "Logging out..." : "Logout"}
          </button>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
