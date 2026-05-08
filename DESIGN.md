---
name: Svarly
description: Calm, hospitable Danish review tooling for small businesses. Quiet competence, never SaaS noise.
colors:
  forest-deep: "#2F4F3E"
  forest-deep-hover: "#25402F"
  sage: "#7A8F7B"
  ink: "#1F2A24"
  bark: "#5C6B62"
  linen: "#F8F9F7"
  beige-card: "#EFEDE7"
  chalk-border: "#E0DDD5"
typography:
  display:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.2vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.005em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.84375rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section-y: "72px"
  section-y-lg: "100px"
components:
  button-primary:
    backgroundColor: "{colors.forest-deep}"
    textColor: "{colors.linen}"
    rounded: "{rounded.md}"
    padding: "9px 20px"
  button-primary-hover:
    backgroundColor: "{colors.forest-deep-hover}"
    textColor: "{colors.linen}"
    rounded: "{rounded.md}"
    padding: "9px 20px"
  button-secondary:
    backgroundColor: "{colors.beige-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "9px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bark}"
    rounded: "{rounded.md}"
    padding: "9px 12px"
  card:
    backgroundColor: "{colors.beige-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  input:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  pill-badge:
    backgroundColor: "{colors.beige-card}"
    textColor: "{colors.bark}"
    rounded: "{rounded.pill}"
    padding: "5px 14px"
---

# Design System: Svarly

## 1. Overview

**Creative North Star: "The Office Above the Café"**

Imagine a small office on the floor above a Copenhagen café. There is morning light from a back window, a plant in the corner, paper notebooks on the desk, and a kettle. Things are practical, warm, lived-in. Nobody is performing. The work gets done, and then the owner goes back downstairs to greet customers. That is the room Svarly lives in.

The system is calm by default. Color is committed (one deep forest green carries the brand identity), but it is held against warm-neutral surfaces (off-white linen, beige cards) so the green never dominates. Type is split: a serif display for headlines (DM Serif Display, regular) carries the editorial character; a sans (DM Sans) carries everything else, with deliberately generous body sizes for older readers. Depth is mostly absent. A few key elements (the primary CTA, hover affordances) carry a soft warm-tinted shadow that reads as ambient daylight, not Material elevation.

This is explicitly NOT a Silicon Valley SaaS, NOT a generic AI tool, NOT a 2010s SMB plugin, and NOT enterprise software. If a screenshot looks like Linear, Notion, Jasper, or Salesforce, it has drifted.

**Key Characteristics:**
- One forest-green primary, used sparingly on identity and CTA
- Warm-neutral surfaces (linen + beige) instead of pure white or grey
- DM Serif Display for headlines, occasional italics for emphasis
- Body type 16px+, line-height 1.6, AAA contrast on default text
- Flat by default, soft ambient shadow only on the primary CTA and hover
- Slightly larger radii (10px on controls, 14px on cards) for a hospitable feel
- Pill badges with 1px border on beige fill as the signature small element

## 2. Colors: The Linen-and-Forest Palette

A committed palette: one deep green carries identity, two warm neutrals carry every surface, and a darker ink carries text. The green appears on roughly 10 to 15 percent of any given screen. The palette never sits on pure white.

### Primary
- **Deep Forest** (`#2F4F3E`): Identity. The CTA, the active nav state, the brand mark color, the small accent shapes inside pill icons. Always against linen or beige, never against another saturated color.

### Secondary
- **Sage** (`#7A8F7B`): A muted version of Deep Forest used for supporting marks, illustration accents, and tertiary chips. Never used for primary CTAs. Carries the same hue family at much lower chroma.

### Neutral
- **Ink** (`#1F2A24`): Body text and headlines. A warm near-black tinted toward the green hue. Never `#000`.
- **Bark** (`#5C6B62`): Muted text, secondary copy, inactive nav links, supporting metadata. AA contrast on linen, not AAA. Use only as supporting text, never as default body.
- **Linen** (`#F8F9F7`): Default page background across marketing and product. A warm off-white that reads as paper, not screen.
- **Beige Card** (`#EFEDE7`): Card and pill background. A warm cream that lifts off linen by tonal weight alone, no border needed.
- **Chalk Border** (`#E0DDD5`): 1px borders on inputs, dividers, scroll-state nav border. Slightly cooler than Beige Card so it reads as line, not surface.

### Named Rules

**The One Green Rule.** Deep Forest appears on no more than 10 to 15 percent of any screen. Its rarity is the brand. If a layout has more than one green CTA visible at once, one of them is wrong.

**The No-White, No-Black Rule.** Pure white (`#fff`) and pure black (`#000`) are forbidden. Backgrounds use Linen or Beige Card. Text uses Ink. Both are tinted toward the brand hue family on purpose.

**The Bark-Is-Supporting Rule.** Bark (`#5C6B62`) is for muted, secondary, or inactive copy only. Default body text is always Ink. AAA contrast on body text is non-negotiable for this audience.

## 3. Typography

