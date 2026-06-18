# DnD Companion

Local Wi-Fi D&D companion for DM and player devices. The app is now a
server-authoritative React/TypeScript frontend with a Node/Express/Socket.io
backend.

## Quick start

```bash
npm.cmd install
npm.cmd run build
npm.cmd start
```

The server prints:

- DM URL with a local token
- Player URL for other devices on the same Wi-Fi

Use `npm.cmd run dev` while developing.

## What changed in v2

- DM access is protected by a local token.
- Player permissions are enforced on the server.
- Clients submit small validated actions instead of full-state snapshots.
- Draft fields stay local until submitted, so another device cannot wipe a
  half-written heal, damage or item form.
- History is visible in a side panel. The log is global, but undo/redo is scoped
  to the current page.
- Monster and item databases live in server state and autosave.

## Tests

```bash
npm.cmd test
npm.cmd run test:e2e
```

See `README_MULTIPLAYER.md` for more operational details.

## Dokumentace / Documentation

- **[AGENTS.md](file:///AGENTS.md)** – Detailed rules and architectural information for AI assistants (variables, keyboard shortcuts, rules, design system, etc.).
- **[docs/FUNCTIONALITY.md](file:///docs/FUNCTIONALITY.md)** – Detailed breakdown of the application features (Combat, Character Sheets, Inventory, Databases, History, etc.).
- **[README_EFFECTS.md](file:///README_EFFECTS.md)** – Documentation for the dynamic condition (effects) system, including stat adjustments, leveled conditions, and dice metadata.
- **[README_MULTIPLAYER.md](file:///README_MULTIPLAYER.md)** – Guides on roles (DM vs. Player), networking, history, and multiplayer workflows.
