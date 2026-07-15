export type ScreenType = 'home' | 'apply' | 'contact';

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
