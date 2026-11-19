// Reference only; not a runnable app until Gemini generates the Next.js project.
// Keep this file as a conceptual example, not a fabricated completed source tree.
export type Locale = 'ar' | 'en';
export type DemoKey = 'construction'|'industrial'|'real-estate'|'dental'|'ecommerce'|'portfolio';
export type Localized = Record<Locale, string>;
export interface ShowcaseDemo {
  slug: DemoKey;
  label: Localized;
  shortPitch: Localized;
  primaryFlow: Localized;
  route: string;
  status: 'planned'|'implemented'|'verified';
  screenshot?: string;
}
export const demoSequence: DemoKey[] = [
  'construction','industrial','real-estate','dental','ecommerce','portfolio'
];
// Fill screenshot and status only after actual feature verification.
