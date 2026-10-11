# AC9TDI10K02 — Content, structure and presentation separation

**Year 9-10**
**Strand:** Knowledge and Understanding

## ACARA Descriptor

represent documents online as content (text), structure (markup) and presentation (styling) and explain why such representations are important

## Prior Knowledge

Students can use a range of digital tools to create and communicate content (AC9TDI8P11, AC9TDI8P12). They have not yet formally encountered the three-layer model of web documents or the rationale for separating content, structure and presentation.

## Progression Endpoint

Students represent online documents by separating content (text), structure (HTML markup) and presentation (CSS styling), and explain why this separation is important for design, maintenance and accessibility.

## Waypoint Sequence (3 waypoints, 2 hinges)

#### 1. The three layers of a web document ⚑

Students can identify and distinguish the three layers of an online document: content, structure and presentation.

**⚑ Hinge:** Misidentifying what belongs to content, structure, or presentation directly prevents N2 — students who conflate layers cannot correctly use HTML for structure and CSS for presentation.

**Response modes:**
- ◆ Practise here: Distinguishing three layers is a precision task — students commonly assign CSS rules to 'structure' or treat HTML tags as presentation. Sufficient practice mapping specific examples (this text, this tag, this rule) to the correct layer builds the reliable discrimination needed before N2.

**Minimum width:** Given a web page, identify what is content (text), what is structure (markup that organises the document), and what is presentation (how it looks).

**Typical width:** Describe what each layer contains and what role it plays; identify examples of HTML structural tags and CSS presentation rules in a web page.

**Wider:**
- Compare how the same HTML document renders with and without CSS — articulate specifically what changed and what did not
- Investigate how a screen reader interprets an HTML document and explain how structure (not presentation) determines what is communicated to the user

**Success criteria:**
- Correctly assigns specific examples (e.g. heading text, <h1> tag, font-size rule) to the correct layer
- Does not confuse structural tags with visual appearance

#### 2. Representing documents with HTML and CSS ⚑

Students can write web pages using HTML for content and structure and CSS for styling, and explain how HTML tags separate content from structure.

**⚑ Hinge:** Syntactic fluency at N2 is prerequisite for N3 — students who cannot produce working HTML/CSS cannot demonstrate the separation principle in action; they can only describe it abstractly, which does not meet the descriptor's demand.

**Response modes:**
- ◆ Practise here: HTML/CSS syntax requires precision — misplaced tags, missing closing elements, and selector errors are common. Students need sufficient practice with the syntax to develop fluency before the conceptual significance of separation is legible to them.

**Minimum width:** Write a simple web page with at least two structural HTML elements and one CSS rule applied to them; explain what the tag does versus what the CSS rule does.

**Typical width:** Create a web page using HTML structural tags (headings, paragraphs, lists, divs) and CSS rules (colour, font, layout); explain how changing the CSS changes presentation without altering structure.

**Wider:**
- Apply CSS classes to demonstrate how the same structural element can have different presentations in different contexts on the same page
- Use CSS to implement a responsive layout that changes presentation based on screen width, explaining how presentation changes while structure remains constant

**Success criteria:**
- HTML file uses structural tags correctly (headings, paragraphs, at minimum)
- CSS rule targets an HTML element or class and changes its presentation
- Student can explain what the HTML tag does versus what the CSS rule does

#### 3. Why separation matters ★

Students can explain why separating content, structure and presentation is important — specifically how it allows each to be designed, edited and stored independently.

**Response modes:**
- ↔ Widen contexts: Students who have only produced a single small web page often struggle to appreciate why separation matters — the benefit is invisible at small scale. Multiple contexts (site-wide restyling, screen reader accessibility, multi-language content) each illuminate a different reason, making the principle concrete across scales.

**Minimum width:** Give at least one reason why separating content, structure and presentation is important — with a concrete example of the benefit.

**Typical width:** Explain multiple benefits of separation: independent editing, consistent presentation across many pages via a single CSS file, accessibility (structure legible to screen readers), and easier maintenance.

**Wider:**
- Demonstrate the maintenance benefit by changing one CSS file to restyle an entire multi-page site, explaining why this would be impractical if styling were embedded in content
- Investigate how major content management systems (e.g. WordPress themes) implement content/structure/presentation separation and explain the architectural choices
- Examine how First Nations language preservation websites use structured content to support multiple language versions of the same page — explaining why structure separation makes this feasible

**Success criteria:**
- Explains at least one concrete benefit of separation with a specific example
- Connects the benefit to a real consequence (e.g. changing one CSS file updates many pages)
