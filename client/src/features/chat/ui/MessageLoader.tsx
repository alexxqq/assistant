import React from 'react'
import { MessageBubble, MessageContainer } from './message-style'


export default function MessageLoader() {
  return (
    (
        <MessageContainer $isUser={false}>
          <MessageBubble $isUser={false}>
            <div className="flex items-center space-x-1">
              <span className="animate-bounce [animation-delay:0ms]">.</span>
              <span className="animate-bounce [animation-delay:150ms]">.</span>
              <span className="animate-bounce [animation-delay:300ms]">.</span>
            </div>
          </MessageBubble>
        </MessageContainer>
      )
  )
}