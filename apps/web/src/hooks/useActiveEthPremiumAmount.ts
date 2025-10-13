import { useBasenamesLaunchTime } from 'apps/web/src/hooks/useBasenamesLaunchTime';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 60 * SECONDS_IN_A_MINUTE;
const SECONDS_IN_A_DAY = 24 * SECONDS_IN_AN_HOUR;
const THIRTY_SIX_HOURS_IN_SECONDS = 36 * SECONDS_IN_AN_HOUR;

function formatTimeUnit(unit: number): string {
  return unit.toString().padStart(2, '0');
}

function calculateTimeLeft(differenceInSeconds: number): string {
  const days = Math.floor(differenceInSeconds / SECONDS_IN_A_DAY);
  const hours = Math.floor((differenceInSeconds % SECONDS_IN_A_DAY) / SECONDS_IN_AN_HOUR);
  const minutes = Math.floor((differenceInSeconds % SECONDS_IN_AN_HOUR) / SECONDS_IN_A_MINUTE);
  const seconds = differenceInSeconds % SECONDS_IN_A_MINUTE;

  return `${formatTimeUnit(days)}:${formatTimeUnit(hours)}:${formatTimeUnit(
    minutes,
  )}:${formatTimeUnit(seconds)}`;
}

export function usePremiumEndDurationRemaining() {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const { data: launchTimeSeconds } = useBasenamesLaunchTime();

  useInterval(() => {
    if (!launchTimeSeconds) return;

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const endTimeInSeconds = Number(launchTimeSeconds) + THIRTY_SIX_HOURS_IN_SECONDS;
    const timeDifference = endTimeInSeconds - currentTimeInSeconds;

    if (timeDifference > 0) {
      setTimeLeft(calculateTimeLeft(timeDifference));
    } else {
      setTimeLeft('00:00:00:00');
    }
  }, 1000);

  return { seconds: launchTimeSeconds, timestamp: timeLeft };
}
