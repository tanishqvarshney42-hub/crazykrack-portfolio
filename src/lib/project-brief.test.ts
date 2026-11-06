import { describe, expect, it } from 'vitest';
import { VIDEOS, FILTERS, embed, thumb } from './portfolio';
import { briefSchema, prepareProjectEmail } from './project-brief';
const brief = { name: 'Alex & Co', email: 'alex@example.com', category: 'Minecraft', platform: 'YouTube', length: '10 minutes', budget: '$500–$1,000', deadline: 'November 15', details: 'A story-driven survival edit.\nHook & pacing.', reference: 'https://example.com/reference' };
describe('Portfolio integrity', () => {
  it('retains all 12 original samples and adds the new Roblox sample', () => {
    const originalIds = ['1IA007oPmuwiJZTf_V0omyJHpTqDYbmL-', '1V7LX2KYjlp8XZ707g6D-eBb81j-0GYBj', '1OTrgvi49DHt97nVHEw7EcdwyhLRDAuqa', '15WLHKHZMgXe3l_ipoE_HYjAIlDyo_nPc', '1AS1XuIN4giXJhNEg0DkaSaYgwyxTHfq1', 'GVTeMVqFJzI', '1yzU_ZpqUaSzOgGGNn2EFVgJ_271t1J21', '1iGEYcnFHQn_Dnb8vnV42QmEXSZYCFQ_J', '16agkwkqhdy6j7krimkpBeOL2tW1EihIa', '1QGTHENrttWjYKPO_-3z_ML-v1uPtsIOY', '17uclJyku9thvRQa3rhjTWGxHBUv14QSS', '1qdv2jBxViXFuQ--ZgS8qgRduFBr1pDAK'];
    expect(VIDEOS).toHaveLength(13);
    expect(VIDEOS.map(video => video.id)).toEqual([...originalIds.slice(0, 6), '6-AOe_Lnvp0', ...originalIds.slice(6)]);
  });
  it('uses the provided Roblox YouTube ID for its thumbnail and playable embed', () => {
    const addedVideo = VIDEOS.find(video => video.id === '6-AOe_Lnvp0');
    expect(addedVideo).toEqual({ id: '6-AOe_Lnvp0', cat: 'Roblox', yt: true });
    if (!addedVideo) throw new Error('New Roblox sample is missing');
    expect(thumb(addedVideo)).toBe('https://img.youtube.com/vi/6-AOe_Lnvp0/hqdefault.jpg');
    expect(embed(addedVideo)).toBe('https://www.youtube.com/embed/6-AOe_Lnvp0?autoplay=1');
    expect(VIDEOS.filter(video => video.cat === 'Roblox')).toHaveLength(2);
  });
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
