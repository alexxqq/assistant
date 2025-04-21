import styled from "styled-components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
import { User } from "../models/types";

interface Props {
  user: User;
}

const Container = styled.div`
  padding: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 9999px;
`;

const InfoText = styled.p`
  text-align: center;
  margin: 0.25rem 0;
  strong {
    font-weight: 600;
  }
`;

export const UserCard = ({ user }: Props) => {
  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>User Info</CardTitle>
          <CardDescription>Basic profile information</CardDescription>
        </CardHeader>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {user.picture && (
            <Avatar src={user.picture} alt={user.name || "User"} />
          )}
          <div>
            <InfoText>{user.name}</InfoText>
            <InfoText>{user.email}</InfoText>
          </div>
        </CardContent>
        <CardFooter
          style={{
            justifyContent: "center",
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          Logged in successfully
        </CardFooter>
      </Card>
    </Container>
  );
};
