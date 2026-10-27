import { z } from 'zod';
import { EMAIL } from './portfolio';

export const CATEGORIES = ['Roblox', 'Minecraft', 'Vlog', 'Business', 'IRL Game', 'Fortnite'] as const;
export const PLATFORMS = ['YouTube', 'YouTube Shorts', 'TikTok', 'Instagram', 'Other'] as const;
export const BUDGETS = ['Under $250', '$250–$500', '$500–$1,000', '$1,000–$2,500', '$2,500+', 'Let’s discuss'] as const;
const required = (label: string, max = 100) => z.string().trim().min(1, `${label} is required.`).max(max);
export const briefSchema = z.object({
  name: required('Name'),
  email: z.string().trim().email('Enter a valid email address.').max(254),
  category: z.enum(CATEGORIES, { errorMap: () => ({ message: 'Choose a content category.' }) }),
  platform: z.enum(PLATFORMS, { errorMap: () => ({ message: 'Choose a platform.' }) }),
  length: required('Video length'),
  budget: z.enum(BUDGETS, { errorMap: () => ({ message: 'Choose a budget range.' }) }),
  deadline: required('Deadline'),
  details: required('Project details', 2500),
  reference: z.string().trim().max(500).refine(v => !v || /^https?:\/\//i.test(v), 'Use an http or https link.').refine(v => !v || z.string().url().safeParse(v).success, 'Enter a valid link.'),
});
export type ProjectBrief = z.infer<typeof briefSchema>;
export function prepareProjectEmail(input: unknown) {
  const b = briefSchema.parse(input);
  const body = [
    'Hi CrazyKrack,', '', 'I’d like to discuss a video editing project.', '',
    `Name: ${b.name}`, `Email: ${b.email}`, `Content category: ${b.category}`,
    `Platform: ${b.platform}`, `Video length: ${b.length}`, `Budget (USD): ${b.budget}`,
    `Deadline: ${b.deadline}`, '', 'Project details:', b.details,
    ...(b.reference ? ['', `Reference: ${b.reference}`] : []), '', 'Thanks!', b.name,
  ].join('\n');
  return `mailto:${EMAIL}?subject=${encodeURIComponent(`Project inquiry — ${b.category}`)}&body=${encodeURIComponent(body)}`;
}
