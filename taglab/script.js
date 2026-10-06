(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const { lessons, examples, challenges, questions } = window.TagLabContent;
  const page = document.body.dataset.page;
  const params = new URLSearchParams(location.search);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const memory = {};
  const storage = {
    read(key, fallback) {
      try {
        const value = localStorage.getItem("taglab.v2." + key);
        return value === null ? fallback : JSON.parse(value);
      } catch {
        return memory[key] ?? fallback;
      }
    },
    write(key, value) {
      memory[key] = value;
      try {
        localStorage.setItem("taglab.v2." + key, JSON.stringify(value));
      } catch {
        const notice = $("#storage-notice");
        if (notice) {
          notice.hidden = false;
          notice.textContent =
            "Browser storage is unavailable. Everything still works, but progress and drafts may be lost when you leave this page.";
        }
      }
    },
  };
  const savedIds = (key) => {
    const data = storage.read(key, []);
    return Array.isArray(data) ? data : [];
  };
  function saveCompleted(key, id) {
    storage.write(key, [...new Set([...savedIds(key), id])]);
    updateProgress();
  }
  function updateProgress() {
    const done = savedIds("lessons").filter(
      (id) => Number.isInteger(id) && id >= 1 && id <= 6,
    );
    $$("[data-lesson-status]").forEach((node) => {
      node.textContent = done.includes(Number(node.dataset.lessonStatus))
        ? "Completed ✓"
        : node.tagName === "SMALL"
          ? ""
          : "Start lesson ↗";
    });
    $$("[data-challenge-status]").forEach((node) => {
      node.textContent = savedIds("challenges").includes(
        node.dataset.challengeStatus,
      )
        ? "Completed ✓"
        : "Try challenge ↗";
    });
    if ($("#lesson-progress")) {
      $("#lesson-progress").value = done.length;
      $("#lesson-progress-label").textContent =
        `${done.length} of 6 lessons complete`;
      const next = lessons.find((item) => !done.includes(item.id));
      $("#resume-learning").href = next
        ? `lesson-${next.id}.html`
        : "practice.html";
      $("#resume-learning").textContent = next
        ? `Continue with lesson ${next.id} →`
        : "All done! Practice next ↗";
    }
    $$("[data-complete-lesson]").forEach((button) => {
      const completed = done.includes(Number(button.dataset.completeLesson));
      button.setAttribute("aria-pressed", String(completed));
      button.textContent = completed
        ? "Lesson completed ✓"
        : "Mark as complete ✓";
    });
  }
  updateProgress();
  $$("[data-complete-lesson]").forEach((button) =>
    button.addEventListener("click", () => {
      saveCompleted("lessons", Number(button.dataset.completeLesson));
      $("#completion-status").textContent =
        "Nice work! This lesson is marked complete. Continue whenever you are ready.";
    }),
  );
  const menuButton = $(".menu-toggle");
  function closeMenu() {
    $("#main-nav").classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    $("#main-nav").classList.toggle("open", open);
  });
  $$("#main-nav a").forEach((link) =>
    link.addEventListener("click", closeMenu),
  );
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      menuButton.focus();
    }
    if (
      event.target.closest('input, textarea, select, [contenteditable="true"]')
    )
      return;
    if (
      event.altKey &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      /^Digit[1-5]$/.test(event.code)
    ) {
      event.preventDefault();
      location.href = [
        "index.html",
        "lessons.html",
        "examples.html",
        "practice.html",
        "quiz.html",
      ][Number(event.code.slice(-1)) - 1];
    }
  });
  window.addEventListener(
    "scroll",
    () => $(".site-header").classList.toggle("scrolled", window.scrollY > 8),
    { passive: true },
  );
  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("is-waiting");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.06 },
    );
    $$(".reveal").forEach((node) => {
      node.classList.add("is-waiting");
      observer.observe(node);
    });
  }
  $(".motion-toggle")?.addEventListener("click", (event) => {
    const button = event.currentTarget,
      paused = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(paused));
    button.textContent = paused ? "Play animation" : "Pause animation";
    $(".hero").classList.toggle("motion-paused", paused);
  });
  async function copyText(value, status) {
    try {
      if (navigator.clipboard && window.isSecureContext)
        await navigator.clipboard.writeText(value);
      else {
        const field = document.createElement("textarea");
        field.value = value;
        field.className = "clipboard-fallback";
        document.body.append(field);
        field.select();
        const success = document.execCommand("copy");
        field.remove();
        if (!success) throw new Error("Clipboard unavailable");
      }
      if (status)
        status.textContent = "Code copied. Paste it into your editor.";
    } catch {
      if (status)
        status.textContent =
          "Copy is unavailable in this browser. Select the code and press Ctrl/Cmd+C.";
    }
  }
  $$("[data-copy-source]").forEach((button) =>
    button.addEventListener("click", () =>
      copyText(
        document.getElementById(button.dataset.copySource).textContent,
        $(".copy-status"),
      ),
    ),
  );
  const editor = $("#html-editor");
  let challenge;
  if (editor) {
    let originalCode = editor.value,
      draftKey = "draft.home";
    if (page === "examples") {
      const lesson = lessons.find(
        (item) => item.id === Number(params.get("lesson")),
      );
      const example =
        examples.find((item) => item.id === params.get("example")) ||
        examples[0];
      originalCode = lesson ? lesson.code : example.code;
      draftKey = lesson
        ? "draft.lesson." + lesson.id
        : "draft.example." + example.id;
      $("#example-title").textContent = lesson ? lesson.title : example.title;
      $("#example-description").textContent = lesson
        ? "An example from lesson " +
          lesson.id +
          ". Edit it, run it and make it your own."
        : example.description;
      $$("[data-example-link]").forEach((link) => {
        if (!lesson && link.dataset.exampleLink === example.id)
          link.setAttribute("aria-current", "page");
      });
    }
    if (page === "practice") {
      challenge =
        challenges.find((item) => item.id === params.get("challenge")) ||
        challenges[0];
      originalCode = challenge.starter;
      draftKey = "draft.challenge." + challenge.id;
      $("#challenge-title").textContent = challenge.title;
      $("#challenge-level").textContent = challenge.level;
      $("#challenge-description").textContent = challenge.description;
      $("#challenge-hint").textContent = challenge.hint;
      $("#challenge-solution").textContent = challenge.solution;
      $("#challenge-checks").replaceChildren(
        ...challenge.checks.map((label) => {
          const li = document.createElement("li");
          li.textContent = label;
          return li;
        }),
      );
      $$("[data-challenge-link]").forEach((link) => {
        if (link.dataset.challengeLink === challenge.id)
          link.setAttribute("aria-current", "page");
      });
      const next = challenges[challenges.indexOf(challenge) + 1];
      $("#next-challenge").href = next
        ? "practice.html?challenge=" + next.id
        : "quiz.html";
      $("#next-challenge").textContent = next
        ? "Next challenge →"
        : "Ready for the quiz? →";
    }
    const saved = storage.read(draftKey, originalCode);
    editor.value = typeof saved === "string" ? saved : originalCode;
    const preview = $("#code-preview");
    let previewTimer;
    function previewDocument(code) {
      const parsed = new DOMParser().parseFromString(code, "text/html");
      const csp = parsed.createElement("meta");
      csp.httpEquiv = "Content-Security-Policy";
      csp.content =
        "default-src 'none'; style-src 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'";
      const style = parsed.createElement("style");
      style.textContent =
        "body{margin:0;padding:8px;background:#f5f5ed;color:#171c18;font:16px/1.6 Arial,sans-serif;overflow-wrap:anywhere}h1{font-size:30px;line-height:1.2;letter-spacing:-1px;margin:10px 0}p{color:#697168}button{background:#c2f36b;border:0;border-radius:8px;padding:10px 16px;color:#171c18}a{color:#345e22}input{padding:8px;border:1px solid #697168;border-radius:6px;max-width:100%}img{max-width:100%}*{box-sizing:border-box}";
      parsed.head.prepend(csp, style);
      return "<!doctype html>\n" + parsed.documentElement.outerHTML;
    }
    function runCode(announce = true) {
      clearTimeout(previewTimer);
      preview.srcdoc = previewDocument(editor.value);
      if (announce)
        $("#run-status").textContent =
          "Preview updated. This is what your HTML creates.";
    }
    function saveDraft() {
      storage.write(draftKey, editor.value);
    }
    runCode(false);
    $("#run-code").addEventListener("click", () => runCode());
    $("#auto-preview")?.addEventListener("change", (event) => {
      if (event.target.checked) runCode();
    });
    editor.addEventListener("input", () => {
      saveDraft();
      clearTimeout(previewTimer);
      if ($("#auto-preview")?.checked)
        previewTimer = setTimeout(() => runCode(false), 300);
      if (challenge) {
        $$("#challenge-checks li").forEach((li) => {
          li.classList.remove("passed", "failed");
          li.removeAttribute("aria-label");
        });
        $("#challenge-status").textContent =
          "Your code changed. Check it when you are ready.";
      }
    });
    editor.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        runCode();
      }
    });
    $("#reset-code").addEventListener("click", () => {
      editor.value = originalCode;
      saveDraft();
      editor.dispatchEvent(new Event("input"));
      runCode(false);
      $("#run-status").textContent = "Starter code restored.";
    });
    $("#copy-code")?.addEventListener("click", () =>
      copyText(editor.value, $("#run-status")),
    );
    $("#download-code")?.addEventListener("click", () => {
      const code = /<html[\s>]/i.test(editor.value)
        ? editor.value
        : '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>My TagLab page</title>\n</head>\n<body>\n' +
          editor.value +
          "\n</body>\n</html>";
      const url = URL.createObjectURL(new Blob([code], { type: "text/html" }));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "my-taglab-page.html";
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      $("#run-status").textContent =
        "HTML downloaded. Open it in a browser or edit it in your code editor.";
    });
    $$("[data-preset]").forEach((button) =>
      button.addEventListener("click", () => {
        const selected = examples.find(
          (item) => item.id === button.dataset.preset,
        );
        if (!selected) return;
        editor.value = selected.code;
        saveDraft();
        runCode();
      }),
    );
    if (challenge)
      $("#check-challenge").addEventListener("click", () => {
        const doc = new DOMParser().parseFromString(editor.value, "text/html");
        const nonempty = (selector) =>
          [...doc.querySelectorAll(selector)].some((node) =>
            node.textContent.trim(),
          );
        const heading = nonempty("h1,h2,h3,h4,h5,h6");
        const validLink = [...doc.querySelectorAll("a[href]")].some((node) => {
          const href = node.getAttribute("href").trim();
          if (!node.textContent.trim() || !/^https?:\/\//i.test(href))
            return false;
          try {
            return Boolean(new URL(href).hostname);
          } catch {
            return false;
          }
        });
        let results;
        switch (challenge.id) {
          case "intro":
            results = [nonempty("h1"), nonempty("p")];
            break;
          case "links":
            results = [heading, validLink];
            break;
          case "list":
            results = [
              heading,
              Boolean(doc.querySelector("ul,ol")),
              [...doc.querySelectorAll("ul,ol")].some(
                (list) =>
                  [...list.children].filter(
                    (node) => node.tagName === "LI" && node.textContent.trim(),
                  ).length >= 3,
              ),
            ];
            break;
          case "form": {
            const labeled = [...doc.querySelectorAll("form input")].some(
              (input) =>
                input.type === "text" &&
                [...doc.querySelectorAll("label")].some(
                  (label) =>
                    label.textContent.trim() &&
                    ((input.id && label.htmlFor === input.id) ||
                      label.contains(input)),
                ),
            );
            results = [
              Boolean(doc.querySelector("form")),
              labeled,
              nonempty("form button"),
            ];
            break;
          }
        }
        $$("#challenge-checks li").forEach((li, i) => {
          li.classList.toggle("passed", results[i]);
          li.classList.toggle("failed", !results[i]);
          li.setAttribute(
            "aria-label",
            (results[i] ? "Passed: " : "Not yet: ") + challenge.checks[i],
          );
        });
        const passed = results.filter(Boolean).length;
        $("#challenge-status").textContent =
          passed === results.length
            ? "You did it! Every check passed. Try the next challenge."
            : `${passed} of ${results.length} checks passed. Review the highlighted items or open the hint.`;
        if (passed === results.length)
          saveCompleted("challenges", challenge.id);
        runCode(false);
      });
  }
  if ($("#quiz-options")) {
    let index = 0;
    const answers = [];
    function bestScore() {
      const best = storage.read("quiz-best", null);
      if ($("#best-score"))
        $("#best-score").textContent = Number.isInteger(best)
          ? `Your best score: ${best} / ${questions.length}`
          : "Your first quiz starts here.";
    }
    function renderQuestion() {
      const q = questions[index];
      $("#quiz-counter").textContent =
        `Question ${String(index + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
      $("#quiz-question").textContent = q.question;
      $("#quiz-progress-bar").style.width =
        `${((index + 1) / questions.length) * 100}%`;
      $("#quiz-feedback").textContent =
        "Choose an answer to check your understanding.";
      $("#quiz-next").hidden = true;
      $("#quiz-review")?.setAttribute("hidden", "");
      $("#quiz-options").replaceChildren(
        ...q.options.map((option, i) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "quiz-option";
          const letter = document.createElement("span");
          letter.textContent = String.fromCharCode(65 + i);
          const code = document.createElement("code");
          code.textContent = option;
          button.append(letter, code);
          button.addEventListener("click", () => answer(i));
          return button;
        }),
      );
    }
    function answer(choice) {
      if (answers[index] !== undefined) return;
      answers[index] = choice;
      const q = questions[index];
      $$(".quiz-option").forEach((button, i) => {
        button.disabled = true;
        if (i === q.correct) button.classList.add("correct");
        else if (i === choice) button.classList.add("incorrect");
      });
      $("#quiz-feedback").textContent =
        (choice === q.correct ? "Correct! " : "Not quite. ") + q.explanation;
      $("#quiz-next").textContent =
        index === questions.length - 1 ? "See my result →" : "Next question →";
      $("#quiz-next").hidden = false;
    }
    $("#quiz-next").addEventListener("click", () => {
      if (index === questions.length) {
        index = 0;
        answers.length = 0;
        renderQuestion();
        $("#quiz-options button").focus({ preventScroll: true });
        return;
      }
      if (answers[index] === undefined) return;
      index++;
      if (index < questions.length) {
        renderQuestion();
        $("#quiz-options button").focus({ preventScroll: true });
        return;
      }
      const score = answers.filter(
          (answer, i) => answer === questions[i].correct,
        ).length,
        previous = storage.read("quiz-best", 0);
      storage.write(
        "quiz-best",
        Math.max(Number.isInteger(previous) ? previous : 0, score),
      );
      bestScore();
      $("#quiz-counter").textContent = "Quiz complete";
      $("#quiz-question").textContent =
        `${score} out of ${questions.length}. Keep building!`;
      $("#quiz-options").replaceChildren();
      $("#quiz-feedback").textContent =
        score === questions.length
          ? "Every answer correct. You are ready to build your first page."
          : "Every attempt is progress. Review the answers, revisit a lesson and try again.";
      $("#quiz-next").textContent = "Try again ↻";
      if ($("#quiz-review")) {
        $("#quiz-review").hidden = false;
        $("#quiz-review").replaceChildren(
          ...questions.map((q, i) => {
            const item = document.createElement("details"),
              summary = document.createElement("summary");
            summary.textContent = `${answers[i] === q.correct ? "✓" : "↺"} ${i + 1}. ${q.question}`;
            const body = document.createElement("p");
            body.textContent = `Your answer: ${q.options[answers[i]]}. ${q.explanation}`;
            item.append(summary, body);
            return item;
          }),
        );
      }
    });
    bestScore();
    renderQuestion();
  }
})();
