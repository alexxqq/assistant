'use client'

import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  background: linear-gradient(to right, #f0f4f8, #d9e2ec);

  html.dark & {
    background: linear-gradient(to right, #1a1a1a, #2a2a2a);
  }
`

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  
  background: white;
  color: black;

  html.dark & {
    background: #1e1e1e;
    color: #f1f1f1;
  }
`

export default function AuthLayout({ children }: Props) {
  return (
    <Container>
      <Card>{children}</Card>
    </Container>
  )
}
