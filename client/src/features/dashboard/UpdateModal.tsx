import React, { useState } from 'react'
import {  DropdownMenuItem } from '@/src/shared/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/src/shared/ui/dialog'
import { Button } from '@/src/shared/ui/button'
import { Label } from '@/src/shared/ui/label'
import { Input } from '@/src/shared/ui/input'
import { updateChatTitle } from '@/src/entities/chat'
import { useAppDispatch } from '@/src/shared/redux/hooks'
type Props = {chatId:string}

export default function UpdateModal({chatId}: Props) {
    const dispatch = useAppDispatch();

    const [newTitle, setNewTitle] = useState();
    const handleUpdateChatTitle = async (chatId: string) => {
        if (newTitle) {
          dispatch(updateChatTitle({ chatId, title: newTitle }));
        }
      };
  return (
    <DropdownMenuItem asChild>
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full px-2 py-1 text-left text-sm hover:bg-gray-100 hover:text-gray-900 rounded transition-colors">
          Rename
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit chat title</DialogTitle>
          <DialogDescription>
            Change the chat title and save when you are
            done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={newTitle}
              onChange={(e: any) =>
                setNewTitle(e.target.value)
              }
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => handleUpdateChatTitle(chatId)}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </DropdownMenuItem>
  )
}