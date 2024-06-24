import {Card} from 'antd';
import React from 'react';

export default function CryptocurrencyCard(props) {

    function numberFormat(num, options) {
        let temp = 2;
        if (num < 1 && num > 0.0001) {
            temp = 4;
        }
        if (num < 0.0001) {
            temp = 8;
        }
        let defaultOptions = {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: temp,
            minimumFractionDigits: 2,
            notation: 'standard',
            compactDisplay: 'long',
        };
        return new Intl.NumberFormat('en-US', {...defaultOptions, ...options}).format(num);
    }

    const {currency} = props;
    const price = Math.round(currency.quote.USD.price * 100) / 100;
    const marketCap = numberFormat(currency.quote.USD.market_cap, {notation: 'compact', compactDisplay: 'short',});

    const renderPercentage = num => {
        return num > 0 ? <span className="text-green-500">{num}%</span> : <span className="text-red-500">{num}%</span>
    }

    return (
        <>
            <Card
                title={
                    <div className="flex items-center gap-3">
                        <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} alt="img"
                             style={{width: 40}}/>
                        <span>{currency.name}</span>
                    </div>
                }
                style={{
                    width: 400,
                }}
            >
                <p><strong>Текущая цена:</strong> {price}$</p>
                <p><strong>Изменение цены за 24 часа:</strong> <span>{renderPercentage(currency.quote.USD.percent_change_24h)}</span></p>
                <p><strong>Текущая капитализация:</strong> {marketCap}</p>
                <p><strong>Последнее обновление:</strong> {new Date(currency.last_updated).toLocaleString().replace(/,/g, ' ')}</p>
            </Card>

        </>
    )
}

