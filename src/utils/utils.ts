export function getUID(prefix: string, postfix?: string) {
  const rndId = Math.ceil(Math.random() * 1000);
  return `${prefix}_${rndId}` + (postfix ? `_${postfix}` : '');
}
