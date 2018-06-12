// @flow

export function minToSec(min: number): number {
  return min * 60;
}
export function friendlyTime(sec: number): string {
  const minutes = Math.floor(sec / 60);
  const seconds = sec - minutes * 60;
  return `${str_pad_left(minutes, '0', 2)}:${str_pad_left(seconds, '0', 2)}`;
}

function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}
