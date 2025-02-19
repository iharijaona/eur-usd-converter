"use client";

import { INITIAL_EUR_TO_USD_RATE, POLLING_INTERVAL } from "@/config";
import { useEffect, useState } from "react";

export const useEurUsdExchangeRate = (): number => {

  const [eurUsdExchangeRate, setEurUsdExchangeRate] = useState<number>(INITIAL_EUR_TO_USD_RATE);

  useEffect(() => {
    const interval = setInterval(() => {
      setEurUsdExchangeRate((prev) => {
        const randomValue = Math.random() * 0.1 - 0.05;
        return prev + randomValue;
      });
    }, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return eurUsdExchangeRate;
};

export default useEurUsdExchangeRate;