**Display Font:** DM Serif Display (with Georgia, serif fallback)
**Body Font:** DM Sans (with system-ui, sans-serif fallback)
**Mono Font:** Geist Mono (only for code samples or copy-able strings)

**Character:** A modern editorial serif for headlines paired with a humanist geometric sans for everything else. The serif gives Svarly its quiet authority (we wrote this carefully, like a letter). The sans gives it everyday legibility. Italics in the serif carry emphasis; the sans never goes italic for emphasis.

### Hierarchy
- **Display** (DM Serif Display, 400, clamp(2.25rem, 4.2vw, 3.5rem), line-height 1.1, tracking -0.02em): Hero headlines on landing surfaces only. One per page maximum.
- **Headline** (DM Serif Display, 400, clamp(1.75rem, 2.6vw, 2.25rem), line-height 1.15): Section titles on long marketing pages.
- **Title** (DM Sans, 500, 1.125rem, line-height 1.4): Card titles, dialog headers, sub-section titles in product UI.
- **Body** (DM Sans, 400, 1rem, line-height 1.6): Default body across marketing and product. Cap line length 65 to 75ch on long-form pages.
- **Label** (DM Sans, 500, 0.84375rem / 13.5px, line-height 1.4): Nav links, button copy, small UI labels. Never used for body content.

### Named Rules

**The Italic-As-Emphasis Rule.** Inside DM Serif Display headlines, italic is the brand's stress mark (used in the existing hero on the green clause). Sans copy never uses italic for emphasis: weight does that work. No bold-and-italic anywhere.

**The 16-Pixel Floor Rule.** Body copy never goes below 16px on marketing surfaces, never below 14px in product UI, never below 13.5px for any reader-facing label. The audience skews older. Small type is rude here.

**The One-Headline-Per-Hero Rule.** A single DM Serif Display block per major surface. Don't stack three serif headlines in a hero; don't use the display face for sub-headers.

## 4. Elevation

The system is flat by default. Cards, inputs, surfaces, and most interactive elements sit at z=0 against the page. Depth is conveyed by tonal layering (Beige Card on Linen) and by 1px Chalk borders, not by shadow.

Shadows appear on exactly two roles: the primary CTA at rest, and the focus or hover state of interactive elements. The shadow is warm-tinted (it carries the green primary at low opacity) so it reads as ambient daylight rather than as a generic UI shadow.

### Shadow Vocabulary

- **Primary glow** (`box-shadow: 0 2px 12px rgba(47,79,62,0.35)`): Under the primary CTA at rest. Soft, warm, present but not loud. Applied only to the primary action on a screen.
- **Hover lift** (`box-shadow: 0 4px 18px rgba(47,79,62,0.18)`): On hover for primary CTAs and high-emphasis links. Slightly larger blur, lower opacity. Never combined with a transform on cards or surfaces.
- **Focus ring** (`outline: 2px solid #2F4F3E; outline-offset: 2px`): Used in place of a shadow for keyboard focus. High-contrast, no offset blur, fully accessible.

### Named Rules

**The Flat-Surface Rule.** Cards, inputs, badges, sections, and the page itself never carry shadows. Depth between surfaces is tonal: Beige Card lifts from Linen because they are different colors, not because one is shadowed.

**The Daylight-Not-Material Rule.** When a shadow is used, it is warm (tinted toward Deep Forest), low in opacity, and large in blur. It reads as the soft glow of ambient light. It does not read as a Material card lifted off a substrate.

**The Two-Roles Rule.** Shadow is reserved for (1) the primary CTA at rest and (2) hover or focus affordances. Never for cards, never for hero containers, never for navigation, never for modals.

## 5. Components

Components feel hospitable and rounded. Slightly larger radii than a typical SaaS (10px on controls, 14px on cards), warm fills, and 1px Chalk borders where stroke is needed. Internal padding is generous. Nothing feels tight.

### Buttons
- **Shape:** Soft rounded corners (10px / `rounded.md`). Pill (`rounded.pill`) only for tag-style chips, never for primary actions.
- **Primary:** Deep Forest fill, Linen text, 13.5px Label type at weight 500. Padding 9px top and bottom, 20px left and right. Carries the Primary glow shadow at rest. On hover, the fill shifts to a slightly darker Forest (`#25402F`); the shadow grows into the Hover lift. On active, a 1px downward translate is acceptable.
- **Secondary:** Beige Card fill, Ink text, 1px Chalk border. Same padding and type as primary. No shadow at any state. Hover deepens the fill toward `#E6E2DA`.
- **Ghost:** Transparent fill, Bark text, no border. Used for tertiary actions in dense UI like the product app. Hover shifts text from Bark to Ink.
- **Disabled:** opacity 0.45, cursor not-allowed. No grey-out tint, the opacity is the signal.

### Cards
- **Corner Style:** 14px radius (`rounded.lg`), generous and friendly.
- **Background:** Beige Card. Never Linen (Linen is the page); never pure white.
- **Border:** None by default. Tonal lift from Linen does the work.
- **Shadow Strategy:** Flat. See Elevation section. Cards do not lift on hover.
- **Internal Padding:** 20 to 24px on all sides. Tighter only inside dense product surfaces (16px).

