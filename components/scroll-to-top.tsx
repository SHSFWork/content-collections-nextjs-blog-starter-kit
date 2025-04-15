"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const scrollToTop = () => window.scroll({ top: 0, behavior: "smooth" });
  return (
    <Button
      size="icon"
      variant="outline"
      title="Scroll back to the top"
      className="border border-dashed"
      onClick={scrollToTop}
    >
      <ChevronUp className="hover:stroke-[3]" />
    </Button>
  );
};

export default ScrollToTop;
