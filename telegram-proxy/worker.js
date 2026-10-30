/* MisterTred — Telegram kanallari uchun shaxsiy proksi (Cloudflare Worker).
   Faqat ochiq kanal sahifalarini (https://t.me/s/...) o'qiydi, boshqa manzillarga ruxsat yo'q.
   Ilovada: Sozlama → Telegram signal kanallari → "O'z proksi manzilingiz":
   https://<worker-nomi>.<akkaunt>.workers.dev/?url={url} */
export default {
  async fetch(request) {
    const target = new URL(request.url).searchParams.get("url") || "";
    if (!/^https:\/\/t\.me\/s\/[A-Za-z0-9_]{4,32}(\?[\w=&]*)?$/.test(target)) {
      return new Response("Faqat https://t.me/s/<kanal> manzili qabul qilinadi", { status: 400, headers: { "access-control-allow-origin": "*" } });
    }
    const res = await fetch(target, { headers: { "user-agent": "Mozilla/5.0 (MisterTred)" }, cf: { cacheTtl: 15 } });
    return new Response(await res.text(), {
      status: res.status,
      headers: { "content-type": "text/html; charset=utf-8", "access-control-allow-origin": "*", "cache-control": "max-age=15" }
    });
  }
};
