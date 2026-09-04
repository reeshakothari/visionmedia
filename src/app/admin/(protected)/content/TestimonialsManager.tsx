"use client";

import { ListManager } from "./ListManager";
import type { Testimonial } from "@/lib/cms";
import { addTestimonialAction, updateTestimonialAction, deleteTestimonialAction, reorderTestimonialsAction } from "@/lib/actions";

export default function TestimonialsManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  return (
    <ListManager
      title="Reviews"
      description="Client reviews shown in the homepage testimonials section."
      items={initialTestimonials}
      fields={[
        { name: "quote", label: "Quote", type: "textarea" },
        { name: "author", label: "Name", type: "text" },
        { name: "role", label: "Role / Company", type: "text" },
      ]}
      emptyDefaults={{ quote: "", author: "", role: "" }}
      createAction={(input) => addTestimonialAction({ quote: input.quote, author: input.author, role: input.role })}
      updateAction={(id, patch) => updateTestimonialAction(id, patch)}
      deleteAction={(id) => deleteTestimonialAction(id)}
      reorderAction={(ids) => reorderTestimonialsAction(ids)}
    />
  );
}
