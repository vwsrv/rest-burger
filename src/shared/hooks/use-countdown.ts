import { useState, useEffect } from 'react';

type TUseCountdownParams = {
  initialValue?: number;
  isActive: boolean;
  onComplete?: () => void;
};

export const useCountdown = ({
  initialValue = 3,
  isActive,
  onComplete,
}: TUseCountdownParams) => {
  const [countdown, setCountdown] = useState(initialValue);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (countdown === 0 && onComplete) {
      onComplete();
    }
  }, [isActive, countdown, onComplete]);

  const reset = (value?: number): void => {
    setCountdown(value ?? initialValue);
  };

  return { countdown, reset };
};
