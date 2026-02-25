declare module "*.mdx" {
  import type { ComponentType } from "react";
  const MDXComponent: ComponentType;
  export default MDXComponent;

  // Frontmatter exports from remark-mdx-frontmatter
  export const title: string;
  export const author: string;
  export const genre: string;
  export const month: string;
  export const pageCount: number;
  export const readerCount: number;
  export const isCurrent: boolean;
  export const color: string;
  export const meetingDate: string;
  export const coverImage: string | undefined;
  export const description: string;
  export const discussionQuestions: string[];
}
