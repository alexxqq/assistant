import { deleteChat } from '@/src/entities/chat';
import { useAppDispatch } from '@/src/shared/redux/hooks';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/src/shared/ui/alert-dialog'
type Props = { chatId: string}

export default function DeleteModal({chatId}: Props) {
    const dispatch = useAppDispatch();
    const handleDeleteChat = async (chatId: string) => {
        dispatch(deleteChat(chatId));
      };
  return (
    <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="w-full px-2 py-1 text-left text-sm text-red-600 hover:bg-red-100 hover:text-red-800 rounded transition-colors">
              Delete
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the chat and all
                associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteChat(chatId)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
  )
}