import { ReactNode } from "react";
import { Flex } from "@/components/ui/flex";
import { DocsHeader } from "./header";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocsHeader style={{ height: "4rem" }} />
      <Flex style={{ height: "calc(100vh - 4rem)" }}>{children}</Flex>
    </>
  );
}
