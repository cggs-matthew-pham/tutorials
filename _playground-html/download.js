// Download the page as index.html, ready to put online, and list the files it uses from beside it (pictures,
// libraries, data in media/), each with its own download link. Shared by the HTML and DOM playgrounds (the build
// copies this file into _playground-dom/). Pure helpers first, so they can be tested without a browser.

// src="trophy.svg", href="bootstrap.min.css", fetch("weather.json"): a file name with no scheme, no folder above it.
const LOCAL = /\b(?:src|href)\s*=\s*["']([^"'#?:/\\]+\.(?:svg|png|jpe?g|gif|webp|css|js|json))["']|\bfetch\s*\(\s*["']([^"'#?:/\\]+\.json)["']/gi;

/** The files a page uses from beside it, in the order they first appear. */
export function besideFiles(code) {
  return [...new Set([...String(code).matchAll(LOCAL)].map((m) => m[1] || m[2]))];
}

/** A whole page: the code as it is if it starts with <!DOCTYPE>, otherwise wrapped in one, titled by its first <h1>. */
export function pageFile(code) {
  const src = String(code);
  if (/^\s*<!doctype/i.test(src)) return src;
  const h1 = src.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const title = (h1 ? h1[1].replace(/<[^>]*>|\{\{[^}]*\}\}/g, '').replace(/\s+/g, ' ').trim() : '') || 'My page';
  return `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${title.replace(/[<&]/g, '')}</title>\n</head>\n<body>\n${src.replace(/\s*$/, '\n')}</body>\n</html>\n`;
}

/** Wire a Download button: save index.html, then show which files go beside it. */
export function mountDownload(button, panel, getCode) {
  const media = new URL('media/', location.href);
  button.addEventListener('click', () => {
    const code = getCode();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([pageFile(code)], { type: 'text/html' }));
    a.download = 'index.html';
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    const files = besideFiles(code);
    panel.replaceChildren();
    const p = document.createElement('p');
    p.textContent = files.length ? 'Saved index.html. Your page also uses these files: download each one into the same folder.' : 'Saved index.html. Open it from your computer to check it.';
    panel.append(p);
    if (files.length) {
      const ul = document.createElement('ul');
      for (const f of files) {
        const li = document.createElement('li'), l = document.createElement('a');
        l.href = new URL(f, media).href; l.download = f; l.textContent = f;
        li.append(l); ul.append(li);
      }
      panel.append(ul);
    }
    const close = document.createElement('button');
    close.type = 'button'; close.className = 'btn ghost'; close.textContent = 'Close';
    close.addEventListener('click', () => { panel.hidden = true; });
    panel.append(close);
    panel.hidden = false;
    window.__playground && (window.__playground.downloaded = { page: pageFile(code), files });
  });
}
