# Contributing to MJX

Thank you for your interest in contributing to MJX. This project is open to contributions from anyone who is interested in natural language-driven code generation, compiler design, or any of the 100+ target platforms we support.

## How to Contribute

There are several ways to contribute to the MJX project:

**Adding a New Compilation Target**: If you want to add a new "English to {X}" target, create a new `.mdx` file in the `docs/` directory following the existing specification format. Include the architecture, IR schema, and at least one worked example.

**Improving Existing Specifications**: If you find errors, ambiguities, or areas for improvement in the existing specifications, please open a pull request with your changes.

**Building a Code Generator**: If you want to implement an actual code generator for any of the specified targets, create a new directory under `generators/` and include a `README.md` describing your implementation.

## File Format

All documentation files use the `.mdx` format with YAML frontmatter. Each file must include:

```yaml
---
title: "Your Document Title"
description: "A one-sentence description of the document."
---
```

## Code of Conduct

This project adheres to a standard open-source code of conduct. Please be respectful and constructive in all interactions.
