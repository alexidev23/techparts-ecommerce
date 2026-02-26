import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface AccordionItemsHelpProps {
  item: string;
  title: string;
  description: string;
}

export default function AccordionItemsHelp({
  item,
  title,
  description,
}: AccordionItemsHelpProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-4xl bg-white mx-auto px-4 dark:bg-gray-950 dark:border-gray-600 rounded-md border"
    >
      <AccordionItem value={item}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className="text-gray-700 dark:text-gray-300">
          {description}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
