import {Menu, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CryptocurrencyCard from "./components/CryptocurrencyCard.jsx";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const App = () => {
    const [currencies, setCurrencies] = useState([]);
    const [currencyId, setCurrencyId] = useState(1);
    const [currencyData, setCurrencyData] = useState(null);

    const fetchCurrencies = () => {
        axios.get('http://127.0.0.1:3000/cryptocurrencies/').then((res) => {
            // console.log(response.data);
            const currenciesResponse = res.data;
            const menuItems = [
                getItem('Список криптовалют', 'g1', null,
                    currenciesResponse.map(c => {
                        return {label: c.name, key: c.id}
                    }),
                    'group',
                )
            ];
            setCurrencies(menuItems);
        })
            .catch((error) => {
                if (error.response) {
                    console.error("Error:", error.message);
                }
            });
    }

    const fetchCurrency = () => {
        axios.get(`http://127.0.0.1:3000/cryptocurrency/${currencyId}`).then((res) => {
            // console.log(res.data);
            setCurrencyData(res.data);
        })
    }

    useEffect(() => {
        fetchCurrencies();
    }, []);


    useEffect(() => {
        setCurrencyData(null);
        fetchCurrency();
    }, [currencyId]);


    const onClick = (e) => {
        // console.log(e.key);
        setCurrencyId(e.key)

    };
    return (
        <div className="flex ">
            <Menu
                onClick={onClick}
                style={{
                    width: 256,
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={currencies}
                className="h-screen overflow-scroll"
            />

            <div className="m-auto">
                {currencyData ? <CryptocurrencyCard currency={currencyData}/> : <Spin size="large"/>}
            </div>

        </div>

    );
};
export default App;