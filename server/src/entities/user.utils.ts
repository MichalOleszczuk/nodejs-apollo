export const spriteNames = [
  'male',
  'female',
  'human',
  'identicon',
  'initials',
  'bottts',
  'avataaars',
  'jdenticon',
  'gridy',
  'code',
] as const;

export const defaultUserUrl = (sprite: typeof spriteNames[number]) =>
  `https://avatars.dicebear.com/api/${sprite}/seed.svg`;

export function userDefaultAvatar() {
  const randomSpriteName = spriteNames[Math.floor(Math.random() * spriteNames.length)];
  return defaultUserUrl(randomSpriteName);
}
