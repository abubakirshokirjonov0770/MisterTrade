# MisterTred Mobil

Kripto juftlar tahlili telefonda: BUY / SELL / KUTING, barcha taymfreymlar, skaner, kuzatuv va signallar natijasi.
Narxlar Binance Futures → Binance Spot → Binance (zaxira) → Bybit → OKX manbalaridan avtomatik olinadi.

## Fayllar
- `index.html` — butun ilova (strategiya yadrosi + interfeys)
- `sw.js` — service worker: ilova oflayn ochiladi, bildirishnoma bosilganda juft tahlili ochiladi
- `manifest.webmanifest`, `icon-*.png` — telefon bosh ekraniga o'rnatish uchun

## Imkoniyatlar
- Tanlangan taymfreym bo'yicha signal, kirish / SL / TP, hajm va leverage hisobi
- **Barcha taymfreymlar** jadvali (M5, M15, H1, H4, D1) va umumiy xulosa
- Interaktiv grafik: EMA20/50/200, hajm, barmoq bilan shamcha narxlari (O/H/L/C)
- Shamcha yopilishi bilan tahlil o'zi yangilanadi
- Tarixiy sinov: aniqlik, foyda omili, eng katta pasayish, balans o'zgarishi, natija egri chizig'i va oxirgi signallar
- Skaner: 30 / 50 / 100 ta eng faol juft, signallar kuchi bo'yicha saralanadi
- Kuzatuv: ovoz, titrash va telefon bildirishnomasi; signallar natijasini CSV ga yuklab olish
- Sozlamalar, kuzatuv va jurnalni faylga zaxira qilish va tiklash
- **Telegram signal kanallari**: Sozlama bo'limida ochiq kanal havolasini qo'shing — kanalda yangi BUY/SELL signal chiqishi bilan ilova ovoz, titrash, bildirishnoma va ekrandagi xabar bilan aytadi. Signaldan juft, kirish, SL va TP avtomatik ajratiladi; bir bosishda ilova tahlili bilan solishtirish yoki natijasini (TP/SL) kuzatish mumkin

## Telegram kanallari haqida
- Faqat **ochiq** kanallar ishlaydi (`t.me/kanal_nomi`). Yopiq (`t.me/+...`) kanal va guruhlarni o'qib bo'lmaydi.
- Ilova serversiz ishlaydi, shuning uchun tekshiruv ilova ochiq (yoki fonda) turganda bo'ladi — 30 soniyadan 5 daqiqagacha oraliqda.
- Telegram sahifasini brauzer to'g'ridan-to'g'ri o'qiy olmaydi, shu sababli ochiq proksilar (corsproxy.io, allorigins, codetabs) ishlatiladi. Ularga faqat ochiq kanal nomi yuboriladi.
- Ishonchliroq bo'lishi uchun o'z proksingizni qo'ying: `telegram-proxy/worker.js` ni Cloudflare Workers'ga (bepul) joylang va manzilini `https://<nom>.workers.dev/?url={url}` ko'rinishida Sozlama → "O'z proksi manzilingiz" ga yozing.

Ilova savdoni o'zi ochmaydi va 100% kafolat bermaydi — har doim stop-loss qo'ying.
