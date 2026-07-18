export type ScreenType =
  | 'home'
  | 'apply'
  | 'contact'
  | 'optin-cantantes'
  | 'optin-oradores'
  | 'gracias-cantantes'
  | 'gracias-oradores';

export type Audience = 'cantantes' | 'oradores';

export interface FormState {
  name: string;
  email: string;
  message: string;
}

export interface AccordionItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags?: string[];
  points?: string[];
}
