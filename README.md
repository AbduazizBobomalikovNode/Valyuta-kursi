# Valyuta kursi

O'zbekiston banklarining valyuta kurslarini bir joyga yig'adigan Telegram bot — grafik va kalkulyatorlari bilan.

---

## Muammo

Valyuta almashtirmoqchi bo'lgan odam bir nechta kursga duch keladi: Markaziy bank kursi bir xil, har tijorat bankida boshqacha, bozorda yana boshqa. Eng qulayini topish uchun saytlarni birma-bir ochib chiqish kerak.

Kurs qay tomonga o'zgarayotganini bilish uchun esa kecha nima bo'lganini eslash kerak — buni hech kim yozib bormaydi.

Kredit yoki omonat hisobi ham shunday: har bankning o'z kalkulyatori, har biri boshqacha ko'rinishda.

## Nima qiladi

- **Kurslarni o'zi yig'adi** — Markaziy bank, tijorat banklari va bozor kursi
- **Tarixni saqlaydi** — shuning uchun o'zgarishni ko'rsata oladi
- **Grafik chizadi** — kurs dinamikasi rasm bo'lib chatga keladi
- **Hisoblab beradi** — kredit to'lovi va omonat foizi
- **Lotin va kirill** — foydalanuvchi qanday yozsa, shunday tushunadi

## Qanday ishlaydi

Ba'zi banklar kursni API orqali bermaydi — faqat saytda ko'rsatadi. Shu sababli bot sahifani brauzerda ochib o'qiydi (Puppeteer), keyin ma'lumotni bazaga yozadi.

```
Bank saytlari
     │  Puppeteer sahifani ochib o'qiydi
     ▼
  MongoDB  ──►  tarix to'planadi
     │
     ├─► grafik chiziladi        (Python: plotly + kaleido)
     └─► Telegram'ga yuboriladi  (Telegraf)
```

Grafik Python tomonida chiziladi — `plotly` bilan yasalib, `kaleido` orqali rasmga o'giriladi va botga qaytariladi.

## O'rnatish

```bash
git clone https://github.com/AbduazizBobomalikovNode/Valyuta-kursi.git
cd Valyuta-kursi
npm install
pip install -r requirements.txt      # plotly, kaleido, pymongo

cp .env.example .env
npm start
```

Kerak bo'ladi: Node.js 16+, Python 3, MongoDB. Puppeteer o'rnatilganda Chromium'ni o'zi yuklab oladi.

## Environment

| O'zgaruvchi | Nima uchun |
|---|---|
| `BOT_TOKEN` | [@BotFather](https://t.me/BotFather) bergan token |
| `NAME_BOT` | Bot foydalanuvchi nomi |
| `DATE_URL` | MongoDB ulanish satri |
| `PORT` | Server porti |
| `YOUR_HOST` | Tashqi manzil (webhook uchun) |

## Tuzilma

```
index.js         bot va server
updateData/      bank saytlaridan kurs yig'ish (Puppeteer)
plot/            grafik chizish (Python)
maxfunction/     hisob-kitob funksiyalari
DB/              MongoDB ulanishi
text/            xabar matnlari
Procfile         serverga joylash uchun
```

## Texnologiyalar

Node.js · Telegraf · Puppeteer · MongoDB (Mongoose) · Express · Python (plotly, kaleido)
