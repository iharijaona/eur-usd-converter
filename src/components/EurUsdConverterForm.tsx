"use client";
import { FC, useState, useEffect } from "react";
import { ArrowsRightLeftIcon } from '@heroicons/react/24/solid';
import { MAX_DECIMAL_DIGITS } from "@/config";

interface EurUsdConverterFormProps {
  reverseConversion?: boolean;
  fromCurrenncy: string;
  exchangeRate: number;
  toCurrency: string;
}

export const EurUsdConverterForm: FC<EurUsdConverterFormProps> = ({ exchangeRate, fromCurrenncy, toCurrency, reverseConversion = false }) => {

  const [leftCurrencyValue, setLeftCurrencyValue] = useState(1);
  const [rightCurrencyValue, setRightCurrencyValue] = useState(leftCurrencyValue * exchangeRate);

  const setFixedFormat = (currencyValue: number) => Number(currencyValue.toFixed(MAX_DECIMAL_DIGITS));

  const handleFirstCurrencyValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setLeftCurrencyValue(value);
    setRightCurrencyValue(setFixedFormat(value * exchangeRate));
  };

  const handleSecondCurrencyValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setRightCurrencyValue(value);
    setLeftCurrencyValue(setFixedFormat(value / exchangeRate));
  };

  useEffect(() => {
    if (reverseConversion) {
      setLeftCurrencyValue(setFixedFormat(rightCurrencyValue / exchangeRate));
    } else {
      setRightCurrencyValue(setFixedFormat(leftCurrencyValue * exchangeRate));
    }
  }, [reverseConversion, exchangeRate]);

  return (
      <div className="mt-6 flex flex-row gap-2 items-center "> 
          <div>
            <div className="mt-2 relative">
              <input
                id="leftCurrencyValue"
                name="leftCurrencyValue"
                value={leftCurrencyValue}
                onChange={handleFirstCurrencyValueChange}
                type="number"
                disabled={reverseConversion}
                required={!reverseConversion}
                className={`block w-full rounded-md bg-slate-100 px-6 py-3 text-xl font-semibold text-gray-900 placeholder:text-gray-650 ${!reverseConversion ? 'ring-2 ring-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-800 outline-2 outline-offset-2 outline-blue-800' : ''}`}
              />
              <div className="absolute inset-y-0 end-0 flex items-center" >
                <span className="pr-2 text-3xl font-extrabold" >{fromCurrenncy}</span>
              </div>
            </div>
          </div>
          <div>
            <ArrowsRightLeftIcon className="h-8 w-8 text-gray-900" />
          </div>
          <div>
            <div className="mt-2 relative">
              <input
                id="rightCurrencyValue"
                name="rightCurrencyValue"
                type="number"
                onChange={handleSecondCurrencyValueChange}
                value={rightCurrencyValue}
                disabled={!reverseConversion}
                required={reverseConversion}
                className={`block w-full rounded-md bg-slate-100 px-2 py-3 text-xl font-semibold text-gray-900  placeholder:text-gray-650 ${reverseConversion ? 'ring-2 ring-red-700 focus:outline-2 focus:outline-offset-2 focus:outline-red-700 outline-2 outline-offset-2 outline-red-700' : ''}`}
              />
              <div className="absolute inset-y-0 end-0 flex items-center" >
                <span className="pr-3 text-3xl font-extrabold " >{toCurrency}</span>
              </div>
            </div>
          </div>
      </div>
  );
};

export default EurUsdConverterForm;
