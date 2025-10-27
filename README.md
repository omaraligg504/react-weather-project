# Task Manager Dashboard (React + TypeScript)

A compact, modern admin-style dashboard built with React, TypeScript, Tailwind
CSS and a component set (shadcn/ui style). The app demonstrates a small task
manager (notes) component that groups tasks by priority and allows quick
add/edit/delete operations.

## Quick overview — app logic

- The UI is a single-page React app (Vite) structured into small components.
- The `NoteManagerCard` (Task Manager) is a focused component that manages an
  in-memory list of tasks (notes). Each note has:
  - `id` (number)
  - `text` (string)
  - `priority` (one of `important`, `normal`, `delayed`)
- Main behaviors:
  - Add: create a new note (client-side). Enter or pressing the Add button
    appends a new note.
  - Edit priority: change a note's priority using a dropdown/select.
  - Delete: remove a note from the list.
- Presentation: tasks are styled and color-coded per priority. Component aims to
  be small, readable, and easy to test.

Note: The current implementation stores tasks in component state. For
persistence, integrate localStorage or a backend API and lift state to a context
or a store (Redux/Zustand) if needed.

## Project structure (most relevant files)

- `index.html` — app entry; includes favicon link(s).
- `src/main.tsx` — React entry and router/provider wiring.
- `src/App.tsx` — top-level app shell and routes.
- `src/pages/Dashboard.tsx` — dashboard page that composes cards.
- `src/components/NoteManagerCard.tsx` — simplified task manager component
  (add/change/delete tasks).
- `src/components/ui/*` — shared UI primitives (Button, Input, Card, Select,
  etc.).
- `src/lib/utils.ts` — small helpers (e.g., `cn` class merging).

If you plan to extend the app, add endpoints or a store directory for data
fetching and state management.

## Local development

Install dependencies (from project root):

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Customization & notes

- Favicon: `public/` contains `favicon.ico` and other static assets. If the
  browser tab still shows an old icon, check `index.html` (the
  `<link rel="icon" href="...">` tag) and clear the browser cache or use a
  different file name (e.g., `favicon-v2.ico`) and reference it in `index.html`
  to force refresh.
- Persisting tasks: add a simple REST endpoint and call it from
  `NoteManagerCard` or lift state into a global store and call the API there.
- Styling: Tailwind config is in `tailwind.config.ts`. Use existing `ui/`
  components to keep consistent styles.

## Testing and linting

- Linting and type checks depend on configured tools in the repo. Typical
  commands:

```bash
npm run lint
npm run typecheck
```

(If these scripts aren't present in `package.json`, add/adjust them to match
your toolchain.)

## Contributing

1. Create a branch for your work.
2. Keep changes small and focused (UI vs logic vs styles).
3. Run the dev server and ensure the component behaves as expected.

## Troubleshooting

- Favicon not updating: browsers aggressively cache favicons. Use a new file
  name and update `index.html`, then hard-refresh the page (Ctrl+F5) or open a
  private window.
- TypeScript/compile errors after edits: check the Vite console and the
  TypeScript error lines. Small component edits should be local and fast to
  iterate.

## Contact / Next steps

If you'd like, I can:

- Add localStorage persistence for tasks.
- Connect the task manager to a small mock API.
- Add tests (Jest + React Testing Library) for the `NoteManagerCard`.

---

This README focuses on practical usage and the app's core logic. If you want a
shorter README or a longer developer guide (with architecture diagrams,
component contracts, and example API shapes), tell me which format you prefer
and I'll produce it.

## Project info

## How can I edit this code?

The only requirement is having Node.js & npm installed -
[install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once
  you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
