# Numbas JME (vendored)

The expression engine of [Numbas](https://www.numbas.org.uk/) (Newcastle University, Apache-2.0, see `LICENSE`),
used by maths `answer` checks that have `form:` (see `tools/maths-forms.mjs`). Only the JME runtime and the English
strings are kept, minified. `VERSION` names the release.

To update: `sh tools/numbas/build-jme.sh v11.0` (or a newer tag), then `npm run check-forms` and `npm run validate`.
The build copies these files to `dist/_numbas/`, and only lessons with a `form:` check load them.
