import { debounce, throttle } from 'lodash';
import { DataCallback } from '../models/types';
import { Level } from '../models/base';

export function getUID(prefix?: string, postfix?: string) {
  const rndId = Math.ceil(Math.random() * 1000);
  return (prefix ? `${prefix}_` : '') + `${rndId}` + (postfix ? `_${postfix}` : '');
}

export function debouncedChangeHandler(actualHandler: DataCallback<string>) {
  const callback = debounce(actualHandler, 100);
  return (e: React.ChangeEvent<HTMLInputElement>) => callback(e.target.value);
}

export function throttledChangeHandler(actualHandler: DataCallback<number>) {
  const callback = throttle(actualHandler, 100);
  return (e: React.ChangeEvent<HTMLInputElement>) => callback(parseFloat(e.target.value));
}

export function throttledCallback<T = number>(actualHandler: DataCallback<T>) {
  const callback = throttle(actualHandler, 100);
  return (value: T) => callback(value);
}

export function parseLevel(value: number) {
  return parseFloat(value.toFixed(2)) as Level;
}
