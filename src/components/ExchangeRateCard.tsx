
"use client";

import { MAX_DECIMAL_DIGITS } from '@/config';
import { FC } from 'react';

interface ExchangeRateCardProps {
    fromCurrenncy: string;
    exchangeRate: number;
    toCurrency: string;
    fixedRate?: number;
    onChangeFixedRate: (newRate: number) => void
}

export const ExchangeRateCard: FC<ExchangeRateCardProps> = ({ fromCurrenncy, toCurrency, exchangeRate, fixedRate, onChangeFixedRate }) => {
    return (
        <div className='grid grid-cols-2 gap-3' >
            <div className='text-center' >
                <h2 className='py-3 font-semibold' >Taux de change {fromCurrenncy} / {toCurrency}</h2>
                <p className='w-full rounded-md bg-slate-100 px-3 py-3 text-3xl font-extrabold text-gray-900 outline-2 outline-offset-2 outline-gray-600 placeholder:text-gray-650' >{exchangeRate.toFixed(MAX_DECIMAL_DIGITS)}</p>
            </div>
            <div className='text-center' >
                <h2 className='py-3 font-semibold' >Taux fixe {fromCurrenncy} / {toCurrency}</h2>
                <input
                    id="rightCurrencyValue"
                    name="rightCurrencyValue"
                    type="number"
                    onChange={(event) => onChangeFixedRate(Number(event.target.value))}
                    value={fixedRate}
                    className='w-full rounded-md bg-slate-100 px-3 py-3 text-3xl font-extrabold text-gray-900 outline-2 outline-offset-2 outline-gray-600 placeholder:text-gray-650'
                />
            </div>
        </div>
    );
}