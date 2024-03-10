import { HTMLAttributes } from "react";

interface AnchorProps extends HTMLAttributes<HTMLHeadingElement> {}

export function Anchor({ id }: AnchorProps) {
  return <a id={id} />;
}
