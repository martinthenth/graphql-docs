import { HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { H3 } from "@/components/ui/typography";

interface DocsHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function DocsHeader({ style }: DocsHeaderProps) {
  return (
    <header className="px-4 border-b" style={style}>
      <Flex items="center" justify="between" className="h-full">
        <Flex items="center">
          <Button href="/" variant="minimal">
            <H3>GraphQL API</H3>
          </Button>
        </Flex>
        <Flex gap="sm" items="center">
          <Button href="/api" variant="minimal">
            API
          </Button>
          <Button href="/pricing" variant="minimal">
            Pricing
          </Button>
          <Button href="/signin" variant="minimal">
            Sign in
          </Button>
        </Flex>
      </Flex>
    </header>
  );
}
