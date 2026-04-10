# Sağlamoğlu Altın Fiyat Takip Sistemi

Bu proje, Sağlamoğlu Altın API'lerinden verileri otomatik olarak çekip bir web sayfasında gösteren basit bir sistemdir.

## Nasıl Kullanılır?

1.  **GitHub'a Yükleyin:** Bu klasördeki tüm dosyaları yeni bir GitHub deposuna (repository) yükleyin.
2.  **GitHub Actions:** `.github/workflows/update.yml` dosyası sayesinde her 5 dakikada bir veriler otomatik güncellenecektir.
3.  **GitHub Pages:** Ayarlardan (Settings > Pages) GitHub Pages'i aktif ederek `index.html` sayfanızı canlıya alabilirsiniz.

## Dosya Yapısı
*   `index.html`: Fiyatların gösterildiği ana sayfa.
*   `update_prices.py`: Veriyi çeken Python betiği.
*   `prices.json`: Çekilen verilerin saklandığı dosya (Otomatik oluşur).
*   `.github/workflows/update.yml`: Otomatik güncelleme iş akışı.

**Not:** İlk yüklemeden sonra verilerin görünmesi için GitHub Actions'ın bir kez çalışması veya yerel olarak `python update_prices.py` komutunu çalıştırmanız gerekir.
