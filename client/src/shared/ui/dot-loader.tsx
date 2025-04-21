import React from "react";

const DotLoader = () => (
  <div className="flex items-center space-x-1">
    <span className="animate-bounce [animation-delay:0ms]">.</span>
    <span className="animate-bounce [animation-delay:150ms]">.</span>
    <span className="animate-bounce [animation-delay:300ms]">.</span>
  </div>
);

export default DotLoader;
