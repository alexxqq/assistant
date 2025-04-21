'use client'
import React from 'react';
import styled from 'styled-components';
import { InputFile } from '@/src/features/chat/ui/FileInput';
import { selectUploadLoading} from '@/src/entities/chat/model/chatSlice';
import { uploadFile } from '@/src/entities/chat';
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from '@/src/shared/redux/hooks';
import { fetchChats } from '@/src/entities/chat';
import { toast } from "sonner"
import UploadLoader from '@/src/features/chat/ui/UploadLoader';
import { Label } from '@/src/shared/ui/label';


const Wrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

export default function Upload() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const uploadLoading = useAppSelector(selectUploadLoading);

  const handleUpload = (file: File) => {
    dispatch(uploadFile(file)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        const chatId = res.payload.chat_id;
        router.push(`/c/${chatId}`);
        dispatch(fetchChats());
      }else if (res.meta.requestStatus === "rejected") {
        
        let errorDetail = "Something went wrong during upload.";
        try {
          const parsed = JSON.parse(res.payload);
          errorDetail = parsed.detail || errorDetail;
        } catch (e) {
          console.error("Failed to parse error payload:", e);
        }
      
        toast(errorDetail);
      }
    });
  };

  return (
    <Wrapper>
      <Label className='text-lg'>What do you want to discuss?</Label>
      {uploadLoading ? ( <UploadLoader/>) : (
        <InputFile confirm={handleUpload} />
      )}
    </Wrapper>
  );
}
