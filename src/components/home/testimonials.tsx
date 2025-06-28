export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "Senior Tech Lead",
      initials: "JD",
      content: "Ardana's technical expertise and problem-solving skills are exceptional. He consistently delivers high-quality solutions and is a valuable team collaborator."
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "Product Manager",
      initials: "SM",
      content: "Working with Ardana has been a pleasure. His attention to detail and ability to translate complex requirements into elegant solutions is remarkable."
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "CTO",
      initials: "MJ",
      content: "Ardana brings both technical depth and strategic thinking to every project. His code quality and architectural decisions have significantly improved our platform."
    }
  ]

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8">Some Words</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-lg font-semibold">{testimonial.initials}</span>
              </div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              &quot;{testimonial.content}&quot;
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}