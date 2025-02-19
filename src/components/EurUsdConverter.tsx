"use client";
import { FC, useState } from "react";
import { Switch } from '@headlessui/react';
import { ExchangeRateCard } from "@/components/ExchangeRateCard";
import { useEurUsdExchangeRate } from "@/services/exchangeRate";
import EurUsdConverterForm from "@/components/EurUsdConverterForm";
import { EUR_CURRENCY, FIXED_RATE_VARIATION_THRESHOLD, USD_CURRENCY } from "@/config";


export const EurUsdConverter: FC = () => {
  const eurToUsdExchangeRate = useEurUsdExchangeRate();
  const [customFixedRate, setCustomFixedRate] = useState<number | undefined>();
  const [isReverseConversion, setReverseConversion] = useState<boolean>(false);

  let currentExhangeRate = eurToUsdExchangeRate;
  if (customFixedRate !== undefined) {
    const rateVariationPercent = Math.abs((currentExhangeRate - customFixedRate) / customFixedRate);
    if (rateVariationPercent < FIXED_RATE_VARIATION_THRESHOLD) {
        currentExhangeRate = customFixedRate;
    }
  }

  return (
    <div className="flex flex-col items-center max-w-xl p-8 gap-y-1 bg-white border border-gray-200 rounded-lg shadow-sm" >
        <ExchangeRateCard
            fromCurrenncy={EUR_CURRENCY}
            toCurrency={USD_CURRENCY}
            exchangeRate={eurToUsdExchangeRate}
            fixedRate={customFixedRate}
            onChangeFixedRate={(newRate) => setCustomFixedRate(newRate)}
        />
        <div className="flex items-center my-3">
            <label 
                htmlFor="eur-usd-switch" 
                className="text-base font-bold text-blue-800 me-3">
                    {EUR_CURRENCY}
            </label>
            <Switch
                checked={isReverseConversion}
                onChange={setReverseConversion}
                className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-blue-800 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-red-700"
                >
                <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                />
            </Switch>
            <label 
                htmlFor="eur-usd-switch" 
                className="text-base font-bold text-red-700 ms-3 ">
                    {USD_CURRENCY}
            </label>
        </div>
        <hr className="w-full border-(--pattern-fg)" />
        <EurUsdConverterForm
            reverseConversion={isReverseConversion}
            fromCurrenncy={EUR_CURRENCY}
            toCurrency={USD_CURRENCY}
            exchangeRate={currentExhangeRate}
        />
    </div>
  );
};

export default EurUsdConverter;
