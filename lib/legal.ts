// Legal pages. French text is copied verbatim from far-it.com (it is the legally
// binding version); English is a courtesy translation and says so.

import type { Locale } from "./content";

export type LegalItem = { label?: string; text: string; href?: string };
export type LegalBlock = { type: "p"; text: string } | { type: "list"; items: LegalItem[] };
export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };
export type LegalDoc = {
  metaTitle: string;
  label: string;
  title: string;
  intro?: string;
  notice?: string;
  tocLabel: string;
  sections: LegalSection[];
  contactCta: string;
};

const mentionsFr: LegalDoc = {
  metaTitle: "Mentions légales — FAR-IT",
  label: "Informations légales",
  title: "Mentions légales far-it.com",
  tocLabel: "Sommaire",
  contactCta: "Nous contacter",
  sections: [
    {
      id: "informations-generales",
      title: "I. Informations générales",
      blocks: [
        {
          type: "list",
          items: [
            { label: "Dénomination sociale", text: "FAR-IT" },
            { label: "Forme juridique", text: "Société par Actions Simplifiée (SaS)" },
            { label: "Capital social", text: "10 000€" },
            { label: "Siège social", text: "20 rue de Billancourt 92100 Boulogne-Billancourt" },
            { label: "Numéro d'immatriculation", text: "834962805" },
            { label: "Numéro de TVA intracommunautaire", text: "FR03834962805" },
            { label: "Code APE", text: "6202A" },
            { label: "Nom du responsable de la publication", text: "M. Antoine Mestdasgh" },
            { label: "Hébergeur", text: "OVH Cloud" },
          ],
        },
      ],
    },
    {
      id: "contact",
      title: "II. Contact",
      blocks: [
        {
          type: "list",
          items: [
            { label: "Adresse email", text: "gestion@far-it.com", href: "mailto:gestion@far-it.com" },
            { label: "Numéro de téléphone", text: "06 12 44 73 48", href: "tel:+33612447348" },
            { label: "Formulaire de contact", text: "disponible ici", href: "/contact" },
          ],
        },
      ],
    },
    {
      id: "propriete-intellectuelle",
      title: "III. Propriété intellectuelle",
      blocks: [
        {
          type: "list",
          items: [
            { text: "Tous les contenus du site web Far-IT sont protégés par des droits d'auteur." },
            { text: "Les crédits photos sont disponibles sur demande." },
            { text: "Aucune licence Creative Commons n'est applicable aux contenus du site web." },
          ],
        },
      ],
    },
    {
      id: "cgu",
      title: "IV. Conditions générales d'utilisation (CGU)",
      blocks: [
        {
          type: "list",
          items: [
            { text: "Les CGU sont disponibles à la demande." },
            { text: "La société Far-IT se réserve le droit de modifier les CGU à tout moment." },
            { text: "Le site web Far-IT propose des services de chasse et de recrutement." },
            { text: "La société Far-IT s'engage à fournir un service de qualité à ses clients." },
            { text: "La société Far-IT ne peut être tenue responsable des contenus des sites web accessibles via des liens hypertextes présents sur son site web." },
            { text: "La société Far-IT s'engage à respecter la vie privée des utilisateurs et à ne pas divulguer leurs données personnelles à des tiers." },
          ],
        },
      ],
    },
  ],
};

const mentionsEn: LegalDoc = {
  metaTitle: "Legal notice — FAR-IT",
  label: "Legal information",
  title: "Legal notice far-it.com",
  notice: "This is a courtesy translation. The French version is the only legally binding one.",
  tocLabel: "Contents",
  contactCta: "Contact us",
  sections: [
    {
      id: "informations-generales",
      title: "I. General information",
      blocks: [
        {
          type: "list",
          items: [
            { label: "Company name", text: "FAR-IT" },
            { label: "Legal form", text: "Société par Actions Simplifiée (SAS, simplified joint-stock company)" },
            { label: "Share capital", text: "€10,000" },
            { label: "Registered office", text: "20 rue de Billancourt 92100 Boulogne-Billancourt, France" },
            { label: "Registration number", text: "834962805" },
            { label: "EU VAT number", text: "FR03834962805" },
            { label: "APE code", text: "6202A" },
            { label: "Publication director", text: "Mr Antoine Mestdasgh" },
            { label: "Hosting provider", text: "OVH Cloud" },
          ],
        },
      ],
    },
    {
      id: "contact",
      title: "II. Contact",
      blocks: [
        {
          type: "list",
          items: [
            { label: "Email", text: "gestion@far-it.com", href: "mailto:gestion@far-it.com" },
            { label: "Phone", text: "+33 6 12 44 73 48", href: "tel:+33612447348" },
            { label: "Contact form", text: "available here", href: "/contact" },
          ],
        },
      ],
    },
    {
      id: "propriete-intellectuelle",
      title: "III. Intellectual property",
      blocks: [
        {
          type: "list",
          items: [
            { text: "All content on the Far-IT website is protected by copyright." },
            { text: "Photo credits are available on request." },
            { text: "No Creative Commons licence applies to the website's content." },
          ],
        },
      ],
    },
    {
      id: "cgu",
      title: "IV. Terms of use",
      blocks: [
        {
          type: "list",
          items: [
            { text: "The terms of use are available on request." },
            { text: "Far-IT reserves the right to amend the terms of use at any time." },
            { text: "The Far-IT website offers headhunting and recruitment services." },
            { text: "Far-IT is committed to providing a quality service to its clients." },
            { text: "Far-IT cannot be held responsible for the content of websites reached through hyperlinks on its website." },
            { text: "Far-IT is committed to respecting users' privacy and not disclosing their personal data to third parties." },
          ],
        },
      ],
    },
  ],
};

