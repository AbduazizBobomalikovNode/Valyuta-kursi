# Valyuta Kursi

Ushbu loyiha valyuta kurslarini boshqarish va ko'rib chiqish uchun mo'ljallangan. Loyiha Node.js asosida yaratilgan va turli funksionalliklarni amalga oshirish uchun bir nechta modullardan foydalanadi.

## Loyihaning Asosiy Xususiyatlari
- **Valyuta kurslari haqida ma'lumot olish**: Markaziy bank, bozor va boshqa manbalar asosida valyuta kurslari haqida ma'lumot.
- **Diagrammalar yaratish**: Valyuta kurslarining o'zgarishini tasvirlash uchun grafiklar va diagrammalar.
- **Ma'lumotlarni yangilash**: Kurslar ma'lumotlarini avtomatik ravishda yangilash funksiyasi.

## Loyiha Tuzilishi

### Asosiy Fayllar va Papkalar
- **`index.js`**: Loyihaning kirish nuqtasi. Dastur shu fayldan ishga tushiriladi.
- **`package.json`**: Loyihaning konfiguratsiyasi va bog'lamlari.
- **`DB/`**: Valyuta ma'lumotlari bilan ishlovchi fayllar.
- **`maxfunction/`**: Modullarga bo'lingan maxsus funksiyalar (masalan, USD, RUB kurslari bilan ishlash).
- **`plot/`**: Grafiklar yaratish uchun Python va JavaScript kodlari.
- **`text/`**: Loyihaga oid turli matnli fayllar.
- **`images/`**: Diagrammalar va valyuta kurslari tasvirlari.

## O'rnatish

Loyihani ishlatish uchun quyidagi qadamlarni bajaring:

1. Repozitoriyani klonlash:
   ```bash
   git clone https://github.com/AbduazizBobomalikovNode/Valyuta-kursi.git
   cd Valyuta-kursi
   ```
2. Kerakli bog'lamlarni o'rnatish:
   ```bash
   npm install
   ```
3. Loyihani ishga tushirish:
   ```bash
   pip install -r requirements.txt
   ```
4. Loyihani ishga tushirish:
   ```bash
   node index.js
   ```

## Kerakli Dasturlar
- Node.js (v16 yoki undan yuqori)
- Python (agar grafiklar yaratish funksiyasi kerak bo'lsa)

## 🔐 Muhit o'zgaruvchilari
  - BOT_TOKEN - sizning  telegram bot  tokeningiz
  - DATABASE_URL - sizning  MongoDb   cloud dagi tokeningiz

## ⚙ Muhit o'zgaruvchilari Muhitga taminlash
1. Windows muhiti uchun:
   ```bash
   set BOT_TOKEN=sizning_telegram_bot_tokeningiz
   set DATABASE_URL=sizning_MongoDb_cloud_dagi_tokeningiz
   ```
2. Linux muhiti uchun:
   ```bash
   export BOT_TOKEN="sizning_telegram_bot_tokeningiz"
   export DATABASE_URL="sizning_MongoDb_cloud_dagi_tokeningiz"
   ```

## Foydalanish

Loyihani ishga tushirgandan so'ng, quyidagi funksionalliklardan foydalanishingiz mumkin:
- Valyuta kurslarini olish.
- Kurslar asosida grafiklar va diagrammalarni yaratish.
- Ma'lumotlarni yangilash va boshqarish.


## Hissa Qo'shish

Agar loyihani rivojlantirishga hissa qo'shmoqchi bo'lsangiz:
1. Repozitoriyani fork qiling.
2. O'zingizning branchingizni yarating:
   ```bash
   git checkout -b yangi-branch
   ```
3. O'zgartirishlarni bajaring va commit qiling.
   ```bash
   git commit -m "O'zgartirish tavsifi"
   ```
4. Pull request yuboring.

## 📧 Bog'lanish

Loyiha haqida savollaringiz bo'lsa, quyidagi manzilga murojaat qiling:
- **Muallif:** [Abduaziz Bobomalikov](https://github.com/AbduazizBobomalikovNode)
- **Telegram:** [Abduaziz Bobomalikov](https://t.me/Bobomalikov_Abduaziz)


## Litsenziya

Ushbu loyiha [MIT Litsenziyasi](https://opensource.org/licenses/MIT) ostida tarqatiladi.

