"use client";

import { ListManager } from "./ListManager";
import type { BlogPost } from "@/lib/cms";
import { addBlogPostAction, updateBlogPostAction, deleteBlogPostAction, reorderBlogPostsAction } from "@/lib/actions";

export default function BlogPostsManager({ initialPosts }: { initialPosts: BlogPost[] }) {
  return (
    <ListManager
      title="Blog Posts"
      description="Posts shown on the Blog page and the homepage blog preview (first 3 published posts)."
      items={initialPosts}
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "date_label", label: "Date label", type: "text" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
      ]}
      emptyDefaults={{ title: "", date_label: "", excerpt: "" }}
      createAction={(input) => addBlogPostAction({ title: input.title, excerpt: input.excerpt, date_label: input.date_label })}
      updateAction={(id, patch) => updateBlogPostAction(id, patch)}
      deleteAction={(id) => deleteBlogPostAction(id)}
      reorderAction={(ids) => reorderBlogPostsAction(ids)}
    />
  );
}
