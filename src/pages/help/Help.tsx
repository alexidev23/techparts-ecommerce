import AccordionItemsHelp from "@/components/AccordionItemsHelp";
import HelpItems from "@/components/HelpItems";
import { helpAccordion, helpTopics } from "@/data/helpData";
import { Link } from "react-router-dom";

export default function Help() {
  return (
    <main id="help" className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <header className="h-60 flex flex-col items-center justify-center text-center px-6 border-b bg-muted">
        <h1 className="text-4xl md:text-6xl font-light">Centro de Ayuda</h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">
          Encuentra respuestas a las preguntas más frecuentes y aprende más
          sobre nuestros servicios.
        </p>
      </header>

      {/* TOPICS */}
      <section
        aria-labelledby="help-topics-title"
        className="py-20 px-6 md:px-10"
      >
        <h2
          id="help-topics-title"
          className="text-2xl font-semibold text-center mb-10"
        >
          ¿En qué podemos ayudarte?
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {helpTopics.map((topic) => (
            <li key={topic.id}>
              <HelpItems
                title={topic.title}
                description={topic.description}
                item={topic.icon}
                modal={topic.modal}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="py-20 px-6 bg-muted">
        <h2 id="faq-title" className="text-2xl font-semibold text-center mb-10">
          Preguntas Frecuentes
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {helpAccordion.map((item) => (
            <AccordionItemsHelp
              key={item.id}
              item={`item-${item.id}`}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        aria-labelledby="support-title"
        className="py-20 px-6 text-center bg-primary text-primary-foreground"
      >
        <h2 id="support-title" className="text-3xl md:text-4xl font-semibold">
          ¿Aún tienes dudas?
        </h2>

        <p className="mt-4 max-w-xl mx-auto text-base md:text-lg opacity-90">
          Nuestro equipo está listo para ayudarte.
        </p>

        <Link
          to="/contact"
          className="inline-block mt-8 rounded-md bg-background px-6 py-3 font-medium text-primary transition-colors hover:bg-muted dark:text-white"
        >
          Contactar Soporte
        </Link>
      </section>
    </main>
  );
}
