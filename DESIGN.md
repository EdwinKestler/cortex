# CORTEX / Backstage energy, financial precision

The redesign translates the reference's concert atmosphere into an editorial identity, rather than a simulated crypto trading terminal. Full-bleed stage photography, oversized Inter headlines, sharp graphite panels, and lime action accents bring music to the foreground. Orbitron remains reserved for the wordmark and section numerals; JetBrains Mono is used for technical labels and figures.

Blue continues to mean forecast/data, amber capital, teal verification, violet identity/proof, green settlement, and red risk. These semantic colors have separate light-theme values. Brand lime is not a financial success indicator. The hero deliberately stays dark in both themes to protect photographic contrast; data and reading surfaces respond to the selected theme.

The four-module explorer clarifies that CORTEX is the platform, CT-GOT the intelligence engine, the event SPV the financing structure, PRONESYS / S.P.A.R.C. Notes the first proposed investor product, GatePass the ticket/access layer, and SplitNight the waterfall. All new production copy is in both translation files. The supplied redesign proposal's invented telemetry and unsupported custody/settlement guarantees were not incorporated.

## Asset provenance

- Production asset: `public/images/cortex-stage.webp` (1672 × 941; 98,280 bytes).
- Created using the built-in image-generation tool, then encoded as WebP. No paid API or extra runtime dependency.
- Prompt: One original wide 16:9 photorealistic concert image. Enormous contemporary dark indoor arena seen from stage/backstage; one anonymous performer in back silhouette in the right third; a sea of audience lights; dramatic amber beams, deep violet haze, subtle lime highlights; premium editorial film grain and high contrast. Leave dark negative space in the left third for typography. No recognizable real artist, logos, text, UI, or crypto symbols. Conceptual editorial imagery, not evidence of a CORTEX event.
- The adjacent Spanish and English caption discloses that the image is AI-generated and conceptual. The background image is decorative for screen readers; all meaningful information remains in text.

## Motion and review

Motion is limited to 150–300ms state transitions. CSS disables decorative transitions for reduced motion. The forecast chart also reads `prefers-reduced-motion` to disable Recharts' JavaScript animation. The ecosystem index has roving tab focus, arrow-key selection, and linked tab panels. Existing financial calculations and `func_id` mappings are unchanged.

The development-only responsive frame in `scripts/responsive-preview.html` makes 375px review reproducible without shipping a production route. Automated tests cover both translation key parity and localized homepage output, alongside the existing financial/data tests.
