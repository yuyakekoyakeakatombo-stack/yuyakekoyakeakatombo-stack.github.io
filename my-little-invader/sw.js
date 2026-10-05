// ════════════════════════════════════════════════════════════
//  My Little Invader — Service Worker の後片付け用
//
//  Web 版（旧リポジトリ my-little-invader の GitHub Pages）は、
//  ゲーム一式を端末に保管する Service Worker を /my-little-invader/ に登録していた。
//  Web 版の公開を止めてこのサイトに切り替わったあと、遊んでいた人の端末に
//  古い保管庫が残って、画像などが古いまま出続けるのを防ぐ。
//
//  ブラウザが旧ワーカーの更新を確認しに来ると、このファイルが届く。
//  入れ替わったらすぐ保管庫を空にして、自分の登録も外す（以後は普通のページとして動く）。
//  旧サイトが公開中のあいだは旧サイトのほうが優先されるので、このファイルは使われない。
// ════════════════════════════════════════════════════════════
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('mli-')).map(k => caches.delete(k)));
    await self.registration.unregister();
    const pages = await self.clients.matchAll({ type: 'window' });
    pages.forEach(p => p.navigate(p.url));   // 開いているページを、保管庫を通さずに読み直す
  })());
});
