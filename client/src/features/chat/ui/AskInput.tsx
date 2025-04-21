import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding: 0 0 1rem 0;
  gap: 1rem;
`;

export function AskInput({
  value,
  confirm,
  onChange,
}: {
  value: string;
  confirm: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Ask anything..."
        onChange={onChange}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            confirm();
          }
        }}
      />
      <Button
      disabled={value.trim() === ""}
        onClick={confirm}

      >
        Send
      </Button>
    </Wrapper>
  );
}
