# TagLab — Learn HTML

An interactive website for beginners learning HTML. Built with plain HTML, CSS, and JavaScript, with no build step or framework.

## Features

- Responsive animated home page.
- Six lessons with saved completion progress.
- HTML editor with live preview, copy, reset, and download controls.
- Four practice exercises with checks, hints, and example solutions.
- Five-question quiz with explanations and a saved best score.
- Keyboard navigation and reduced-motion support.

## Run locally

Download the repository as a ZIP, extract it, and open `index.html` in a browser. Keep all files together.

For consistent progress and draft storage across pages, serve the folder with your editor's local web server or run:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Home page |
| `lessons.html` | Lesson catalog |
| `lesson-1.html` … `lesson-6.html` | Individual lessons |
| `examples.html` | Examples and HTML editor |
| `practice.html` | Practice exercises |
| `quiz.html` | Quiz and results |
| `styles.css` | Layout, colors, responsive styles, animations |
| `data.js` | Editor examples, exercise data, quiz questions |
| `script.js` | Interactions and local progress storage |
| `START-HERE.txt` | Detailed instructions in Russian |

Lesson text is in the individual HTML pages. If you change a lesson's example, update both its HTML page and the matching entry in `data.js`.

## Keyboard controls

- **Tab / Enter:** focus and activate links or buttons.
- **Alt + 1–5:** Home, Lessons, Examples, Practice, Quiz.
- **Ctrl + Enter / Cmd + Enter:** run code in the editor.
- **Escape:** close the mobile menu.

## Notes

Progress and drafts are stored in the current browser when local storage is available. There is no account system or backend. The editor preview supports HTML and CSS in a sandbox; scripts, form submission, and external resources inside the preview are disabled. Google Fonts require an internet connection; fallback fonts are provided.

[Editable Figma design](https://www.figma.com/design/WuBEo2k6Lx4GGXwg6kbGIn?node-id=2-38). Figma and the source code are edited separately.
