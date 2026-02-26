import {
  CreditCard,
  Headphones,
  Package,
  RotateCw,
  Shield,
  Truck,
} from "lucide-react";

export const helpTopics = [
  {
    id: 1,
    title: "Pedidos y Pagos",
    description:
      "Información sobre cómo realizar pedidos y métodos de pago disponibles",
    icon: Package,
    modal: [
      {
        title: "Pedidos y Pagos",
      },
      {
        title: "¿Cómo realizar un pedido?",
        description: [
          "1. Navega por nuestro catálogo y busca los productos que necesitas",
          "2. Haz clic en 'Agregar al carrito' en los productos que desees",
          "3. Revisa tu carrito y actualiza cantidades si es necesario",
          "4. Procede al checkout y completa tus datos de envío",
          "5. Selecciona tu método de pago preferido",
          "6. Confirma tu pedido y recibirás un email de confirmación",
        ],
      },
      {
        title: "¿Puedo modificar mi pedido?",
        description:
          "Puedes modificar o cancelar tu pedido dentro de las primeras 2 horas después de realizado. Contacta a nuestro equipo de soporte lo antes posible. Una vez que el pedido está en proceso de preparación, no podremos modificarlo.",
      },
      {
        title: "¿Recibiré confirmación de mi compra?",
        description:
          "Sí, recibirás un email de confirmación inmediatamente después de realizar tu pedido, otro cuando sea despachado con el código de seguimiento, y una notificación cuando esté en camino a tu domicilio.",
      },
      {
        title: "Facturación",
        description:
          "Todas las compras incluyen factura electrónica. Si necesitas factura A o datos fiscales específicos, indícalo en las notas del pedido o contacta a soporte dentro de las 24 horas.",
      },
    ],
  },
  {
    id: 2,
    title: "Envíos",
    description:
      "Conoce nuestras opciones de envío, tiempos de entrega y costos",
    icon: Truck,
    modal: [
      { title: "Envíos" },
      {
        title: "Tiempos de entrega",
        description: [
          "• CABA y GBA: 24-48 horas hábiles",
          "• Interior (ciudades principales): 3-5 días hábiles",
          "• Resto del país: 5-7 días hábiles",
          "• Zonas remotas: 7-10 días hábiles",
        ],
      },
      {
        title: "Costos de envío",
        description: [
          "• Envío gratis en compras superiores a $50.000",
          "• CABA y GBA: $2.500",
          "• Interior del país: $3.500 - $5.000 según zona",
          "El costo exacto se calcula automáticamente en el checkout según tu código postal.",
        ],
      },
      {
        title: "Seguimiento de envío",
        description:
          "Recibirás un número de tracking por email una vez despachado tu pedido. Podrás seguir el estado de tu envío en tiempo real a través del correo o nuestra web.",
      },
      {
        title: "Punto de retiro",
        description:
          "También puedes retirar tu pedido gratis en nuestro depósito en Buenos Aires. Te notificaremos cuando esté listo para retirar (usualmente 24 horas).",
      },
    ],
  },
  {
    id: 3,
    title: "Devoluciones",
    description: "Política de devoluciones y cómo iniciar un proceso de cambio",
    icon: RotateCw,
    modal: [
      { title: "Devoluciones y Cambios" },
      {
        title: "Política de devolución",
        description:
          "Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del producto. El artículo debe estar sin uso, en su empaque original y con todos los accesorios incluidos.",
      },
      {
        title: "¿Cómo iniciar una devolución?",
        description: [
          "1. Contacta a nuestro equipo de soporte",
          "2. Proporciona tu número de pedido y motivo de devolución",
          "3. Recibirás instrucciones y una etiqueta de envío",
          "4. Empaca el producto de forma segura",
          "5. Despacha el paquete según las instrucciones",
          "6. Una vez recibido, procesaremos el reembolso en 5-7 días hábiles]",
        ],
      },
      {
        title: "Cambios",
        description:
          "Si recibiste un producto incorrecto o defectuoso, nos hacemos cargo del envío del cambio. Para cambios por preferencia, el costo del nuevo envío corre por cuenta del cliente.",
      },
      {
        title: "Excepciones",
        description:
          "No se aceptan devoluciones de productos personalizados, con empaque abierto (por razones de higiene), o artículos en oferta especial salvo defectos de fabricación.",
      },
    ],
  },
  {
    id: 4,
    title: "Garantías",
    description: "Detalles sobre la garantía de nuestros productos",
    icon: Shield,
    modal: [
      { title: "Garantías" },
      {
        title: "Cobertura de garantía",
        description:
          "Todos nuestros productos cuentan con 6 meses de garantía contra defectos de fabricación. La garantía cubre fallas en materiales y mano de obra bajo condiciones normales de uso.",
      },
      {
        title: "¿Qué cubre la garantía?",
        description: [
          "• Defectos de fabricación",
          "• Fallas en el funcionamiento sin mal uso",
          "• Problemas de calidad del producto",
          "• Incompatibilidad declarada incorrectamente",
        ],
      },
      {
        title: "¿Qué NO cubre la garantía?",
        description: [
          "• Daños por instalación incorrecta",
          "• Golpes, caídas o daño físico",
          "• Uso indebido o negligente",
          "• Daños por líquidos",
          "• Desgaste normal del producto",
          "• Modificaciones no autorizadas",
        ],
      },
      {
        title: "¿Cómo hacer válida la garantía?",
        description: [
          "1. Conserva tu factura o comprobante de compra",
          "2. Contacta a nuestro servicio de atención al cliente",
          "3. Describe el problema y envía fotos/videos si es posible",
          "4. Nuestro equipo técnico evaluará el caso",
          "5. Si aplica garantía, coordinaremos el cambio o reparación sin costo",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Métodos de Pago",
    description: "Formas de pago seguras y confiables",
    icon: CreditCard,
    modal: [
      { title: "Métodos de Pago" },
      {
        title: "Tarjetas de crédito y débito",
        description:
          "Aceptamos Visa, Mastercard y American Express. Puedes pagar en 1 pago o en cuotas sin interés (según promociones vigentes). El pago se procesa de forma segura a través de nuestra plataforma encriptada.",
      },
      {
        title: "MercadoPago",
        description:
          "Acepta todos los medios de pago de MercadoPago: tarjetas, saldo en cuenta, Mercado Crédito y más. Cuotas según las opciones disponibles en tu cuenta.",
      },
      {
        title: "Transferencia bancaria",
        description:
          "Puedes realizar transferencia o depósito bancario. Una vez confirmado tu pedido, recibirás los datos bancarios por email. Tu pedido se procesará una vez acreditado el pago (24-48 horas).",
      },
      {
        title: "Pago contra entrega",
        description:
          "Disponible solo en CABA y GBA. Puedes pagar en efectivo al recibir tu pedido. Se aplica un cargo adicional de $1.000 por este servicio.",
      },
      {
        title: "Seguridad",
        description:
          "Todos los pagos se procesan a través de plataformas certificadas con encriptación SSL. No almacenamos datos de tarjetas en nuestros servidores.",
      },
    ],
  },
  {
    id: 6,
    title: "Soporte Técnico",
    description: "Ayuda técnica para instalación y compatibilidad",
    icon: Headphones,
    modal: [
      { title: "Soporte Técnico" },
      {
        title: "Compatibilidad de productos",
        description:
          "Antes de comprar, verifica la compatibilidad en la descripción del producto. Si tienes dudas, contacta a nuestro equipo con el modelo exacto de tu dispositivo y te asesoraremos sin compromiso.",
      },
      {
        title: "Guías de instalación",
        description:
          "Muchos de nuestros productos incluyen guías de instalación paso a paso. También compartimos videos tutoriales en nuestro canal de YouTube para facilitar el proceso.",
      },
      {
        title: "Asesoramiento técnico",
        description: [
          "Nuestro equipo técnico está disponible para responder consultas sobre:",
          "• Instalación de repuestos",
          "• Herramientas necesarias",
          "• Solución de problemas",
          "• Recomendaciones de productos",
          "• Compatibilidad específica",
        ],
      },
      {
        title: "Talleres recomendados",
        description: [
          "Si prefieres que un profesional instale tu repuesto, podemos recomendarte talleres certificados en tu zona.",
          "Contamos con una red de técnicos de confianza en todo el país.",
        ],
      },
      {
        title: "Canales de contacto",
        description: [
          "• Email: soporte@techparts.com",
          "• WhatsApp: +54 11 1234-5678",
          "• Chat en vivo: Lun-Vie 9:00-18:00",
          "• Respuesta promedio: 2-4 horas",
        ],
      },
    ],
  },
];

export const helpAccordion = [
  {
    id: 1,
    title: "¿Cómo puedo realizar un pedido?",
    description:
      "Para realizar un pedido, simplemente navega por nuestro catálogo, selecciona los productos que desees, agrégalos al carrito y procede al checkout. Podrás elegir tu método de pago preferido y la dirección de envío. Una vez confirmado el pago, recibirás un email con los detalles de tu compra.",
  },
  {
    id: 2,
    title: "¿Cuáles son los métodos de pago disponibles?",
    description:
      "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, MercadoPago y pago contra entrega en algunas zonas. Todos los pagos son procesados de forma segura.",
  },
  {
    id: 3,
    title: "¿Cuánto tarda el envío?",
    description:
      "Los envíos dentro del área metropolitana llegan en 24-48 horas hábiles. Para el interior del país, el tiempo de entrega es de 3-7 días hábiles. Ofrecemos envío gratis en compras superiores a $50.000. Recibirás un código de seguimiento para rastrear tu pedido.",
  },
  {
    id: 4,
    title: "¿Puedo devolver o cambiar un producto?",
    description:
      "Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en su empaque original y sin uso. Los gastos de envío de la devolución corren por cuenta del cliente, excepto en casos de productos defectuosos o envíos incorrectos.",
  },
  {
    id: 5,
    title: "¿Los productos tienen garantía?",
    description:
      "Todos nuestros productos cuentan con 6 meses de garantía contra defectos de fabricación. La garantía no cubre daños por mal uso, golpes o instalación incorrecta. Para hacer válida la garantía, conserva tu factura de compra y contacta a nuestro servicio de atención al cliente.",
  },
  {
    id: 6,
    title: "¿Cómo sé si un repuesto es compatible con mi celular?",
    description:
      "Cada producto incluye una descripción detallada con los modelos compatibles. También puedes usar nuestro buscador o contactar a nuestro equipo de soporte técnico con el modelo exacto de tu dispositivo para recibir asesoramiento personalizado.",
  },
  {
    id: 7,
    title: "¿Ofrecen servicio de instalación?",
    description:
      "Por el momento no ofrecemos servicio de instalación directo, pero podemos recomendarte talleres certificados en tu zona. Algunos de nuestros productos incluyen guías de instalación y videos tutoriales.",
  },
  {
    id: 8,
    title: "¿Puedo hacer seguimiento de mi pedido?",
    description:
      "Sí, una vez que tu pedido sea despachado, recibirás un email con el número de seguimiento y un enlace para rastrear tu envío en tiempo real. También puedes contactarnos directamente para consultar el estado de tu pedido.",
  },
];
