export type Cat = "Roblox" | "Minecraft" | "Vlog" | "Business" | "IRL Game" | "Fortnite";
export type Video = { id: string; cat: Cat; yt?: boolean };

export const VIDEOS: Video[] = [
  { id: "1IA007oPmuwiJZTf_V0omyJHpTqDYbmL-", cat: "Minecraft" },
  { id: "1V7LX2KYjlp8XZ707g6D-eBb81j-0GYBj", cat: "Minecraft" },
  { id: "1OTrgvi49DHt97nVHEw7EcdwyhLRDAuqa", cat: "Minecraft" },
  { id: "15WLHKHZMgXe3l_ipoE_HYjAIlDyo_nPc", cat: "Minecraft" },
  { id: "1AS1XuIN4giXJhNEg0DkaSaYgwyxTHfq1", cat: "Minecraft" },
  { id: "GVTeMVqFJzI", cat: "Roblox", yt: true },
  { id: "1yzU_ZpqUaSzOgGGNn2EFVgJ_271t1J21", cat: "Vlog" },
  { id: "1iGEYcnFHQn_Dnb8vnV42QmEXSZYCFQ_J", cat: "IRL Game" },
  { id: "16agkwkqhdy6j7krimkpBeOL2tW1EihIa", cat: "Fortnite" },
  { id: "1QGTHENrttWjYKPO_-3z_ML-v1uPtsIOY", cat: "Business" },
  { id: "17uclJyku9thvRQa3rhjTWGxHBUv14QSS", cat: "Business" },
  { id: "1qdv2jBxViXFuQ--ZgS8qgRduFBr1pDAK", cat: "Business" },
];
export const FILTERS = ["All", "Roblox", "Minecraft", "Vlog", "Business", "IRL Game", "Fortnite"] as const;

export const thumb = (v: Video) =>
  v.yt ? `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` : `https://drive.google.com/thumbnail?id=${v.id}&sz=w1200`;
export const embed = (v: Video) =>
  v.yt ? `https://www.youtube.com/embed/${v.id}?autoplay=1` : `https://drive.google.com/file/d/${v.id}/preview`;

export const EMAIL = "tanishqvarshney42@gmail.com";
export const DISCORD = "https://discord.com/app";

