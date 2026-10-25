# FAR-IT — site vitrine

Refonte du site far-it.com : contenu de la maquette FAR-IT, mise en page inspirée du template Framer « Clonix ».

**Stack :** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Motion · runtime Node.js (≥ 20.9)

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Où modifier quoi

| Quoi | Fichier |
| --- | --- |
| Tous les textes FR / EN | `lib/content.ts` (même structure pour les deux langues) |
| Couleurs, polices | `app/globals.css` (bloc `@theme`) |
| Sections | `components/*.tsx`, ordre dans `app/page.tsx` |
| Logos clients, photos, logo | `public/images/` |
| Formulaire de contact (API) | `app/api/contact/route.ts` |

Le sélecteur FR/EN est dans la barre de navigation et le pied de page ; le choix est mémorisé dans le navigateur.

## Formulaire de contact

Copier `.env.example` vers `.env.local` et renseigner le SMTP. Sans SMTP, l'API répond 503 et le formulaire affiche un lien `mailto:gestion@far-it.com` en secours.
