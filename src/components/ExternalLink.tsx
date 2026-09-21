import { ExternalLinkIcon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
};

export function ExternalLink({ href, children }: ExternalLinkProps) {
  const safeHref = href.startsWith("[") ? "#" : href;

  return (
    <a className="inline-link" href={safeHref} target={safeHref === "#" ? undefined : "_blank"} rel="noreferrer">
      <span>{children}</span>
      <ExternalLinkIcon aria-hidden="true" />
    </a>
  );
}
