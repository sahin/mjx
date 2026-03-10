># MJX: The English-to-{X} Compiler

**MJX** is an open-source project dedicated to exploring the frontier of natural language-driven code generation. It provides a framework and a set of tools for compiling plain English descriptions into various target languages and platforms, from SwiftUI and Vapor to SQL and Terraform.

This repository contains the core research, specifications, and the documentation website for the MJX project.

## Core Concepts

The project is founded on a three-stage compilation pipeline:

1.  **Intent Parsing (LLM)**: A Large Language Model interprets English input to understand the user's intent.
2.  **Intermediate Representation (IR)**: The parsed intent is converted into a structured, language-agnostic JSON format.
3.  **Code Generation**: A deterministic code generator processes the IR to produce clean, high-quality code in the target language.

## Documentation

The full documentation, including the detailed architecture specifications and the list of 100 potential compilation targets, is available on our documentation website.

## Contributing

We welcome contributions from the community! Whether you are interested in compiler design, language models, or specific target platforms, there are many ways to get involved. Please see our contributing guide for more information.

## License

MJX is open-sourced under the MIT License.