### Inputs
- **Style:** Linen fill (or transparent on Linen page), 1px Chalk border, 10px radius (`rounded.md`). Padding 10px top and bottom, 12px left and right.
- **Type:** Body type at 16px so iOS does not zoom on focus. Placeholder uses Bark.
- **Focus:** Border deepens to Deep Forest, no shadow added. The border itself is the focus signal. Combined with the focus-ring outline for keyboard users.
- **Error:** Border shifts to a warm rust (project does not yet have a brand-defined destructive token; extend the palette before deploying error states broadly).
- **Disabled:** Linen fill at 60 percent opacity, Bark text, no border change.

### Navigation
- **Marketing nav:** Fixed top, transparent over hero, transitions to Linen at 94 percent opacity with a 14px backdrop blur and a 1px Chalk bottom border once scrolled. Links use Label type in Bark, switching to Deep Forest with a 1.5px solid bottom border underline on the active route. Logo at left, link cluster centered, Log ind / Start gratis cluster at right.
- **Product nav:** Inherits marketing logo and Forest active state, but sits inside the app shell rather than fixing to viewport top. Active state is the same forest underline.
- **Mobile:** Marketing nav collapses link cluster behind a single sheet trigger. CTA Start gratis stays visible.

### Pill Badge (Signature)
The small inline pill used in the hero ("AI til anmeldelsessvar" with a tiny circular icon at left) is a signature element. Beige Card fill, 1px Chalk border, 11.5 to 13.5px Label type in Bark, fully rounded (`rounded.pill`). Padding 5px top and bottom, 14px right, 8px left to accommodate a leading 18px circular accent shape. Use sparingly: one per section maximum, for category labels or feature classifiers.

### Section
Long-form marketing sections share a wrapper: 72px vertical padding on mobile, 100px on desktop, 24 to 48px horizontal, max-width 1100px content area. Sections alternate background between Linen and Beige Card to create rhythm without dividing lines.

## 6. Do's and Don'ts

### Do:
- **Do** use Deep Forest (`#2F4F3E`) on roughly 10 to 15 percent of any screen, concentrated on identity (logo, primary CTA, active nav).
- **Do** use Linen (`#F8F9F7`) and Beige Card (`#EFEDE7`) as the only two surface colors. Alternate sections to create rhythm.
- **Do** use DM Serif Display, regular weight, with occasional italic, for hero and section headlines. One serif headline per major surface.
- **Do** keep body text at 16px or larger with line-height 1.6. AAA contrast on body. Larger touch targets on mobile (44px minimum).
- **Do** use shadow only on the primary CTA at rest and on hover affordances. Warm-tinted, low opacity, large blur.
- **Do** treat depth tonally: Beige Card lifts from Linen because of color, not shadow.
- **Do** use 1px Chalk Border (`#E0DDD5`) for input strokes, dividers, and the scrolled nav bottom edge.
- **Do** keep copy plainspoken: direct, warm, slightly understated. Sentences end with periods.
- **Do** use the pill badge as the signature small element for category labels.

### Don't:
- **Don't** use pure black (`#000`) or pure white (`#fff`) anywhere. Tint toward the brand hue.
- **Don't** add shadows to cards, sections, modals, navigation, or hero containers. The system is flat.
- **Don't** use border-left greater than 1px as a colored accent stripe. No side stripes on cards, callouts, or list items.
- **Don't** apply `background-clip: text` with a gradient. Gradient text is forbidden. Emphasis comes from weight or italic.
- **Don't** use glassmorphism on cards or panels. The transparent-blurred nav is the only blur permitted; one blur per screen.
- **Don't** stack a serif headline on top of another serif headline. One DM Serif Display block per surface.
- **Don't** use 13 to 14px text as body copy. That weight is for labels and nav links only.
- **Don't** ship a "generic AI tool" surface: no purple gradients, no sparkle icons, no "AI" badges, no robot imagery, no "Powered by GPT" anywhere. (PRODUCT.md anti-reference.)
- **Don't** ship a "Silicon Valley SaaS" surface: no navy-and-gradient hero, no glassmorphism cards, no rainbow accent stripes, no big-number metric grids. (PRODUCT.md anti-reference.)
- **Don't** ship "cheap SMB tooling": no clipart, no neon CTAs, no cluttered dashboards, no 2010s WordPress-plugin energy. (PRODUCT.md anti-reference.)
- **Don't** ship "over-corporate enterprise": no stock photography of suits, no jargon, no LinkedIn-shaped seriousness, no Salesforce-shaped density. (PRODUCT.md anti-reference.)
- **Don't** use exclamation marks in UI copy. Plainspoken Danish does not shout.
- **Don't** use em dashes in copy. Use commas, colons, periods, or parentheses.
- **Don't** use English where Danish works. The product ships in Danish; copy is Danish.
