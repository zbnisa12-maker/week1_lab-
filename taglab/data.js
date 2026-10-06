window.TagLabContent = {
  examples: [
    {
      id: "hello",
      title: "Your first page",
      description:
        "A heading, a paragraph and a button. Change the words and make it yours.",
      code: "<h1>Hello, world!</h1>\n<p>My first page starts here.</p>\n<button>Let’s build</button>",
    },
    {
      id: "text",
      title: "Headings & text",
      description:
        "Structure your writing with headings, paragraphs and emphasis.",
      code: "<h1>My travel journal</h1>\n<h2>A day in the mountains</h2>\n<p>The air was <em>so fresh</em>.</p>\n<p><strong>Remember:</strong> bring water!</p>",
    },
    {
      id: "links",
      title: "Links",
      description:
        "The href attribute gives a link its destination. Click a link in the preview to see navigation behavior within its isolated frame.",
      code: '<h1>My favorite place on the web</h1>\n<p>A link uses an href attribute.</p>\n<a href="https://developer.mozilla.org/">Explore web documentation</a>',
    },
    {
      id: "lists",
      title: "Lists",
      description:
        "Group related items with an unordered list. Try changing ul to ol.",
      code: "<h1>Things I want to build</h1>\n<ul>\n  <li>A personal website</li>\n  <li>A travel journal</li>\n  <li>A page for my favorite recipes</li>\n</ul>",
    },
    {
      id: "form",
      title: "Forms",
      description:
        "Try typing into a labeled input. This example demonstrates form controls; it does not send or store a response.",
      code: '<h1>Say hello</h1>\n<form>\n  <label for="name">Your name</label><br>\n  <input id="name" name="name" placeholder="Alex"><br><br>\n  <button type="button">Hello!</button>\n</form>',
    },
    {
      id: "page",
      title: "Personal page",
      description:
        "A tiny project that combines headings, text, lists and a useful link.",
      code: '<main>\n  <h1>Hi, I’m Alex.</h1>\n  <p>I am learning to build for the web.</p>\n  <h2>Things I love</h2>\n  <ul>\n    <li>Music</li>\n    <li>Exploring new places</li>\n    <li>Making things</li>\n  </ul>\n  <a href="https://developer.mozilla.org/">My learning resource</a>\n</main>',
    },
  ],
  lessons: [
    {
      title: "Your first HTML page",
      paragraphs: [
        "HTML stands for HyperText Markup Language. It describes the structure and meaning of a web page. A browser reads your HTML and displays the result.",
        "Most elements have an opening tag, content and a closing tag. In <h1>Hello!</h1>, <h1> opens the heading and </h1> closes it. The whole thing is an element.",
        "A full document begins with <!DOCTYPE html>. The head contains page information, such as the title. The body contains what visitors see.",
      ],
      code: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <title>My first page</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n    <p>I made this.</p>\n  </body>\n</html>',
      id: 1,
      symbol: "</>",
      summary: "Meet tags, elements and the structure behind every website.",
      minutes: 8,
    },
    {
      title: "Text that tells a story",
      paragraphs: [
        "Use headings to organize the page. <h1> is the main heading; <h2> introduces a major section. Follow a logical hierarchy instead of choosing headings just for their size.",
        "Use <p> for a paragraph. <strong> marks important content and <em> adds emphasis. CSS can change how these elements look.",
      ],
      code: "<h1>My travel journal</h1>\n<h2>A day in the mountains</h2>\n<p>The air was <em>so fresh</em>.</p>\n<p><strong>Remember:</strong> bring water!</p>",
      id: 2,
      symbol: "Aa",
      summary: "Give your ideas structure with headings and paragraphs.",
      minutes: 6,
    },
    {
      title: "Connect your world",
      paragraphs: [
        "An <a> element creates a link. Its href attribute tells the browser where to go. The text between the tags is the link label.",
        'An <img> element displays an image. src is the image location; alt provides a text alternative. Use meaningful alt text for meaningful images and alt="" for purely decorative ones. Unlike a paragraph, img is a void element and has no closing tag.',
      ],
      code: '<h1>Explore something new</h1>\n<p><a href="https://developer.mozilla.org/">Read about HTML</a></p>\n<!-- Use your own local image filename: -->\n<!-- <img src="mountains.jpg" alt="Snowy mountains under a clear blue sky"> -->',
      id: 3,
      symbol: "↗",
      summary: "Add links and images that make your page feel alive.",
      minutes: 8,
    },
    {
      title: "A little more structure",
      paragraphs: [
        "Use <ul> for an unordered list and <ol> for an ordered list. Each item belongs in an <li> element.",
        "Semantic elements describe their role: header introduces a page or section, nav contains navigation, main holds the main content, and footer ends the page or section. Use a section to group a meaningful topic, usually with a heading.",
      ],
      code: "<main>\n  <section>\n    <h1>My weekend plan</h1>\n    <ol>\n      <li>Learn a new HTML tag</li>\n      <li>Build a tiny page</li>\n      <li>Show a friend</li>\n    </ol>\n  </section>\n</main>",
      id: 4,
      symbol: "≡",
      summary: "Organize information with lists and meaningful sections.",
      minutes: 7,
    },
    {
      title: "Make it interactive",
      paragraphs: [
        "A form groups controls for collecting information. Give each input a label. The label’s for attribute matches the input’s id.",
        'Use a button for an action. type="button" prevents a button from submitting a form. A real form submission needs a destination or application logic; HTML alone does not store the response.',
      ],
      code: '<h1>Say hello</h1>\n<form>\n  <label for="name">Your name</label><br>\n  <input id="name" name="name" placeholder="Alex"><br><br>\n  <button type="button">Hello!</button>\n</form>',
      id: 5,
      symbol: "[ ]",
      summary: "Build friendly forms with labels, inputs and buttons.",
      minutes: 10,
    },
    {
      title: "Build your first page",
      paragraphs: [
        "Combine what you know: a main heading, an introduction, a list of interests and a useful link. Keep the structure clear and the text your own.",
        "When you are ready to work outside the playground, save an HTML document as index.html and open it in your browser. Add a CSS file to customize the colors, spacing and layout.",
      ],
      code: '<main>\n  <h1>Hi, I’m Alex.</h1>\n  <p>I am learning to build for the web.</p>\n  <h2>Things I love</h2>\n  <ul>\n    <li>Music</li>\n    <li>Exploring new places</li>\n    <li>Making things</li>\n  </ul>\n  <a href="https://developer.mozilla.org/">My learning resource</a>\n</main>',
      id: 6,
      symbol: "✓",
      summary: "Bring everything together in a tiny personal website.",
      minutes: 15,
    },
  ],
  questions: [
    {
      question: "Which tag creates a paragraph?",
      options: ["<h1>", "<p>", "<img>"],
      correct: 1,
      explanation: "The <p> element defines a paragraph.",
    },
    {
      question: "Which attribute sets a link’s destination?",
      options: ["href", "src", "alt"],
      correct: 0,
      explanation: "href gives an <a> element its destination.",
    },
    {
      question: "Where does the visible page content belong?",
      options: ["<head>", "<title>", "<body>"],
      correct: 2,
      explanation: "The <body> contains the content that visitors see.",
    },
    {
      question: "Which element is a list item?",
      options: ["<ul>", "<li>", "<ol>"],
      correct: 1,
      explanation: "Each item in an ordered or unordered list uses <li>.",
    },
    {
      question: "What does an image’s alt attribute provide?",
      options: ["A text alternative", "An image filename", "The page title"],
      correct: 0,
      explanation: "alt supplies a text alternative for an image.",
    },
  ],
  challenges: [
    {
      id: "intro",
      title: "Introduce yourself",
      level: "01 / Getting started",
      description:
        "Make your first personal introduction with a main heading and a paragraph.",
      checks: ["Add one non-empty h1 heading", "Add a non-empty paragraph"],
      hint: "Start with <h1>Your name</h1>. Put your introduction inside <p>...</p>.",
      starter:
        "<!-- Add your name as an h1 -->\n\n<!-- Introduce yourself in a paragraph -->\n",
      solution:
        "<h1>Hi, I’m Alex.</h1>\n<p>I am learning HTML and I love making things.</p>",
    },
    {
      id: "links",
      title: "Share your favorites",
      level: "02 / Make connections",
      description:
        "Create a heading and a labeled link to a website you enjoy.",
      checks: [
        "Add a non-empty heading",
        "Add a link with useful text and a valid URL",
      ],
      hint: 'Use <a href="https://example.com">A useful label</a>. The text should describe the destination.',
      starter:
        "<h1>My favorite place on the web</h1>\n\n<!-- Add a descriptive link -->\n",
      solution:
        '<h1>My favorite learning resource</h1>\n<a href="https://developer.mozilla.org/">Learn about web development</a>',
    },
    {
      id: "list",
      title: "Make a tiny plan",
      level: "03 / Add structure",
      description:
        "Add a heading and a list of at least three things you want to build.",
      checks: [
        "Add a non-empty heading",
        "Use an ordered or unordered list",
        "Include at least three non-empty list items",
      ],
      hint: "Use <ul> for an unordered list or <ol> for a numbered list. Each item needs its own <li>...</li>.",
      starter:
        "<h1>Things I want to build</h1>\n\n<!-- Add a list with three items -->\n",
      solution:
        "<h1>Things I want to build</h1>\n<ul>\n  <li>A portfolio</li>\n  <li>A travel journal</li>\n  <li>A recipe collection</li>\n</ul>",
    },
    {
      id: "form",
      title: "Build a friendly form",
      level: "04 / Meet your visitor",
      description:
        "Create a form containing a label connected to a text input, plus a button.",
      checks: [
        "Add a form element",
        "Connect a non-empty label to a text input",
        "Add a button with a visible label inside the form",
      ],
      hint: 'The label’s for value must match the input’s id. A wrapping label also works. Use type="button" for a button without submission behavior.',
      starter:
        "<h1>Say hello</h1>\n<form>\n  <!-- Add a label, a text input and a button -->\n</form>",
      solution:
        '<h1>Say hello</h1>\n<form>\n  <label for="name">Your name</label>\n  <input id="name" name="name" type="text">\n  <button type="button">Hello!</button>\n</form>',
    },
  ],
};
