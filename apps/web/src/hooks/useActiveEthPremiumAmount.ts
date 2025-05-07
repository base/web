import { useBasenamesLaunchTime } from 'apps/web/src/hooks/useBasenamesLaunchTime';
import { useState, useMemo } from 'react';
import { useInterval } from 'usehooks-ts';

const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 60 * SECONDS_IN_A_MINUTE;
const SECONDS_IN_A_DAY = 24 * SECONDS_IN_AN_HOUR;
const THIRTY_SIX_HOURS_IN_SECONDS = 36 * SECONDS_IN_AN_HOUR;

interface TimeComponents {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function formatTimeUnit(unit: number): string {
  return unit.toString().padStart(2, '0');
}

function calculateTimeComponents(differenceInSeconds: number): TimeComponents {
  const days = Math.floor(differenceInSeconds / SECONDS_IN_A_DAY);
  const hours = Math.floor((differenceInSeconds % SECONDS_IN_A_DAY) / SECONDS_IN_AN_HOUR);
  const minutes = Math.floor((differenceInSeconds % SECONDS_IN_AN_HOUR) / SECONDS_IN_A_MINUTE);
  const seconds = differenceInSeconds % SECONDS_IN_A_MINUTE;

  return { days, hours, minutes, seconds };
}

function formatTime({ days, hours, minutes, seconds }: TimeComponents): string {
  return `${formatTimeUnit(days)}:${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}`;
}

export function usePremiumEndDurationRemaining() {
  const [timeLeft, setTimeLeft] = useState<string>('00:00:00:00');
  const { data: launchTimeSeconds } = useBasenamesLaunchTime();

  const endTimeInSeconds = useMemo(() => {
    if (!launchTimeSeconds || isNaN(Number(launchTimeSeconds))) {
      return null;
    }
    return Number(launchTimeSeconds) + THIRTY_SIX_HOURS_IN_SECONDS;
  }, [launchTimeSeconds]);

  useInterval(
    () => {
      if (!endTimeInSeconds) {
        setTimeLeft('00:00:00:00');
        return;
      }

      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const timeDifference = endTimeInSeconds - currentTimeInSeconds;

      if (timeDifference > 0) {
        const components = calculateTimeComponents(timeDifference);
        setTimeLeft(formatTime(components));
      } else {
        setTimeLeft('00:00:00:00');
      }
    },
    endTimeInSeconds ? 1000 : null,
  );

  return {
    launchTimeSeconds,
    timeLeft,
    isLoading: !launchTimeSeconds,
    hasEnded: timeLeft === '00:00:00:00' && !!endTimeInSeconds,
  };
}
