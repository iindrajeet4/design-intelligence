# Security Policy

## Attack surface

This project is intentionally small and low-risk:

- The knowledge layer is plain Markdown, YAML, and JSON — data, not executable code.
- The tooling (`tools/`) is **zero-dependency Node**. It reads files in the repository
  and writes only where you tell it (`build-index`, `tokens --out`, `new-skill`).
- The MCP server (`tools/di-mcp.mjs`) exposes read/query tools over the local knowledge
  base via stdio. It performs no network calls and executes no repository code.

There is no server, database, authentication, or user data.

## Reporting a vulnerability

Please report privately — do **not** open a public issue for a security problem:

1. Use GitHub's **"Report a vulnerability"** (private security advisory) on the
   repository, or
2. Contact the maintainer privately through GitHub.

Include what you found, how to reproduce it, and the potential impact. We aim to
acknowledge reports promptly and will credit reporters who wish to be named once a fix
is released.

## Supported versions

The project is pre-1.0; fixes land on `main`. Pin a git commit or a published npm version
if you need stability.
