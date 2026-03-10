import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TARGET_CONFIGS = {
  swiftui: {
    language: 'Swift / SwiftUI',
    framework: 'SwiftUI (Apple)',
    irType: 'UI component tree',
    codeInstructions: `Generate idiomatic SwiftUI code. Use View structs, VStack/HStack/ZStack for layout, Text, Button, Image, TextField, and other standard SwiftUI views. Apply modifiers like .font(), .foregroundColor(), .padding(), .background(), .cornerRadius(). Include @State for any interactive elements. The output should be a complete, compilable .swift file.`,
    irInstructions: `Generate a JSON IR with a "component" key (SwiftUI view name), "properties" object (modifiers and attributes), and "children" array (nested views).`,
    example: `struct ContentView: View { var body: some View { VStack { Text("Hello") } } }`,
  },
  chatbot: {
    language: 'Rust / WebAssembly',
    framework: 'wasm-bindgen',
    irType: 'state machine graph',
    codeInstructions: `Generate Rust code for a chatbot state machine using wasm-bindgen. Define an enum for states, a struct for the chatbot with wasm_bindgen attribute, and implement process_input and get_message methods. Include use wasm_bindgen::prelude::*; at the top. The output should be a complete, compilable Rust file.`,
    irInstructions: `Generate a JSON IR with "startNode" (string), and "nodes" (object where each key is a node ID with "message", "type" (LISTEN or END), and "edges" array with "intent" and "target" fields).`,
    example: `#[wasm_bindgen] pub struct Chatbot { state: State } #[wasm_bindgen] impl Chatbot { pub fn process_input(&mut self, input: &str) -> String { ... } }`,
  },
  api: {
    language: 'Go',
    framework: 'net/http + gorilla/mux',
    irType: 'REST API definition',
    codeInstructions: `Generate idiomatic Go code for a REST API. Include package main, necessary imports (encoding/json, net/http, github.com/gorilla/mux), struct definitions with json tags, handler functions, and a main() function that sets up the router and starts the server on :8080. The output should be a complete, runnable main.go file.`,
    irInstructions: `Generate a JSON IR with "serviceName" (string), "models" (array of objects with "name" and "fields" array with "name", "type", "json_tag"), and "endpoints" (array with "path", "method", "handler", optional "requestType" and "responseType").`,
    example: `package main\nimport (\n  "encoding/json"\n  "net/http"\n  "github.com/gorilla/mux"\n)\ntype User struct { ID int \`json:"id"\` }\nfunc main() { r := mux.NewRouter(); http.ListenAndServe(":8080", r) }`,
  },
  web: {
    language: 'Rust / WebAssembly',
    framework: 'Yew (Rust WASM framework)',
    irType: 'component tree with state and actions',
    codeInstructions: `Generate Rust code for a Yew web application. Include use yew::prelude::*; and define an App component using the Component trait or functional components. Define state, messages, and the view function using the html! macro. The output should be a complete, compilable Rust file for a Yew application.`,
    irInstructions: `Generate a JSON IR with "appName" (string), "state" (array of objects with "name", "type", "initialValue"), "rootComponent" (component tree object), and "actions" (array with "name" and "logic").`,
    example: `use yew::prelude::*;\n#[function_component(App)]\nfn app() -> Html {\n  let count = use_state(|| 0);\n  html! { <div><h1>{ *count }</h1></div> }\n}`,
  },
  backend: {
    language: 'Swift / Vapor',
    framework: 'Vapor 4 + Fluent ORM',
    irType: 'backend service definition',
    codeInstructions: `Generate Swift code for a Vapor 4 backend. Include import Vapor, import Fluent. Define Model classes with @ID, @Field property wrappers. Create Migration structs. Define a RouteCollection with boot(routes:) method. Include controller functions that use async/await and Fluent queries. The output should be multiple Swift files combined, clearly separated by // MARK: - filename comments.`,
    irInstructions: `Generate a JSON IR with "appName" (string), "models" (array with "name" and "fields" array with "name", "type", optional "required" and "default"), and "routes" (array with "path", "method", "action", optional "auth" boolean).`,
    example: `import Vapor\nimport Fluent\nfinal class Post: Model, Content {\n  static let schema = "posts"\n  @ID(key: .id) var id: UUID?\n  @Field(key: "title") var title: String\n}`,
  },
};

export async function POST(request) {
  try {
    const { target, input } = await request.json();

    if (!target || !input) {
      return NextResponse.json({ error: 'Missing target or input' }, { status: 400 });
    }

    const config = TARGET_CONFIGS[target];
    if (!config) {
      return NextResponse.json({ error: `Unknown target: ${target}` }, { status: 400 });
    }

    // Step 1: Generate the Intermediate Representation (IR)
    const irResponse = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert compiler that converts English descriptions into a structured JSON Intermediate Representation (IR) for ${config.language} code generation.

${config.irInstructions}

Return ONLY valid JSON. No markdown, no explanation, no code blocks. Just the raw JSON object.`,
        },
        {
          role: 'user',
          content: input,
        },
      ],
      temperature: 0.1,
      max_tokens: 1500,
    });

    const irText = irResponse.choices[0].message.content.trim();
    let irJson;
    try {
      irJson = JSON.parse(irText);
    } catch {
      irJson = { raw: irText };
    }

    // Step 2: Generate the final code from the IR
    const codeResponse = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert ${config.language} developer using the ${config.framework} framework.

${config.codeInstructions}

The user will provide a JSON Intermediate Representation (IR) of what they want to build. Generate the complete, production-quality ${config.language} code from this IR.

Return ONLY the raw code. No markdown code blocks, no explanation, no \`\`\` delimiters. Just the clean source code.

Example of the style expected:
${config.example}`,
        },
        {
          role: 'user',
          content: `Generate ${config.language} code from this IR:\n\n${JSON.stringify(irJson, null, 2)}`,
        },
      ],
      temperature: 0.1,
      max_tokens: 2000,
    });

    const code = codeResponse.choices[0].message.content.trim();

    return NextResponse.json({
      code,
      ir: JSON.stringify(irJson, null, 2),
      target,
      language: config.language,
    });

  } catch (error) {
    console.error('Compilation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal compilation error' },
      { status: 500 }
    );
  }
}
