import { FileTextIcon } from "@radix-ui/react-icons";
import type { LinkItem } from "../types";

type DocumentLinkProps = {
  item: LinkItem;
};

export function DocumentLink({ item }: DocumentLinkProps) {
  return (
    <a className="document-link" href={item.href}>
      <FileTextIcon aria-hidden="true" />
      <span>{item.label}</span>
    </a>
  );
}
