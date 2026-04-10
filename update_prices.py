import requests
import json
from datetime import datetime

def update_prices():
    # API uç noktaları
    products_url = "https://saglamoglualtin.com/marge/products"
    prices_url = "https://prdprc.saglamoglu.app/api/v1/prices/currentmarketproductprices"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    try:
        # 1. Ürün isimlerini çek
        products_resp = requests.get(products_url, headers=headers, timeout=15)
        products_resp.raise_for_status()
        products_data = products_resp.json().get('products', [])
        product_map = {p['id']: p['name'] for p in products_data}

        # 2. Canlı fiyatları çek
        prices_resp = requests.get(prices_url, headers=headers, timeout=15)
        prices_resp.raise_for_status()
        prices_data = prices_resp.json().get('data', [])

        # 3. Verileri birleştir
        combined_data = []
        for price in prices_data:
            p_id = price.get('marketProductId')
            if p_id in product_map:
                combined_data.append({
                    "name": product_map[p_id],
                    "buy": price.get('customerBuysAt'),
                    "sell": price.get('customerSellsAt'),
                    "updated_at": price.get('updatedAt')
                })

        # 4. JSON dosyasına kaydet
        output = {
            "last_update": datetime.now().isoformat(),
            "data": combined_data
        }
        
        with open("prices.json", "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False, indent=2)
            
        print(f"Başarıyla güncellendi: {len(combined_data)} ürün.")
        
    except Exception as e:
        print(f"Hata oluştu: {str(e)}")
        exit(1)

if __name__ == "__main__":
    update_prices()
