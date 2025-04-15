"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

type Props = {
  text: string;
};

const CopyButton = ({ text }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 700);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn("size-4 !bg-transparent !text-white")}
      disabled={isCopied}
      onClick={copy}
      aria-label="Copy"
    >
      <span className="sr-only">Copy</span>
      {isCopied ? <Check className="text-emerald-300" /> : <Clipboard />}
    </Button>
  );
};

export default CopyButton;