const privacyFr: LegalDoc = {
  metaTitle: "Politique de confidentialité — FAR-IT",
  label: "Données personnelles",
  title: "Politique de confidentialité",
  intro:
    "FAR-IT s'engage à respecter votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons les informations personnelles que vous nous fournissez lorsque vous visitez notre site web.",
  tocLabel: "Sommaire",
  contactCta: "Nous contacter",
  sections: [
    {
      id: "informations-collectees",
      title: "Quelles informations collectons-nous ?",
      blocks: [
        { type: "p", text: "Nous pouvons collecter les types d'informations suivants :" },
        {
          type: "list",
          items: [
            {
              label: "Informations que vous nous fournissez volontairement",
              text: "Lorsque vous nous contactez via notre formulaire de contact, nous pouvons collecter votre nom, votre adresse électronique et d'autres informations que vous choisissez de nous fournir.",
            },
            {
              label: "Informations collectées automatiquement",
              text: "Lorsque vous visitez notre site web, nous pouvons collecter automatiquement certaines informations, telles que votre adresse IP, le type de navigateur que vous utilisez et les pages que vous visitez. Ces informations nous aident à améliorer notre site web.",
            },
          ],
        },
      ],
    },
    {
      id: "utilisation",
      title: "Comment utilisons-nous vos informations ?",
      blocks: [
        { type: "p", text: "Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers." },
        { type: "p", text: "Nous utilisons les informations que nous collectons pour :" },
        {
          type: "list",
          items: [{ text: "Répondre à vos demandes" }, { text: "Améliorer notre site web" }, { text: "Vous fournir un contenu personnalisé" }],
        },
      ],
    },
    {
      id: "protection",
      title: "Comment protégeons-nous vos informations ?",
      blocks: [
        {
          type: "p",
          text: "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé, toute utilisation abusive, toute divulgation, toute modification ou toute destruction.",
        },
        { type: "p", text: "Vous avez le droit de :" },
        {
          type: "list",
          items: [
            { label: "Accéder à vos informations", text: "Vous pouvez nous demander une copie des informations que nous détenons à votre sujet." },
            { label: "Corriger vos informations", text: "Si les informations que nous détenons à votre sujet sont inexactes, vous pouvez nous demander de les corriger." },
            { label: "Supprimer vos informations", text: "Vous pouvez nous demander de supprimer les informations que nous détenons à votre sujet." },
          ],
        },
      ],
    },
    {
      id: "modifications",
      title: "Modifications de cette politique",
      blocks: [
        { type: "p", text: "Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Toute modification sera affichée sur cette page." },
        { type: "p", text: "Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à l'adresse suivante : gestion@far-it.com." },
      ],
    },
  ],
};

const privacyEn: LegalDoc = {
  metaTitle: "Privacy policy — FAR-IT",
  label: "Personal data",
  title: "Privacy policy",
  intro:
    "FAR-IT is committed to respecting your privacy. This privacy policy explains how we collect, use and protect the personal information you provide when you visit our website.",
  notice: "This is a courtesy translation. The French version is the only legally binding one.",
  tocLabel: "Contents",
  contactCta: "Contact us",
  sections: [
    {
      id: "informations-collectees",
      title: "What information do we collect?",
      blocks: [
        { type: "p", text: "We may collect the following types of information:" },
        {
          type: "list",
          items: [
            {
              label: "Information you provide voluntarily",
              text: "When you contact us through our contact form, we may collect your name, your email address and any other information you choose to give us.",
            },
            {
              label: "Information collected automatically",
              text: "When you visit our website, we may automatically collect certain information, such as your IP address, the type of browser you use and the pages you visit. This information helps us improve our website.",
            },
          ],
        },
      ],
    },
    {
      id: "utilisation",
      title: "How do we use your information?",
      blocks: [
        { type: "p", text: "We do not sell, trade or rent your personal information to third parties." },
        { type: "p", text: "We use the information we collect to:" },
        {
          type: "list",
          items: [{ text: "Respond to your requests" }, { text: "Improve our website" }, { text: "Provide you with personalised content" }],
        },
      ],
    },
    {
      id: "protection",
      title: "How do we protect your information?",
      blocks: [
        {
          type: "p",
          text: "We implement appropriate security measures to protect your personal information against unauthorised access, misuse, disclosure, alteration or destruction.",
        },
        { type: "p", text: "You have the right to:" },
        {
          type: "list",
          items: [
            { label: "Access your information", text: "You can ask us for a copy of the information we hold about you." },
            { label: "Correct your information", text: "If the information we hold about you is inaccurate, you can ask us to correct it." },
            { label: "Delete your information", text: "You can ask us to delete the information we hold about you." },
          ],
        },
      ],
    },
    {
      id: "modifications",
      title: "Changes to this policy",
      blocks: [
        { type: "p", text: "We may update this privacy policy from time to time. Any changes will be posted on this page." },
        { type: "p", text: "If you have any questions about this privacy policy, please contact us at: gestion@far-it.com." },
      ],
    },
  ],
};

export const legalDocs = {
  mentions: { fr: mentionsFr, en: mentionsEn },
  privacy: { fr: privacyFr, en: privacyEn },
} satisfies Record<string, Record<Locale, LegalDoc>>;

export type LegalKey = keyof typeof legalDocs;
