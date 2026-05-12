"use client";

import { useChat } from "./ChatContext";
import AIChatButton from "./AIChatButton";
import AIChatDialog from "./AIChatDialog";

export default function ChatWrapper() {
  const { isOpen, toggle, close } = useChat();

  return (
    <>
      <AIChatButton onClick={toggle} />
      <AIChatDialog open={isOpen} onClose={close} />
    </>
  );
}
