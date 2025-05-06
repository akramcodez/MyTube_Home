const LEADING_ZERO_FORMATTER = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

export function timeToSeconds(timeStr: string) {
  const parts = timeStr.split(':').map(Number);

  let hours = 0,
    minutes = 0,
    seconds = 0;

  if (parts.length === 3) {
    [hours, minutes, seconds] = parts;
  } else if (parts.length === 2) {
    [minutes, seconds] = parts;
  } else if (parts.length === 1) {
    [seconds] = parts;
  }

  return hours * 3600 + minutes * 60 + seconds;
}

export function formatDuration(duration: number) {
  const hours = Math.floor(duration / 60 / 60);
  const minutes = Math.floor((duration - hours * 60 * 60) / 60);
  const seconds = duration % 60;

  if (hours > 0) {
    return `${hours} : ${LEADING_ZERO_FORMATTER.format(
      minutes,
    )} : ${LEADING_ZERO_FORMATTER.format(seconds)}`;
  }

  return `${minutes} : ${LEADING_ZERO_FORMATTER.format(seconds)}`;
}

export function viewstoNum(viewsStr: string): number {
  const suffix = viewsStr.slice(-1).toUpperCase();
  const number = parseFloat(viewsStr);

  switch (suffix) {
    case 'K':
      return number * 1_000;
    case 'M':
      return number * 1_000_000;
    case 'B':
      return number * 1_000_000_000;
    default:
      return parseFloat(viewsStr);
  }
}

const RELATIVE_TIME_FORMATTER = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'always',
});

const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' }, // average weeks per month
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' },
];

export function formatTimeAgo(date: Date): string {
  let duration = (date.getTime() - Date.now()) / 1000; // in seconds

  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return RELATIVE_TIME_FORMATTER.format(
        Math.round(duration),
        division.name,
      );
    }
    duration /= division.amount;
  }

  return 'just now';
}
