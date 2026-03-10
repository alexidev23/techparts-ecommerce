import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

import AccordionItemsHelp from "@/components/AccordionItemsHelp";
import HelpItems from "@/components/HelpItems";
import { helpAccordion, helpTopics } from "@/data/helpData";

export default function Help() {
  return (
    <>
      <Helmet>
        <title>Centro de Ayuda | Tu Tienda</title>
        <meta
          name="description"
          content="Encontrá respuestas a las preguntas más frecuentes sobre envíos, garantías y devoluciones. Nuestro equipo está listo para ayudarte."
        />
        <link rel="canonical" href="https://tutienda.com/ayuda" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Centro de Ayuda | Tu Tienda" />
        <meta
          property="og:description"
          content="Encontrá respuestas a las preguntas más frecuentes sobre envíos, garantías y devoluciones."
        />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground">
        {/* Hero */}
        <header className="flex h-60 flex-col items-center justify-center border-b bg-muted px-6 text-center">
          <h1 className="text-4xl font-light md:text-6xl">Centro de Ayuda</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Encuentra respuestas a las preguntas más frecuentes y aprende más
            sobre nuestros servicios.
          </p>
        </header>

        {/* Topics */}
        <section
          aria-labelledby="help-topics-title"
          className="px-6 py-20 md:px-10"
        >
          <h2
            id="help-topics-title"
            className="mb-10 text-center text-2xl font-semibold"
          >
            ¿En qué podemos ayudarte?
          </h2>
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 list-none p-0">
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
        <section aria-labelledby="faq-title" className="bg-muted px-6 py-20">
          <h2
            id="faq-title"
            className="mb-10 text-center text-2xl font-semibold"
          >
            Preguntas Frecuentes
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
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
          className="bg-primary px-6 py-20 text-center text-primary-foreground"
        >
          <h2 id="support-title" className="text-3xl font-semibold md:text-4xl">
            ¿Aún tienes dudas?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base opacity-90 md:text-lg">
            Nuestro equipo está listo para ayudarte.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <a href="#contacto">Contactar Soporte</a>
          </Button>
        </section>
      </main>
    </>
  );
}
