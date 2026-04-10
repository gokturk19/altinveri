/**
 * Saglamoglu Altın Fast Refresh Client
 * Harem Altın WebSocket mantığına benzer, ancak Sağlamoğlu API'si için optimize edilmiştir.
 */
(function (window) {
    'use strict';

    var PRODUCTS_URL = "https://saglamoglualtin.com/marge/products";
    var PRICES_URL = "https://prdprc.saglamoglu.app/api/v1/prices/currentmarketproductprices";
    
    var productMap = {};
    var updateInterval = 3000; // 3 saniye
    var onUpdateCallback = null;

    async function fetchProducts() {
        try {
            const response = await fetch(PRODUCTS_URL);
            const data = await response.json();
            data.products.forEach(p => {
                productMap[p.id] = p.name;
            });
            console.log('[Saglamoglu] Ürün listesi güncellendi.');
        } catch (e) {
            console.error('[Saglamoglu] Ürün listesi alınamadı:', e);
        }
    }

    async function fetchPrices() {
        try {
            const response = await fetch(PRICES_URL);
            const data = await response.json();
            
            var processedPrices = data.data.map(item => {
                return {
                    name: productMap[item.marketProductId] || 'Bilinmeyen Ürün',
                    buy: item.customerBuysAt,
                    sell: item.customerSellsAt,
                    time: new Date(item.updatedAt).toLocaleTimeString('tr-TR')
                };
            }).filter(item => item.name !== 'Bilinmeyen Ürün');

            if (onUpdateCallback) {
                onUpdateCallback(processedPrices);
            }
        } catch (e) {
            console.error('[Saglamoglu] Fiyatlar alınamadı:', e);
        }
    }

    function start(callback) {
        onUpdateCallback = callback;
        fetchProducts().then(() => {
            fetchPrices();
            setInterval(fetchPrices, updateInterval);
        });
        
        // Ürün listesini saatte bir güncelle
        setInterval(fetchProducts, 3600000);
    }

    window.SaglamogluAPI = {
        start: start
    };

})(window);
