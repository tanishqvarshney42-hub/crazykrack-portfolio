import { describe, expect, it } from 'vitest';
import { VIDEOS, FILTERS } from './portfolio';
import { briefSchema, prepareProjectEmail } from './project-brief';
const brief = { name: 'Alex & Co', email: 'alex@example.com', category: 'Minecraft', platform: 'YouTube', length: '10 minutes', budget: '$500–$1,000', deadline: 'November 15', details: 'A story-driven survival edit.\nHook & pacing.', reference: 'https://example.com/reference' };
describe('Portfolio integrity', () => {
  it('contains exactly 12 real video samples', () => expect(VIDEOS).toHaveLength(12));
  it('contains the six requested content categories', () => expect(FILTERS.slice(1)).toEqual(['Roblox', 'Minecraft', 'Vlog', 'Business', 'IRL Game', 'Fortnite']));
  it('has samples for all six categories', () => expect(new Set(VIDEOS.map(v => v.cat)).size).toBe(6));
});
describe('Project brief', () => {
  it('rejects an invalid email', () => expect(briefSchema.safeParse({ ...brief, email: 'not-email' }).success).toBe(false));
  for (const key of ['name', 'category', 'platform', 'length', 'budget', 'deadline', 'details']) {
    it(`requires ${key}`, () => expect(briefSchema.safeParse({ ...brief, [key]: '' }).success).toBe(false));
  }
  it('allows an omitted reference', () => expect(briefSchema.safeParse({ ...brief, reference: '' }).success).toBe(true));
  it('rejects unsafe reference protocols', () => expect(briefSchema.safeParse({ ...brief, reference: 'javascript:alert(1)' }).success).toBe(false));
  it('prepares an encoded email with every filled detail for the specified recipient', () => {
    const url = prepareProjectEmail(brief);
    expect(url.startsWith('mailto:tanishqvarshney42@gmail.com?')).toBe(true);
    const params = new URLSearchParams(url.split('?')[1]);
    expect(params.get('subject')).toBe('Project inquiry — Minecraft');
    for (const value of Object.values(brief)) expect(params.get('body')).toContain(value);
    expect(url).not.toContain('Hook & pacing.');
  });
});
