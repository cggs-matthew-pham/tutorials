---
title: Check your school
summary: Can your school's devices and network run the in-browser Python lessons? Run this once on a student device, at school, before you teach them.
---
Some courses run real Python libraries in the browser: Data detective, Apps with Gradio, and Web apps with Flask. Everything runs on the student's own device, but the browser first downloads the Python runtime, and a few lessons can fetch live data. School filters differ, so this page checks yours. It takes a minute or two; nothing is saved or sent anywhere.

<style>
.ck-table{width:100%;border-collapse:collapse;margin:16px 0;font-size:15px}
.ck-table th,.ck-table td{text-align:left;padding:8px;border-bottom:1px solid var(--line,#e4e1da);vertical-align:top}
.ck-s{font-weight:700;width:80px}.ck-t{width:70px;white-space:nowrap;opacity:.7}.ck-d{opacity:.75;word-break:break-word}
.ck-ok{color:#167a47}.ck-bad{color:#b3261e}.ck-wait{color:#c2570a}
.ck-verdict{padding:12px 16px;border-radius:10px;border:1px solid var(--line,#e4e1da);margin:16px 0}
.ck-verdict:empty{display:none}.ck-verdict.ck-ok{border-color:#167a47}.ck-verdict.ck-bad{border-color:#b3261e}.ck-verdict.ck-wait{border-color:#c2570a}
.ck-verdict p{margin:0;color:inherit}.ck-verdict ul{margin:8px 0 0}
#ck-run,#ck-copy{font:inherit;font-weight:600;padding:8px 16px;border-radius:8px;border:1px solid transparent;background:#167a47;color:#fff;cursor:pointer}
#ck-copy{background:transparent;color:inherit;border-color:var(--line,#e4e1da)}#ck-run:disabled{opacity:.5}
@media (prefers-color-scheme:dark){.ck-ok{color:#4ade80}.ck-bad{color:#ff8a80}.ck-wait{color:#ff9d3d}}
</style>
<p><button id="ck-run" type="button">Run the check</button> <button id="ck-copy" type="button" hidden>Copy the results</button></p>
<div id="ck-verdict" class="ck-verdict" aria-live="polite"></div>
<table class="ck-table"><thead><tr><th>Check</th><th>Result</th><th>Time</th><th>Detail</th></tr></thead><tbody id="ck-rows"></tbody></table>
<script src="../check.js"></script>

## What the results mean

- **Ready:** every in-browser Python lesson will work.
- **Ready without live data:** everything works except fetching live data. Lessons that use live data carry a saved copy and use it instead; only the optional lesson about calling an API needs live access.
- **Not ready yet:** the page lists the web addresses to ask your IT team to allow. Send them the list (the Copy button gives the full results), then run the check again.

The first visit is the slow one: the Python runtime is a download of about 14 MB, and the data tools about 7 MB more. Browsers keep the files, so later visits are much faster. Run the check on a student device and account if you can, since filters can differ between staff and students.
