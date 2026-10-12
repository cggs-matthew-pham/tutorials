// Cyber safety and privacy, defensive and conceptual: the Coding Club's new app, with the student as its security
// officer. Every scenario is fictional (example.* addresses, made-up people) and every task is about protecting.
//   widget: cyber
//   mode: breach | mfa | inbox | footprint | threat | weakness | privacy | review
//   set: (per mode) a variation, listed below
// Rows of choices: each choice button is labelled "<row>: <option>" for screen readers and clips.
// mode: breach   Ava's four accounts and their passwords; a Leak button: the game site's password list leaks and
//                the leaked password is tried on every other account and against a common-password list.
//   set: same (one password everywhere, default) | mixed      manager: on adds "Use a password manager"
//   Values: l (leak run with these settings), f (accounts that fell), r (accounts sharing a password),
//           c (accounts with a common or guessable password), m (manager on)
// mode: mfa      Every password has leaked. Choose each account's second factor (none, SMS code, app code, security
//                key); Attempt shows what happens when someone else signs in with the password. fake: on adds a
//                "Ava types her code into a fake page" switch (codes typed into a fake page can be passed on; a
//                security key only answers the real site).
//   Values: t (attempt run with these settings), i (accounts broken into), b (blocked), n (accounts with a second
//           factor), k (with a security key), p (fake page on), e (1 when School email has the security key)
// mode: inbox    Messages to mark Safe or Report; Check link shows where a link really goes. set: easy | tricky
//   Values: a (marked correctly), w (marked wrongly), t (marked), n (messages), c (links checked)
//   set: newsletter   the club's own message: switch its features until it can't be mistaken for a phish;
//                      values g (good features on), n (features), a (1 when all good)
// mode: footprint  A sign-up form: mark each field and setting Needed or Not needed for the app's purpose.
//   set: club (news about meetings) | excursion (permission and contacts for a trip)
//   Values: k (correct decisions), n (fields), x (unneeded data still collected), e (needed data kept), s (sharing
//           settings left on)
//   set: collects   eight things the app records: did Ava give it, or was it collected as she used the app?
//                    values k (sorted right), n (items), p (collected-as-used items found), q (collected-as-used items)
//   set: settings   Ava's account settings, open by default; values s (privacy settings at most private), n (privacy
//                    settings), f (1 when meeting reminders, the app's purpose, are still on)
// mode: threat   A data-flow diagram of the club app. For each point, pick the risk and the defence.
//   set: login (default) | photos (members can upload photos too) | messages (members message each other)
//   Values: d (points with the right defence), r (points with the right risk), n (points), w (wrong choices)
// mode: weakness  Incident cards: sort each into software, user or supply chain, and pick the fix.
//   set: kinds (three cards, kind only) | club (three weaknesses in the club's own app)
//   Values: t (types right), f (fixes right), n (cards)
// mode: privacy  The club app's practices: match each to an Australian Privacy Principle and say meets or breaches.
//   Values: a (principles right), b (meets/breaches right), n (practices), c (breaches given the right change; fix: on)
//   fix: on   a practice marked Breaches it offers changes; one would meet the principle
//   set: notice   write the APP 5 notice line by line, specific or vague; values g (specific lines), n, a (all)
// mode: review   The finale: inspect the club app, fix each weakness; each section, once fixed, shows a flag.
//   Each weakness offers three fixes; the wrong ones say why they fall short.
//   Values: x (weaknesses fixed), n (weaknesses), s (sections complete), w (wrong fixes tried)
(function (B) {
  'use strict';
  var spec = null, st = {}, ui = {};
  var MODES = ['breach', 'mfa', 'inbox', 'footprint', 'threat', 'weakness', 'privacy', 'review'];

  // ---------- data ----------
  var PW = {
    'sunshine1': { kind: 'common', guess: 'instantly: it is on every list of common passwords' },
    'Ava2012': { kind: 'personal', guess: 'quickly: her name and birth year are on her profile' },
    'P@ssw0rd!': { kind: 'common', guess: 'instantly: swapping letters for symbols is on the lists too' },
    'kettle-moon-river-pencil': { kind: 'strong', guess: 'longer than anyone would try: four random words' },
    'violin-cactus-harbour-tea': { kind: 'strong', guess: 'longer than anyone would try: four random words' },
    'orbit-velvet-lantern-fig': { kind: 'strong', guess: 'longer than anyone would try: four random words' },
    'glacier-tulip-anchor-sky': { kind: 'strong', guess: 'longer than anyone would try: four random words' },
  };
  var PWLIST = Object.keys(PW);
  var ACCTS = ['School email', 'Game site', 'Club app', 'Online shop'];
  var FACTORS = ['None', 'SMS code', 'App code', 'Security key'];
  var MAIL = {
    easy: [
      { id: 'm1', from: 'Ms Lee', addr: 'lee@school.example', subj: 'Robot club moved to Room 12', body: 'Hi all, club is in Room 12 this Friday. See the timetable:', link: 'Club timetable', to: 'https://school.example/club/timetable', phish: false, why: 'From the school\'s own address, nothing urgent, and the link goes where it says.' },
      { id: 'm2', from: 'Prize Team', addr: 'winner@free-prizes.example', subj: 'You WON a $500 gift card!!!', body: 'Claim in the next 10 minutes or lose it. Enter your school password to confirm:', link: 'Claim now', to: 'https://free-prizes.example/claim', phish: true, why: 'A prize you never entered, a countdown, and a request for your password.' },
      { id: 'm3', from: 'School IT', addr: 'it-support@schooI-help.example', subj: 'Your account will be closed today', body: 'We detected a problem. Sign in within 1 hour to keep your account:', link: 'school.example/login', to: 'https://schooI-help.example/login', phish: true, why: 'The address uses a capital I instead of l, the deadline is a pressure trick, and the link text says school.example but goes somewhere else.' },
      { id: 'm4', from: 'Coding Club', addr: 'news@club.school.example', subj: 'This week: line-following robots', body: 'Bring a friend! Photos from last week are on the club page:', link: 'Club page', to: 'https://club.school.example', phish: false, why: 'The club\'s real address, no request for anything, and the link matches.' },
    ],
    tricky: [
      { id: 't1', from: 'Ms Lee', addr: 'lee.teacher@mail-school.example', subj: 'Quick favour', body: 'Are you free? I need you to buy two gift cards for the class and send me the codes. I\'ll pay you back.', link: '', to: '', phish: true, why: 'Teachers never ask students to buy gift cards. The name is right; the address isn\'t the school\'s.' },
      { id: 't2', from: 'Parcel Post', addr: 'track@parcelpost.example', subj: 'Your parcel is on its way', body: 'Your parcel will arrive Thursday. Track it here:', link: 'Track parcel', to: 'https://parcelpost.example/track', phish: false, why: 'You did order something, nothing is asked of you, and the link matches the sender.' },
      { id: 't3', from: 'Parcel Post', addr: 'track@parcelpost-fees.example', subj: 'Delivery failed: pay $1.95', body: 'Your parcel is held. Pay the small fee today with your card:', link: 'parcelpost.example/pay', to: 'https://parcelpost-fees.example/pay', phish: true, why: 'A lookalike address, a small fee to make you act fast, and a link that goes somewhere other than its text.' },
      { id: 't4', from: 'School Library', addr: 'library@school.example', subj: 'Book due back Monday', body: 'Your copy of Hatchet is due on Monday. Renew it on the library page:', link: 'Library page', to: 'https://school.example/library', phish: false, why: 'The school\'s real address, a book you borrowed, and a matching link.' },
      { id: 't5', from: 'Game Support', addr: 'support@game-site.example', subj: 'Someone tried to sign in', body: 'If this wasn\'t you, reply with your password so we can lock the account.', link: '', to: '', phish: true, why: 'Real support never asks for your password, even from the right-looking address. Go to the site yourself instead.' },
    ],
  };
  var NEWS = [
    { id: 'n1', label: 'Sender', bad: 'club-news@clubmail-alerts.example', good: 'news@club.school.example' },
    { id: 'n2', label: 'Subject', bad: 'URGENT: act now or lose your spot!', good: 'This week: line-following robots' },
    { id: 'n3', label: 'Link text', bad: 'Click here', good: 'Club page (club.school.example)' },
    { id: 'n4', label: 'Asks for', bad: 'Reply with your password to stay a member', good: 'Nothing: just news' },
  ];
  var FORM = {
    club: { purpose: 'Tell members about club meetings and events.', need: ['Name', 'Year level', 'School email'] },
    excursion: { purpose: 'Get permission and contacts for the club\'s excursion to the science museum.', need: ['Name', 'Year level', 'School email', 'Parent or carer phone'] },
  };
  var FIELDS = ['Name', 'Year level', 'School email', 'Date of birth', 'Home address', 'Parent or carer phone', 'Photo of you', 'Location sharing (setting)', 'Public profile (setting)'];
  var COLLECTS = [
    { name: 'Your name', given: true }, { name: 'Your school email', given: true },
    { name: 'Where your phone is when you open the app', given: false }, { name: 'Which pages you open, and for how long', given: false },
    { name: 'A photo you upload', given: true }, { name: 'What kind of phone or computer you use', given: false },
    { name: 'The time of day you usually sign in', given: false }, { name: 'Your answer to a club poll', given: true },
  ];
  var SETTINGS = [
    { name: 'Profile', opts: ['Public', 'Members only'], safe: 1, note: ['Anyone online can see your name and photo.', 'Only club members can see it.'] },
    { name: 'Location sharing', opts: ['On', 'Off'], safe: 1, note: ['The app records where you are each time you open it.', 'The app doesn\'t know where you are.'] },
    { name: 'Photo tagging', opts: ['Anyone can tag me', 'Ask me first'], safe: 1, note: ['Others can put your name on any photo.', 'You approve each tag.'] },
    { name: 'Personalised ads', opts: ['On', 'Off'], safe: 1, note: ['What you do is used to choose ads for you.', 'Ads (if any) aren\'t based on what you do.'] },
    { name: 'Meeting reminders', opts: ['On', 'Off'], need: 0, note: ['You get a message before each meeting: this is what the app is for.', 'You won\'t hear about meetings.'] },
  ];
  var RISKS = ['Read on the way', 'Copied from storage', 'Used by the wrong person'];
  var DEFS = ['HTTPS (encrypt on the way)', 'Hash passwords, encrypt stored data', 'Access control and MFA', 'Backups'];
  var POINTS = {
    login: [
      { id: 'p1', name: 'Member signs in (browser → app)', risk: 0, def: 0 },
      { id: 'p2', name: 'Passwords in the database', risk: 1, def: 1 },
      { id: 'p3', name: 'Admin page (change anyone\'s details)', risk: 2, def: 2 },
    ],
    photos: [
      { id: 'p1', name: 'Member signs in (browser → app)', risk: 0, def: 0 },
      { id: 'p2', name: 'Passwords in the database', risk: 1, def: 1 },
      { id: 'p3', name: 'Admin page (change anyone\'s details)', risk: 2, def: 2 },
      { id: 'p4', name: 'Photo upload (browser → app)', risk: 0, def: 0 },
      { id: 'p5', name: 'Photo storage (who can see each photo)', risk: 2, def: 2 },
    ],
    messages: [
      { id: 'q1', name: 'A member sends a message (browser → app)', risk: 0, def: 0 },
      { id: 'q2', name: 'Messages saved in the database', risk: 1, def: 1 },
      { id: 'q3', name: 'Opening a conversation (who may read it)', risk: 2, def: 2 },
    ],
  };
  var TYPES = ['Software', 'User', 'Supply chain'];
  var FIXES = ['Update and test the code', 'Training, strong passwords and MFA', 'Check and update what you rely on'];
  var CARDS = [
    { id: 'c1', text: 'The club app hadn\'t been updated in two years. A flaw in its sign-in code was fixed in an update nobody installed.', type: 0 },
    { id: 'c2', text: 'A member gave their password to someone on the phone who said they were from club IT.', type: 1 },
    { id: 'c3', text: 'A free calendar add-on the app relies on was taken over by someone else and changed.', type: 2 },
    { id: 'c4', text: 'The admin account\'s password was password1.', type: 1 },
    { id: 'c5', text: 'The app crashed when someone typed a very long name, because the code never checked the length.', type: 0 },
    { id: 'c6', text: 'A developer installed a library with a name one letter different from the real one.', type: 2 },
  ];
  var CLUBCARDS = [
    { id: 'c7', text: 'The club app\'s sign-up page saves whatever is typed in the name box, without checking it.', type: 0 },
    { id: 'c8', text: 'The club leaders share one admin password, written on a sticky note in the lab.', type: 1 },
    { id: 'c9', text: 'Nobody has checked the app\'s photo add-on since it was installed three years ago.', type: 2 },
  ];
  var CHANGES = {
    r1: { opts: ['Stop asking for home addresses', 'Keep them but hide the field', 'Ask for them only on weekends'], right: 0 },
    r3: { opts: ['Ask first, and share only with members who agree', 'Share only half the emails', 'Mention it on page 40 of the policy'], right: 0 },
    r5: { opts: ['Add a page where members can see and correct their details', 'Delete everyone\'s details each year', 'Let members email the developers\' personal phones'], right: 0 },
  };
  var NOTICE = [
    { label: 'What we collect', opts: ['Your name, year level and school email.', 'Some information.'], right: 0 },
    { label: 'Why', opts: ['To run the club.', 'To tell you about meetings and events.'], right: 1 },
    { label: 'Who we share it with', opts: ['Nobody outside the club leaders.', 'Our partners.'], right: 0 },
    { label: 'How we keep it safe', opts: ['Passwords are hashed and the database is encrypted.', 'We take security seriously.'], right: 0 },
    { label: 'See or correct it', opts: ['Contact us.', 'Open My details, or ask Ms Lee in Room 12.'], right: 1 },
  ];
  var APPS = ['APP 3 Collection', 'APP 5 Notice', 'APP 6 Use and disclosure', 'APP 11 Security', 'APP 12 Access'];
  var PRACTICES = [
    { id: 'r1', text: 'The sign-up form asks for home addresses, which the club never uses.', app: 0, breach: true },
    { id: 'r2', text: 'A clear notice on the sign-up page says what is collected and why.', app: 1, breach: false },
    { id: 'r3', text: 'Members\' emails were given to a sports shop for advertising, without asking.', app: 2, breach: true },
    { id: 'r4', text: 'Passwords are stored hashed, and the database is encrypted.', app: 3, breach: false },
    { id: 'r5', text: 'Members can\'t see or correct what the club holds about them.', app: 4, breach: true },
  ];
  var REVIEW = [
    // Each item: what the inspection finds, then fixes (the first is right; shown in a fixed shuffled order) with
    // why each wrong one falls short.
    { id: 's1', name: 'Accounts', flag: 'WP{unique-and-mfa}', items: [
      { id: 'v1', see: 'The admin account uses the same password as the game site.', fixes: ['Give it a unique passphrase', 'Add a ! to the end of it', 'Change it once a year'], why: ['', 'A leaked password with ! added is one of the first guesses.', 'It is still the game site\'s password until then.'], order: [1, 0, 2] },
      { id: 'v2', see: 'The admin account has no second factor.', fixes: ['Turn on a security key', 'Make the password longer', 'Hide the admin page\'s address'], why: ['', 'A longer password still falls if it leaks or is phished.', 'Hidden addresses get found; the account still needs a second factor.'], order: [2, 1, 0] },
    ] },
    { id: 's2', name: 'Data', flag: 'WP{only-what-we-need}', items: [
      { id: 'v3', see: 'The sign-up form collects home addresses and birth dates.', fixes: ['Remove the fields the club does not need', 'Keep them in a separate table', 'Make them optional but keep asking'], why: ['', 'Data you hold can still leak, wherever it sits.', 'The club still collects what it never uses.'], order: [0, 2, 1] },
      { id: 'v4', see: 'Passwords are stored exactly as members typed them.', fixes: ['Store a salted hash of each password', 'Rename the password column', 'Ask members for longer passwords'], why: ['', 'Anyone who copies the database still reads every password.', 'Long passwords stored as typed leak just as easily.'], order: [1, 0, 2] },
      { id: 'v5', see: 'There is no privacy notice on the sign-up page.', fixes: ['Add a notice: what, why, who sees it and who to ask', 'Add "We take privacy seriously"', 'Put the notice in the code comments'], why: ['', 'That says nothing about what is collected or why.', 'Members never see the code.'], order: [2, 0, 1] },
    ] },
    { id: 's3', name: 'System', flag: 'WP{patched-and-encrypted}', items: [
      { id: 'v6', see: 'The sign-in page is sent without HTTPS.', fixes: ['Turn on HTTPS', 'Tell members not to use café Wi-Fi', 'Hash the passwords in the database'], why: ['', 'Some will anyway; the app should protect them on any network.', 'That protects stored passwords, not ones on their way.'], order: [1, 2, 0] },
      { id: 'v7', see: 'The calendar add-on is three versions out of date.', fixes: ['Update it and check it is the real one', 'Turn off update messages', 'Copy its code into the app'], why: ['', 'The flaws the updates fixed are still there.', 'Then nobody updates it at all.'], order: [0, 1, 2] },
    ] },
  ];

  function parse(s) {
    s.m = String(s.mode || 'breach').toLowerCase();
    if (MODES.indexOf(s.m) < 0) throw new Error('mode: ' + MODES.join(', ') + '.');
    s.set0 = String(s.set || '').toLowerCase();
    s.manager = /^on$/i.test(s.manager || '');
    s.fake = /^on$/i.test(s.fake || '');
    s.fixOn = /^on$/i.test(s.fix || '');
  }

  // ---------- helpers ----------
  function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function act(fn) { return function () { fn(); B.moved = true; draw(); report(); }; }
  function choices(row, label, opts, cur, set, short) {
    var g = h('div', 'cyopts'); g.setAttribute('role', 'group'); g.setAttribute('aria-label', row + ': ' + label);
    var l = h('span', 'cylab', label + ':'); g.appendChild(l);
    opts.forEach(function (o, i) {
      var b = h('button', '', short ? short[i] : o); b.type = 'button';
      b.setAttribute('aria-pressed', String(cur === i)); b.setAttribute('aria-label', row + ': ' + o);
      b.addEventListener('click', act(function () { set(i); })); g.appendChild(b);
    });
    return g;
  }
  function card(title, cls) { var c = h('div', 'cycard' + (cls ? ' ' + cls : '')); if (title) c.appendChild(h('div', 'cyname', title)); return c; }
  function button(text, fn, cls, aria) { var b = h('button', 'cybtn' + (cls ? ' ' + cls : ''), text); b.type = 'button'; if (aria) b.setAttribute('aria-label', aria); b.addEventListener('click', act(fn)); return b; }

  // ---------- modes ----------
  function breachState() {
    var pw = st.pw, fell = {}, leaked = pw[1];
    if (st.leak) {
      fell[1] = 1;   // the leaked site itself
      pw.forEach(function (p, i) { if (p === leaked || PW[p].kind !== 'strong') fell[i] = 1; });
    }
    var count = {}; pw.forEach(function (p) { count[p] = (count[p] || 0) + 1; });
    return { fell: fell, f: Object.keys(fell).length, r: pw.filter(function (p) { return count[p] > 1; }).length, c: pw.filter(function (p) { return PW[p].kind !== 'strong'; }).length };
  }
  function drawBreach(wrap) {
    var s = breachState();
    var intro = h('p', 'cyintro', 'Ava\'s accounts. The Game site is about to leak its list of passwords. Anyone who gets the list will try the same password on her other accounts, and try a list of common and guessable passwords.');
    wrap.appendChild(intro);
    var grid = h('div', 'cygrid');
    ACCTS.forEach(function (a, i) {
      var c = card(a, st.leak && s.fell[i] ? 'bad' : st.leak ? 'ok' : '');
      var p = st.pw[i];
      if (st.manager) c.appendChild(h('div', 'cypw', p + '  (made by the password manager)'));
      else c.appendChild(choices(a, 'Password', PWLIST, PWLIST.indexOf(p), function (k) { st.pw[i] = PWLIST[k]; st.leak = 0; }));
      c.appendChild(h('div', 'cynote', 'How fast someone could guess it: ' + PW[p].guess + '.'));
      if (st.leak) c.appendChild(h('div', 'cyres', s.fell[i] ? (i === 1 ? 'Leaked: this site\'s list is out.' : p === st.pw[1] ? 'Broken into: the same password as the leaked site.' : 'Broken into: the password was guessed.') : 'Safe.'));
      grid.appendChild(c);
    });
    wrap.appendChild(grid);
    var bar = h('div', 'cybar');
    if (spec.manager) bar.appendChild(button(st.manager ? 'Password manager: on' : 'Use a password manager', function () { st.manager = !st.manager; st.leak = 0; if (st.manager) st.pw = [PWLIST[3], PWLIST[4], PWLIST[5], PWLIST[6]]; }));
    bar.appendChild(button('Leak!', function () { st.leak = 1; }, 'go', 'Leak the Game site\'s passwords'));
    wrap.appendChild(bar);
    ui.text = st.leak ? 'After the leak: ' + s.f + ' of 4 accounts fell.' : s.r + ' accounts share a password; ' + s.c + ' could be guessed.';
    return { l: st.leak ? 1 : 0, f: st.leak ? s.f : 0, r: s.r, c: s.c, m: st.manager ? 1 : 0 };
  }

  function mfaState() {
    var out = { fell: {}, i: 0, b: 0, n: 0, k: 0 };
    st.fac.forEach(function (f, i) {
      if (f) out.n++; if (f === 3) out.k++;
      var falls = f === 0 || (st.fakeOn && (f === 1 || f === 2));
      if (falls) out.fell[i] = 1;
    });
    out.i = Object.keys(out.fell).length; out.b = 4 - out.i;
    return out;
  }
  function drawMfa(wrap) {
    var s = mfaState();
    wrap.appendChild(h('p', 'cyintro', 'Every one of Ava\'s passwords has leaked. Someone else tries to sign in with them. A second factor is something she has (her phone, a security key) as well as something she knows.'));
    var grid = h('div', 'cygrid');
    ACCTS.forEach(function (a, i) {
      var c = card(a, st.tried ? (s.fell[i] ? 'bad' : 'ok') : '');
      c.appendChild(choices(a, 'Second factor', FACTORS, st.fac[i], function (k) { st.fac[i] = k; st.tried = 0; }));
      if (st.tried) c.appendChild(h('div', 'cyres', s.fell[i] ? (st.fac[i] ? 'Broken into: Ava typed her code into the fake page, which passed it on.' : 'Broken into: the password was enough.') : st.fac[i] === 3 ? 'Blocked: the key only answers the real site.' : 'Blocked: they don\'t have Ava\'s phone.'));
      grid.appendChild(c);
    });
    wrap.appendChild(grid);
    var bar = h('div', 'cybar');
    if (spec.fake) bar.appendChild(button(st.fakeOn ? 'Fake sign-in page: on' : 'Fake sign-in page: off', function () { st.fakeOn = !st.fakeOn; st.tried = 0; }, '', 'Ava types her code into a fake page, ' + (st.fakeOn ? 'on' : 'off')));
    bar.appendChild(button('Attempt', function () { st.tried = 1; }, 'go', 'Someone tries the leaked passwords'));
    wrap.appendChild(bar);
    ui.text = st.tried ? s.i + ' of 4 accounts broken into, ' + s.b + ' blocked.' : s.n + ' accounts have a second factor.';
    return { t: st.tried ? 1 : 0, i: st.tried ? s.i : 0, b: st.tried ? s.b : 0, n: s.n, k: s.k, p: st.fakeOn ? 1 : 0, e: st.fac[0] === 3 ? 1 : 0 };
  }

  function drawInbox(wrap) {
    if (spec.set0 === 'newsletter') {
      wrap.appendChild(h('p', 'cyintro', 'The club\'s own email keeps landing in spam, and members are unsure if it is real. Make it impossible to mistake for a phish.'));
      var c = card('Coding Club newsletter');
      var good = 0;
      NEWS.forEach(function (f, i) {
        var on = !!st.news[i]; if (on) good++;
        var row = h('div', 'cyrow');
        row.appendChild(h('span', 'cyfield', f.label + ': '));
        row.appendChild(h('span', on ? 'cyok' : 'cybadtxt', on ? f.good : f.bad));
        row.appendChild(button(on ? 'Undo' : 'Fix', function () { st.news[i] = !st.news[i]; }, 'small', 'Fix ' + f.label + (on ? ', fixed' : '')));
        c.appendChild(row);
      });
      wrap.appendChild(c);
      ui.text = good + ' of ' + NEWS.length + ' features fixed.';
      return { g: good, n: NEWS.length, a: good === NEWS.length ? 1 : 0 };
    }
    var list = MAIL[spec.set0 === 'tricky' ? 'tricky' : 'easy'], a = 0, w = 0, t = 0, c2 = 0;
    wrap.appendChild(h('p', 'cyintro', 'Ava\'s inbox. Mark each message Safe or Report. Check where a link really goes before you decide.'));
    var grid = h('div', 'cymail');
    list.forEach(function (m) {
      var mark = st.marks[m.id], seen = st.checked[m.id];
      if (seen) c2++;
      if (mark !== undefined) { t++; if ((mark === 1) === m.phish) a++; else w++; }
      var cc = card('', mark === undefined ? '' : (mark === 1) === m.phish ? 'ok' : 'bad');
      var head = h('div', 'cyhead'); head.appendChild(h('b', '', m.from)); head.appendChild(h('span', 'cyaddr', ' <' + m.addr + '>')); cc.appendChild(head);
      cc.appendChild(h('div', 'cysubj', m.subj));
      cc.appendChild(h('div', 'cybody', m.body));
      if (m.link) {
        var lr = h('div', 'cyrow'); lr.appendChild(h('span', 'cylink', m.link));
        lr.appendChild(button(seen ? 'Goes to: ' + m.to : 'Check link', function () { st.checked[m.id] = 1; }, 'small', 'Check link in ' + m.subj));
        cc.appendChild(lr);
      }
      cc.appendChild(choices(m.subj, 'Mark', ['Safe', 'Report'], mark === undefined ? -1 : mark, function (k) { st.marks[m.id] = k; }));
      if (mark !== undefined) cc.appendChild(h('div', 'cyres', ((mark === 1) === m.phish ? 'Right. ' : 'Look again. ') + ((mark === 1) === m.phish ? m.why : '')));
      grid.appendChild(cc);
    });
    wrap.appendChild(grid);
    ui.text = t + ' of ' + list.length + ' marked, ' + a + ' correctly.';
    return { a: a, w: w, t: t, n: list.length, c: c2 };
  }

  function drawFootprint(wrap) {
    if (spec.set0 === 'collects') {
      var k1 = 0, p1 = 0, pn = 0;
      wrap.appendChild(h('p', 'cyintro', 'Everything the club app records about Ava in one week. Which did she type or choose to give, and which did the app collect just from her using it?'));
      var g1 = h('div', 'cygrid');
      COLLECTS.forEach(function (it, i) {
        var mark = st.got[i]; if (!it.given) pn++;
        var right = mark !== undefined && (mark === 0) === it.given;
        if (right) { k1++; if (!it.given) p1++; }
        var c = card(it.name, mark === undefined ? '' : right ? 'ok' : 'bad');
        c.appendChild(choices(it.name, 'How', ['She gave it', 'Collected as she used the app'], mark === undefined ? -1 : mark, function (kk) { st.got[i] = kk; }));
        g1.appendChild(c);
      });
      wrap.appendChild(g1);
      ui.text = k1 + ' of ' + COLLECTS.length + ' sorted correctly; ' + p1 + ' of ' + pn + ' collected-as-used items found.';
      return { k: k1, n: COLLECTS.length, p: p1, q: pn };
    }
    if (spec.set0 === 'settings') {
      var sv = 0, fn = 0, ns = 0;
      wrap.appendChild(h('p', 'cyintro', 'Ava\'s settings in the club app, as they came when she signed up. Each one changes what the app collects or shows. Keep what she needs the app for.'));
      var g2 = h('div', 'cygrid');
      SETTINGS.forEach(function (it, i) {
        var cur = st.set[i] === undefined ? 0 : st.set[i];
        if (it.safe !== undefined) { ns++; if (cur === it.safe) sv++; }
        if (it.need !== undefined && cur === it.need) fn = 1;
        var good = it.safe !== undefined ? cur === it.safe : cur === it.need;
        var c = card(it.name, st.setTouched ? (good ? 'ok' : 'bad') : '');
        c.appendChild(choices(it.name, 'Setting', it.opts, cur, function (kk) { st.set[i] = kk; st.setTouched = 1; }));
        c.appendChild(h('div', 'cynote', it.note[cur]));
        g2.appendChild(c);
      });
      wrap.appendChild(g2);
      ui.text = sv + ' of ' + ns + ' privacy settings at their most private; meeting reminders ' + (fn ? 'on' : 'off') + '.';
      return { s: sv, n: ns, f: fn };
    }
    var f = FORM[spec.set0 === 'excursion' ? 'excursion' : 'club'], k = 0, x = 0, e = 0, s = 0;
    wrap.appendChild(h('p', 'cyintro', 'The club app\'s sign-up form. Its purpose: ' + f.purpose + ' Every field collected adds to members\' digital footprint. Keep only what the purpose needs.'));
    var grid = h('div', 'cygrid');
    FIELDS.forEach(function (fl, i) {
      var need = f.need.indexOf(fl) >= 0, mark = st.fields[i], setting = /setting/.test(fl);
      if (mark !== undefined && (mark === 0) === need) k++;
      var kept = mark === undefined ? true : mark === 0;
      if (kept && !need) { x++; if (setting) s++; }
      if (kept && need) e++;
      var c = card(fl, mark === undefined ? '' : (mark === 0) === need ? 'ok' : 'bad');
      c.appendChild(choices(fl, 'For this purpose', ['Needed', 'Not needed'], mark === undefined ? -1 : mark, function (kk) { st.fields[i] = kk; }));
      grid.appendChild(c);
    });
    wrap.appendChild(grid);
    var meter = h('div', 'cymeter'); meter.appendChild(h('span', '', 'Data collected that the purpose does not need: ' + x));
    var bar = h('span', 'cymbar'); var fill = h('span', 'cymfill'); fill.style.width = Math.round(x / FIELDS.length * 100) + '%'; bar.appendChild(fill); meter.appendChild(bar);
    wrap.appendChild(meter);
    ui.text = k + ' of ' + FIELDS.length + ' decided correctly; ' + x + ' unneeded items still collected.';
    return { k: k, n: FIELDS.length, x: x, e: e, s: s };
  }

  function drawThreat(wrap) {
    var pts = POINTS[POINTS[spec.set0] ? spec.set0 : 'login'], d = 0, r = 0, w = 0;
    wrap.appendChild(h('p', 'cyintro', 'A data-flow diagram of the club app: data moves from members\' browsers to the app and into its database; an admin can change anything. For each point, what could go wrong, and which defence fits?'));
    var dia = h('div', 'cyflow');
    ['Member\'s browser', 'Club app', 'Database'].forEach(function (n, i) { if (i) dia.appendChild(h('span', 'cyarrow', '⇄')); dia.appendChild(h('span', 'cynode', n)); });
    dia.appendChild(h('span', 'cynode admin', 'Admin'));
    wrap.appendChild(dia);
    var grid = h('div', 'cygrid');
    pts.forEach(function (p) {
      var cr = st.risk[p.id], cd = st.def[p.id];
      if (cr === p.risk) r++; else if (cr !== undefined) w++;
      if (cd === p.def) d++; else if (cd !== undefined) w++;
      var c = card(p.name, cd === undefined ? '' : cd === p.def && cr === p.risk ? 'ok' : 'bad');
      c.appendChild(choices(p.name, 'Risk', RISKS, cr === undefined ? -1 : cr, function (k) { st.risk[p.id] = k; }));
      c.appendChild(choices(p.name, 'Defence', DEFS, cd === undefined ? -1 : cd, function (k) { st.def[p.id] = k; }));
      grid.appendChild(c);
    });
    wrap.appendChild(grid);
    ui.text = d + ' of ' + pts.length + ' points defended; ' + r + ' risks named.';
    return { d: d, r: r, n: pts.length, w: w };
  }

  function drawWeakness(wrap) {
    var t = 0, f = 0, kinds = spec.set0 === 'kinds', club = spec.set0 === 'club';
    var cards = club ? CLUBCARDS : kinds ? CARDS.slice(0, 3) : CARDS;
    wrap.appendChild(h('p', 'cyintro', club ? 'Your review of the Coding Club\'s own app found these. Which kind of weakness is each, and what fixes it before anything goes wrong?' : kinds ? 'Three things that went wrong at other clubs\' apps. Where was the weakness: in the app\'s own code, in what a person did, or in something the app relies on?' : 'Things that went wrong at other clubs\' apps. For each, which kind of weakness was it, and what would have stopped it?'));
    var grid = h('div', 'cygrid');
    cards.forEach(function (cd) {
      var ty = st.type[cd.id], fx = st.fix[cd.id];
      if (ty === cd.type) t++; if (fx === cd.type) f++;
      var done = kinds ? ty !== undefined : ty !== undefined && fx !== undefined;
      var c = card('', !done ? '' : ty === cd.type && (kinds || fx === cd.type) ? 'ok' : 'bad');
      c.appendChild(h('div', 'cybody', cd.text));
      c.appendChild(choices(cd.text.slice(0, 30), 'Kind', TYPES, ty === undefined ? -1 : ty, function (k) { st.type[cd.id] = k; }));
      if (!kinds) c.appendChild(choices(cd.text.slice(0, 30), 'Fix', FIXES, fx === undefined ? -1 : fx, function (k) { st.fix[cd.id] = k; }));
      grid.appendChild(c);
    });
    wrap.appendChild(grid);
    ui.text = t + ' of ' + cards.length + ' kinds right' + (kinds ? '.' : ', ' + f + ' fixes right.');
    return { t: t, f: f, n: cards.length };
  }

  function drawPrivacy(wrap) {
    if (spec.set0 === 'notice') {
      var g = 0;
      wrap.appendChild(h('p', 'cyintro', 'Write the privacy notice for the club app\'s sign-up page (APP 5). For each line, pick the version that tells a member something real.'));
      var cn = card('Coding Club app: privacy notice');
      NOTICE.forEach(function (ln, i) {
        var cur = st.note[i]; if (cur === ln.right) g++;
        cn.appendChild(choices(ln.label, ln.label, ln.opts, cur === undefined ? -1 : cur, function (k) { st.note[i] = k; }));
        if (cur !== undefined && cur !== ln.right) cn.appendChild(h('div', 'cynote', 'Too vague: a member can\'t tell what this means for them.'));
      });
      wrap.appendChild(cn);
      ui.text = g + ' of ' + NOTICE.length + ' lines say something real.';
      return { g: g, n: NOTICE.length, a: g === NOTICE.length ? 1 : 0 };
    }
    var a = 0, b = 0, cc = 0;
    wrap.appendChild(h('p', 'cyintro', 'What the club app does with members\' information. Which Australian Privacy Principle is each about, and does the app meet it or breach it?'));
    var grid = h('div', 'cygrid');
    PRACTICES.forEach(function (p) {
      var ap = st.app[p.id], br = st.br[p.id];
      if (ap === p.app) a++; if (br !== undefined && (br === 1) === p.breach) b++;
      var c = card('', ap === undefined || br === undefined ? '' : ap === p.app && (br === 1) === p.breach ? 'ok' : 'bad');
      c.appendChild(h('div', 'cybody', p.text));
      c.appendChild(choices(p.text.slice(0, 30), 'Principle', APPS, ap === undefined ? -1 : ap, function (k) { st.app[p.id] = k; }));
      c.appendChild(choices(p.text.slice(0, 30), 'The app', ['Meets it', 'Breaches it'], br === undefined ? -1 : br, function (k) { st.br[p.id] = k; }));
      var ch = CHANGES[p.id];
      if (spec.fixOn && ch && br === 1) {
        var cur = st.chg[p.id]; if (cur === ch.right) cc++;
        c.appendChild(choices(p.text.slice(0, 30), 'Change', ch.opts, cur === undefined ? -1 : cur, function (k) { st.chg[p.id] = k; }));
        if (cur !== undefined && cur !== ch.right) c.appendChild(h('div', 'cynote', 'Would that meet the principle? Read what it requires again.'));
      }
      grid.appendChild(c);
    });
    wrap.appendChild(grid);
    ui.text = a + ' of ' + PRACTICES.length + ' principles matched, ' + b + ' judged correctly' + (spec.fixOn ? ', ' + cc + ' of 3 breaches fixed.' : '.');
    return { a: a, b: b, n: PRACTICES.length, c: cc };
  }

  function drawReview(wrap) {
    var x = 0, n = 0, s = 0;
    wrap.appendChild(h('p', 'cyintro', 'Security review of the club app. Inspect each part, fix every weakness you find, and a section that is fully fixed shows its flag.'));
    REVIEW.forEach(function (sec) {
      var c = card(sec.name), all = true;
      sec.items.forEach(function (it) {
        n++;
        var seen = st.seen[it.id], fixed = st.fixed[it.id], tried = st.rtry[it.id];
        if (fixed) x++; else all = false;
        var row = h('div', 'cyrow');
        if (!seen) row.appendChild(button('Inspect', function () { st.seen[it.id] = 1; }, 'small', 'Inspect ' + sec.name + ' ' + (sec.items.indexOf(it) + 1)));
        else if (fixed) row.appendChild(h('span', 'cyok', 'Fixed: ' + it.fixes[0] + '.'));
        else {
          row.appendChild(h('span', 'cybadtxt', it.see));
          it.order.forEach(function (j) { row.appendChild(button(it.fixes[j], function () { if (j === 0) st.fixed[it.id] = 1; else { st.rtry[it.id] = j; st.wrong = (st.wrong || 0) + 1; } }, 'small')); });
        }
        c.appendChild(row);
        if (seen && !fixed && tried) c.appendChild(h('div', 'cynote', 'Not enough: ' + it.why[tried]));
      });
      if (all) { s++; var fl = h('div', 'cyflag', 'Flag: ' + sec.flag); c.appendChild(fl); c.classList.add('ok'); }
      wrap.appendChild(c);
    });
    ui.text = x + ' of ' + n + ' weaknesses fixed; ' + s + ' of ' + REVIEW.length + ' sections complete.';
    return { x: x, n: n, s: s, w: st.wrong || 0 };
  }

  var DRAW = { breach: drawBreach, mfa: drawMfa, inbox: drawInbox, footprint: drawFootprint, threat: drawThreat, weakness: drawWeakness, privacy: drawPrivacy, review: drawReview };

  function draw() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = h('div', 'cywrap');
    ui.vars = DRAW[spec.m](wrap);
    host.appendChild(wrap);
  }
  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    ui.work = h('p', 'rulework'); ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = h('div', 'gbar bbar'); var again = h('button', 'quiet', 'Start again'); again.type = 'button'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }
  function report() {
    ui.work.textContent = ui.text; B.say(ui.text);
    B.save({ st: st });
    B.post({ scope: { vars: ui.vars, points: {} } }, ui.text);
  }
  function blank() {
    var same = spec.set0 !== 'mixed';
    return {
      pw: same ? ['sunshine1', 'sunshine1', 'sunshine1', 'sunshine1'] : ['sunshine1', 'kettle-moon-river-pencil', 'Ava2012', 'kettle-moon-river-pencil'],
      leak: 0, manager: false, fac: [0, 0, 0, 0], tried: 0, fakeOn: false,
      marks: {}, checked: {}, news: {}, fields: {}, got: {}, set: {}, setTouched: 0, chg: {}, note: {}, rtry: {}, risk: {}, def: {}, type: {}, fix: {}, app: {}, br: {}, seen: {}, fixed: {},
    };
  }

  B.widget('cyber', {
    sections: ['board', 'gpanel'],
    label: function () { return 'Cyber safety: the Coding Club app'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved();
      st = sv && sv.st ? Object.assign(blank(), sv.st) : blank();
      paintPanel(); draw(); report();
    },
  });
})(WPB);
