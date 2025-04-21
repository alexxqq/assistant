import { Loader } from "lucide-react";
import React from "react";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;
export default function UploadLoader() {
  return (
    <LoaderWrapper>
      <Loader className="animate-spin" size={48} />
      <span style={{ marginLeft: "10px" }}>Uploading...</span>
    </LoaderWrapper>
  );
}
