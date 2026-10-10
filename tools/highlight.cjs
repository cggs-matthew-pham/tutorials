// Tiny single-pass syntax highlighter. CommonJS on purpose: Node `require`s it for the
// site build, and the renderer inlines the same source into the browser stage page.
function highlightCode(src, lang) {
  var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
  if (/^(html|css|xml|svg)$/.test(lang || '')) {
    // HTML and CSS: comments, tag names (and <!DOCTYPE>), attribute names, quoted values. Text between tags stays plain
    // (Python's keywords, such as "and", are ordinary words on a web page).
    var hre = /(<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/)|(<\/?[A-Za-z][\w-]*|<![A-Za-z]+|\/?>)|(\s[A-Za-z_:][\w:.-]*)(?==)|("[^"\n]*")/g;
    var hout = '', hlast = 0, hm, inTag = false;
    while ((hm = hre.exec(src))) {
      var ht = hm[0];
      if ((hm[3] || hm[4]) && !inTag) continue; // an = or a quote in ordinary text, not part of a tag
      hout += esc(src.slice(hlast, hm.index));
      if (hm[1]) hout += '<span class="com">' + esc(ht) + '</span>';
      else if (hm[2]) { inTag = ht.charAt(0) === '<'; hout += '<span class="kw">' + esc(ht) + '</span>'; }
      else if (hm[3]) hout += esc(ht.charAt(0)) + '<span class="fn">' + esc(ht.slice(1)) + '</span>';
      else hout += '<span class="str">' + esc(ht) + '</span>';
      hlast = hre.lastIndex;
    }
    return hout + esc(src.slice(hlast));
  }
  var py = !lang || lang === 'python' || lang === 'py';
  var js = !lang || /^(js|javascript|ts|typescript|json|makecode)$/.test(lang);
  var comment = (py ? '#[^\\n]*' : '') + (py && js ? '|' : '') + (js ? '\\/\\/[^\\n]*' : '');
  if (!comment) comment = '#[^\\n]*';
  var re = new RegExp(
    '(' + comment + ')|' +
    '("""[\\s\\S]*?"""|f?"(?:[^"\\\\\\n]|\\\\.)*"|f?\'(?:[^\'\\\\\\n]|\\\\.)*\'|`[^`]*`)|' +
    '(\\b\\d+(?:\\.\\d+)?\\b)|' +
    '([A-Za-z_][A-Za-z0-9_.]*)', 'g');
  var kw = new RegExp('^(import|from|as|def|return|if|elif|else|for|while|in|not|and|or|class|with|try|except|finally|raise|lambda|pass|break|continue|True|False|None|const|let|var|function|new|async|await|export|true|false|null)$');
  var out = '', last = 0, m;
  while ((m = re.exec(src))) {
    out += esc(src.slice(last, m.index));
    var t = m[0];
    if (m[1]) out += '<span class="com">' + esc(t) + '</span>';
    else if (m[2]) out += '<span class="str">' + esc(t) + '</span>';
    else if (m[3]) out += '<span class="num">' + esc(t) + '</span>';
    else if (kw.test(t)) out += '<span class="kw">' + esc(t) + '</span>';
    else if (src.charAt(re.lastIndex) === '(') out += '<span class="fn">' + esc(t) + '</span>';
    else out += esc(t);
    last = re.lastIndex;
  }
  return out + esc(src.slice(last));
}
if (typeof module !== 'undefined') module.exports = { highlightCode: highlightCode };
