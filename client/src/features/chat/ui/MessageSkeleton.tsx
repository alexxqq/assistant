import React from "react";
import { Container, MessageContainer, ScrollWrapper } from "./message-style";
import { Skeleton } from "@/src/shared/ui/skeleton";

export default function MessageSkeleton() {
  return (
    <Container>
      <ScrollWrapper>
        {[...Array(6)].map((_, index) => (
          <MessageContainer key={index} $isUser={index % 2 === 0}>
            <Skeleton className="w-[60%] h-[80px] rounded-lg" />
          </MessageContainer>
        ))}
      </ScrollWrapper>
      <Skeleton className="w-[100%] h-[40px] rounded-lg mb-4" />
    </Container>
  );
}
