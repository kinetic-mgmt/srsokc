/* One place the membership prices come from.
   Every page that shows a price keeps the current figure written in the
   markup and marks it, so the page still reads correctly with no network.
   This then asks the same catalogue the Superior 365 app reads and replaces
   them, so a price the office changes reaches the website and the app's own
   pages without anyone editing HTML or shipping a release. */
(function () {
  var URL = 'https://pvcdtjzmzesivhnrexss.supabase.co/rest/v1/plans?select=key,monthly,annual&active=eq.true';
  var KEY = 'sb_publishable_8JPbFXzAJgUyGdnwUzZzLA_nXBi3cWP';
  function money(v, whole) {
    if (v === null || v === undefined || isNaN(Number(v))) return null;
    v = Number(v);
    return '$' + (whole && v % 1 === 0 ? v.toFixed(0) : v.toFixed(2));
  }
  fetch(URL, { headers: { apikey: KEY } })
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (rows) {
      rows.forEach(function (p) {
        var card = document.querySelector('[data-plan="' + p.key + '"]');
        if (!card) return;
        var m = card.querySelector('[data-m]'), a = card.querySelector('[data-a]');
        var mv = money(p.monthly), av = money(p.annual, true);
        if (m && mv) m.textContent = mv;
        if (a && av) a.textContent = av;
      });
    })
    .catch(function () {});
})();
