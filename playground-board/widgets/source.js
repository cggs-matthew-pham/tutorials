// What a page gives away. A web page is sent whole to every visitor's browser, so its source (comments, hidden fields,
// scripts) and its files (a photo's details) can be read by anyone, even when the page doesn't show them. This board is
// a pretend page and its source; the student finds what it gives away, then fixes it. All of it is made up.
//   widget: source
//   set: club (default) | signup | archive         the page
//   mode: find (default) | fix
//     find: "View source" shows the page's source; each line and the photo's details can be marked as a leak
//           (buttons labelled "Line 4: mark as a leak", "Photo details: mark as a leak").
//     fix:  the leaks are shown; each has three fixes (the first in the data is right; wrong ones say why).
//   Values: v (1 once the source has been viewed), p (1 once the photo's details have been opened), l (leaks found),
//           n (leaks), x (lines marked that aren't leaks), f (leaks fixed), w (wrong fixes tried)
(function (B) {
  'use strict';
  var spec = null, ui = {}, st = null;
  // Each line: text, and leak: { id, why, fixes: [right, wrong, wrong], whyNot: ['', why wrong 1, why wrong 2], order }.
  var PAGES = {
    club: {
      title: 'Coding Club', shows: ['Coding Club', 'We meet every Friday in Room 12.', 'Join us: ask for the join code at the next meeting.', '[photo: our robot at the showcase]', '[Join box] [Join]'],
      photo: { name: 'showcase.jpg', details: ['Camera: phone', 'Taken: 14 Mar 2026, 3:42 pm', 'Location: −35.2810, 149.1290 (Ava\'s street)'], leak: { why: 'The photo\'s details hold where it was taken: someone\'s street.', fixes: ['Remove the location from the photo before uploading', 'Make the photo smaller on the page', 'Rename the photo'], whyNot: ['', 'The details are inside the file, whatever size it shows.', 'The name isn\'t where the location is kept.'], order: [1, 0, 2] } },
      lines: [
        { t: '<h1>Coding Club</h1>' },
        { t: '<!-- admin login: leader / robots2026 -->', leak: { why: 'A comment isn\'t shown on the page, but it is sent to every visitor.', fixes: ['Delete the comment and change that password', 'Make the comment shorter', 'Move the comment to the end of the page'], whyNot: ['', 'Any part of a password is too much, and it\'s still sent.', 'Visitors get the whole page, end included.'], order: [2, 0, 1] } },
        { t: '<p>We meet every Friday in Room 12.</p>' },
        { t: '<input type="hidden" value="ava@club.example, ben@club.example, chi@club.example">', leak: { why: 'A hidden field isn\'t shown, but its value is in the source for anyone.', fixes: ['Keep the member list on the server, never in the page', 'Make the text white', 'Give the field a dull name'], whyNot: ['', 'White text is still in the page.', 'The value is still there to read.'], order: [1, 2, 0] } },
        { t: '<img src="showcase.jpg" alt="Our robot at the showcase">' },
        { t: '<input id="code"> <button>Join</button>' },
        { t: '<script> if (code.value === "gears42") join(); </script>', leak: { why: 'The join code is in the script, so anyone can read it, and a check in the browser can be skipped.', fixes: ['Check the code on the server, not in the page', 'Hide the script at the bottom', 'Spell the code backwards in the script'], whyNot: ['', 'Scripts are sent and readable wherever they sit.', 'Anyone reading it can spell it forwards.'], order: [0, 2, 1] } },
      ],
    },
    signup: {
      title: 'Club sign-up', shows: ['Sign up for Coding Club', '[Name] [School email] [Password]', '[Sign up]'],
      lines: [
        { t: '<h1>Sign up for Coding Club</h1>' },
        { t: '<!-- TODO: remove test account test / test123 before launch -->', leak: { why: 'A note about a test account tells every visitor a way in.', fixes: ['Remove the test account and the comment', 'Change the comment to say "do not use"', 'Move it into a separate file the page loads'], whyNot: ['', 'The account still works, and the note still says how.', 'Files the page loads are sent to the visitor too.'], order: [1, 0, 2] } },
        { t: '<form action="/join">' },
        { t: '<input name="name"> <input name="email"> <input name="password" type="password">' },
        { t: '<script> if (password.value.length < 12) stop("Too short"); </script>', leak: { why: 'This check runs in the visitor\'s browser, which they control, so it can be skipped.', fixes: ['Check the length on the server as well', 'Make the check 20 characters instead', 'Hide the error message'], whyNot: ['', 'A longer rule in the browser can be skipped just the same.', 'Hiding the message doesn\'t make the check happen.'], order: [2, 0, 1] } },
        { t: '<script> const mapKey = "MAPKEY-7731-SECRET"; </script>', leak: { why: 'A private key in the page can be copied by anyone and used as the club.', fixes: ['Keep the key on the server and use it from there', 'Split the key into two variables', 'Rename the variable'], whyNot: ['', 'Both halves are still in the page.', 'The value is still there.'], order: [0, 1, 2] } },
        { t: '<a href="/drafts/">Drafts</a>', leak: { why: 'An unlisted page isn\'t private: anyone with the address can open it.', fixes: ['Put the drafts behind a sign-in', 'Remove the link but keep the page open', 'Call it something hard to guess'], whyNot: ['', 'Anyone who has the address can still open it.', 'Addresses get shared and found; it needs a sign-in.'], order: [1, 2, 0] } },
        { t: '</form>' },
      ],
    },
    archive: {
      title: 'Club archive (old)', shows: ['Coding Club archive', 'Members only.', '[Password] [Enter]'],
      lines: [
        { t: '<h1>Coding Club archive</h1>' },
        { t: '<p>Members only.</p>' },
        { t: '<input type="hidden" name="backup" value="WP{view-the-source}">', leak: { why: 'A hidden field isn\'t secret: its value is in the source.', fixes: ['Remove the backup value from the page', 'Make the field smaller', 'Add another hidden field'], whyNot: ['', 'Size doesn\'t matter: the value is still sent.', 'Two hidden values are two leaks.'], order: [2, 1, 0] } },
        { t: '<input id="pw"> <button>Enter</button>' },
        { t: '<script> if (pw.value === "archive") open("/files/"); </script>', leak: { why: 'The password and the files\' address are both readable, and the check can be skipped.', fixes: ['Check the password on the server and protect /files/ there', 'Use a longer password in the script', 'Put the script in a file of its own'], whyNot: ['', 'It is still in the page for anyone to read.', 'That file is sent to the visitor too.'], order: [1, 0, 2] } },
      ],
    },
  };

  function parse(s) {
    s.set0 = String(s.set || 'club').toLowerCase();
    if (!PAGES[s.set0]) throw new Error('set: club, signup or archive.');
    s.m = String(s.mode || 'find').toLowerCase();
    if (['find', 'fix'].indexOf(s.m) < 0) throw new Error('mode: find or fix.');
  }
  function h(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; }
  function btn(txt, fn, aria, cls) { var b = h('button', 'shbtn' + (cls ? ' ' + cls : ''), txt); b.type = 'button'; if (aria) b.setAttribute('aria-label', aria); b.addEventListener('click', function () { fn(); B.moved = true; update(); }); return b; }

  function leaks() {
    var p = PAGES[spec.set0], out = [];
    p.lines.forEach(function (ln, i) { if (ln.leak) out.push({ id: 'L' + i, label: 'Line ' + (i + 1), text: ln.t, leak: ln.leak }); });
    if (p.photo) out.push({ id: 'P', label: 'Photo details', text: p.photo.details.join(' · '), leak: p.photo.leak });
    return out;
  }
  function pageView(p) {
    var card = h('div', 'srpage'); card.setAttribute('aria-label', 'The page as visitors see it');
    p.shows.forEach(function (t, i) { card.appendChild(h(i ? 'p' : 'div', i ? (/^\[/.test(t) ? 'srctl' : '') : 'srtitle', t)); });
    return card;
  }
  function drawFind(wrap) {
    var p = PAGES[spec.set0], all = leaks(), l = 0, x = 0;
    var cols = h('div', 'srcols');
    var left = h('div', 'srcol'); left.appendChild(h('b', '', 'What visitors see')); left.appendChild(pageView(p));
    var bar = h('div', 'shbar');
    bar.appendChild(btn(st.view ? 'Hide source' : 'View source', function () { st.view = st.view ? 0 : 1; st.viewed = 1; }, st.view ? 'Hide source' : 'View source'));
    if (p.photo) bar.appendChild(btn(st.photo ? 'Hide photo details' : 'Photo details', function () { st.photo = st.photo ? 0 : 1; st.photoSeen = 1; }, st.photo ? 'Hide photo details' : 'Open the photo details'));
    left.appendChild(bar);
    if (p.photo && st.photo) {
      var pd = h('div', 'srphoto'); pd.appendChild(h('b', '', p.photo.name));
      p.photo.details.forEach(function (d) { pd.appendChild(h('div', '', d)); });
      var on = !!st.mark.P;
      pd.appendChild(btn(on ? 'Marked as a leak' : 'Mark as a leak', function () { st.mark.P = !st.mark.P; }, 'Photo details: ' + (on ? 'marked as a leak' : 'mark as a leak'), on ? 'on' : ''));
      left.appendChild(pd);
    }
    cols.appendChild(left);
    if (st.view) {
      var right = h('div', 'srcol'); right.appendChild(h('b', '', 'The source: what every visitor\'s browser receives'));
      var src = h('ol', 'srsrc');
      p.lines.forEach(function (ln, i) {
        var li = h('li', 'srline' + (st.mark['L' + i] ? ' marked' : ''));
        li.appendChild(h('code', '', ln.t));
        var on = !!st.mark['L' + i];
        li.appendChild(btn(on ? 'Leak' : 'Mark', function () { st.mark['L' + i] = !st.mark['L' + i]; }, 'Line ' + (i + 1) + ': ' + (on ? 'marked as a leak' : 'mark as a leak'), on ? 'on' : ''));
        src.appendChild(li);
      });
      right.appendChild(src); cols.appendChild(right);
    }
    wrap.appendChild(cols);
    Object.keys(st.mark).forEach(function (k) { if (!st.mark[k]) return; if (all.some(function (a) { return a.id === k; })) l++; else x++; });
    var res = h('p', 'srres', l + ' of ' + all.length + ' leaks marked' + (x ? '; ' + x + ' marked line' + (x > 1 ? 's give' : ' gives') + ' nothing away' : '') + '.');
    wrap.appendChild(res);
    ui.text = res.textContent;
    return { v: st.viewed, p: st.photoSeen, l: l, n: all.length, x: x, f: 0, w: st.w };
  }
  function drawFix(wrap) {
    var all = leaks(), f = 0;
    wrap.appendChild(h('p', 'cyintro', 'Everything this page gives away. Fix each one so nothing private reaches a visitor\'s browser.'));
    all.forEach(function (a) {
      var c = h('div', 'cycard' + (st.fixed[a.id] ? ' ok' : ''));
      c.appendChild(h('div', 'cyname', a.label));
      c.appendChild(h('code', 'srcode', a.text));
      c.appendChild(h('div', 'cynote', a.leak.why));
      if (st.fixed[a.id]) { f++; c.appendChild(h('div', 'cyok', 'Fixed: ' + a.leak.fixes[0] + '.')); }
      else {
        var row = h('div', 'cyrow');
        a.leak.order.forEach(function (j) { row.appendChild(btn(a.leak.fixes[j], function () { if (j === 0) st.fixed[a.id] = 1; else { st.tried[a.id] = j; st.w++; } }, a.label + ': ' + a.leak.fixes[j], 'small')); });
        c.appendChild(row);
        if (st.tried[a.id]) c.appendChild(h('div', 'cynote', 'Not enough: ' + a.leak.whyNot[st.tried[a.id]]));
      }
      wrap.appendChild(c);
    });
    ui.text = f + ' of ' + all.length + ' leaks fixed.';
    return { v: 1, p: 1, l: all.length, n: all.length, x: 0, f: f, w: st.w };
  }
  function update() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = h('div', 'cywrap');
    var vars = spec.m === 'fix' ? drawFix(wrap) : drawFind(wrap);
    host.appendChild(wrap);
    ui.work.textContent = ui.text; B.say(ui.text);
    B.save({ st: st });
    B.post({ scope: { vars: vars, points: {} } }, ui.text);
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    ui.work = h('p', 'rulework'); ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = h('div', 'gbar bbar'); var again = h('button', 'quiet', 'Start again'); again.type = 'button'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }
  function blank() { return { view: 0, viewed: 0, photo: 0, photoSeen: 0, mark: {}, fixed: {}, tried: {}, w: 0 }; }

  B.widget('source', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A web page and what it gives away'; },
    parse: parse,
    redraw: function () { if (spec) update(); },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      st = sv && sv.st ? Object.assign(blank(), sv.st) : blank();
      paintPanel(); update();
    },
  });
})(WPB);
