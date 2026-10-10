# AIME Production

A responsive creative studio website built with React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

The visual system uses the requested palette: Magenta `#A5006D`, Gold `#C9A448`, Charcoal Black `#1A1A1A`, Medium Gray `#BDBDBD`, and Soft Silver `#E6E6E6`. Magenta leads actions and editorial highlights; gold provides a quieter secondary signal in the process line, metadata, and fine details.

## Pages

- Home: cinematic studio introduction, connected creative process, service previews, selected work, and studio philosophy.
- About: introduction, creative principles, skills, and software/tools.
- Services: all seven disciplines, expandable details, photography subcategories, and service-specific inquiry links.
- Work: six concept projects, eight working category filters, and dedicated case studies.
- Contact: multi-service selection, validated project information, persistent drafts, and an email handoff.

Hash-based routes support direct links and browser history without requiring server-side route rewrites. Case studies are available at `#/work/project-slug`.

## Content

- `src/data.ts` contains the service catalog, case study content, image sources, and studio email.
- `src/components.tsx` contains the shared navigation, footer, social discovery links, accordions, and keyboard-accessible image gallery.
- `src/index.css` contains the responsive design system and motion preferences.
- `public/images/` contains the custom illustrative imagery.

The portfolio intentionally identifies its entries as studio concepts and visual studies. Generated images are illustrative rather than evidence of completed client commissions. The Concrete / Quiet study uses Pexels reference photography by Francesco Ungaro and David Yu, with attribution in the case study.

## Inquiry Behavior

The inquiry form validates fields and saves its draft in local storage under `aime-project-draft-v1`. No form data is uploaded to a server. The visitor can review the prepared inquiry, open their email application to send it, copy the brief, or download it as a text file. The interface explicitly distinguishes a prepared brief from a sent message.

The configured `hello@aimeproduction.studio` address is a demonstration address, not a verified inbox. Replace it with the studio's actual email before accepting inquiries. A backend or form-delivery service can be integrated in `src/pages/Contact.tsx` if direct website submission is preferred.

## Before Launch

- Confirm the studio inbox and actual social profile URLs. The current social links are discovery searches, not claims of verified accounts.
- Replace the illustrative portfolio with approved client projects and photography where available.
- Add a verified phone number and studio location if public contact details are desired. The current site offers a callback inquiry rather than publishing a fabricated phone number.
- Check the final deployment domain, social-sharing metadata, and privacy requirements for the intended audience.

## Verification

The production build has been verified with the project's supplied build runner. Browser-driven interaction testing and external email delivery have not been verified in this environment.