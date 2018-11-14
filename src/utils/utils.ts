import { debounce, throttle } from 'lodash';
import { DataCallback } from '../models/types';

export function getUID(prefix: string, postfix?: string) {
  const rndId = Math.ceil(Math.random() * 1000);
  return `${prefix}_${rndId}` + (postfix ? `_${postfix}` : '');
}

export function debouncedChangeHandler(actualHandler: DataCallback<string>) {
  const callback = debounce(actualHandler, 100);
  return (e: React.ChangeEvent<HTMLInputElement>) => callback(e.target.value);
}

export function throttledChangeHandler(actualHandler: DataCallback<string>) {
  const callback = throttle(actualHandler, 100);
  return (e: React.ChangeEvent<HTMLInputElement>) => callback(e.target.value);
}
