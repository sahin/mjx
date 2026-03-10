'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ── Per-doc example data ──────────────────────────────────────────────────────

const DOC_EXAMPLES = {
  'english-to-swift-ui-spec': {
    lang: 'Swift',
    color: '#f5a623',
    icon: '🍎',
    label: 'English → UI',
    description: 'Compile plain English UI descriptions into declarative, production-ready SwiftUI code for iOS, macOS, watchOS, and tvOS.',
    examples: [
      {
        label: 'Welcome Screen',
        english: 'Create a vertical stack with a large "Welcome!" title at the top and a blue "Get Started" button below it.',
        code: `import SwiftUI

struct WelcomeView: View {
    var body: some View {
        VStack(alignment: .center, spacing: 20) {
            Text("Welcome!")
                .font(.largeTitle)
                .fontWeight(.bold)

            Button(action: { /* getStartedTapped */ }) {
                Text("Get Started")
                    .foregroundColor(.white)
                    .padding(.horizontal, 24)
                    .padding(.vertical, 12)
            }
            .background(Color.blue)
            .cornerRadius(10)
        }
        .padding()
    }
}`,
      },
      {
        label: 'Profile Card',
        english: 'Create a user profile card with a circular avatar image on the left (60x60), and on the right a bold name "Jane Doe" and a gray subtitle "Building the future of UI".',
        code: `import SwiftUI

struct UserProfileCard: View {
    var body: some View {
        HStack(alignment: .center, spacing: 16) {
            Image("avatar")
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: 60, height: 60)
                .clipShape(Circle())

            VStack(alignment: .leading, spacing: 4) {
                Text("Jane Doe")
                    .font(.headline)
                    .fontWeight(.bold)

                Text("Building the future of UI")
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }
        }
        .padding()
        .background(Color(.secondarySystemBackground))
        .cornerRadius(12)
    }
}`,
      },
      {
        label: 'Login Form',
        english: 'Create a login form with a title "Sign In", a text field for email, a secure field for password, and a full-width blue "Login" button.',
        code: `import SwiftUI

struct LoginView: View {
    @State private var email: String = ""
    @State private var password: String = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Sign In")
                .font(.largeTitle)
                .fontWeight(.bold)
                .padding(.bottom, 8)

            TextField("Email", text: $email)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .keyboardType(.emailAddress)
                .autocapitalization(.none)

            SecureField("Password", text: $password)
                .textFieldStyle(RoundedBorderTextFieldStyle())

            Button(action: { /* loginTapped */ }) {
                Text("Login")
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
            }
            .background(Color.blue)
            .cornerRadius(10)
        }
        .padding(24)
    }
}`,
      },
      {
        label: 'Settings Form',
        english: 'Create a settings form with a "Notifications" section containing a toggle for "Push Notifications" and a toggle for "Email Alerts".',
        code: `import SwiftUI

struct SettingsView: View {
    @State private var pushNotifications: Bool = true
    @State private var emailAlerts: Bool = false

    var body: some View {
        Form {
            Section(header: Text("Notifications")) {
                Toggle("Push Notifications", isOn: $pushNotifications)
                Toggle("Email Alerts", isOn: $emailAlerts)
            }
        }
        .navigationTitle("Settings")
    }
}`,
      },
    ],
    sections: [
      {
        title: 'Three-Stage Pipeline',
        body: 'The engine operates as a three-stage compiler: (1) Intent Parsing via LLM to extract components and hierarchy, (2) IR Generation to produce a language-agnostic JSON blueprint, and (3) SwiftUI Code Generation that deterministically emits clean Swift from the IR.',
      },
      {
        title: 'Supported Layout Containers',
        table: {
          headers: ['English Term', 'SwiftUI View'],
          rows: [
            ['"vertical stack", "column"', 'VStack'],
            ['"horizontal stack", "row"', 'HStack'],
            ['"depth stack", "Z-stack"', 'ZStack'],
            ['"grid"', 'LazyVGrid / Grid'],
            ['"form"', 'Form'],
            ['"list"', 'List'],
            ['"scroll view"', 'ScrollView'],
            ['"tab view"', 'TabView'],
          ],
        },
      },
      {
        title: 'Data Binding',
        body: 'The engine recognizes phrases like "bound to the \'username\' state variable" and maps them to a binding key in the IR, which the code generator translates into a @State variable and a $ binding in the SwiftUI view.',
      },
      {
        title: 'Supported Modifiers',
        body: 'Font size/weight, foreground/background colors, corner radius, shadow, padding, frame dimensions, opacity, clip shapes (Circle, RoundedRectangle), and overlay/background gradients.',
      },
      {
        title: 'API Connections',
        body: 'The engine can generate @ObservableObject view models that call REST APIs using URLSession. Specify the endpoint in English and the generator produces the async/await networking code and binds the response to the view.',
      },
    ],
  },
  'english-to-chatbot-rust-spec': {
    lang: 'Rust/WASM',
    color: '#ef5350',
    icon: '🤖',
    label: 'English → Chatbot',
    description: 'Compile natural language conversational flows into a high-performance, sandboxed Rust/WebAssembly finite state machine.',
    examples: [
      {
        label: 'Welcome Bot',
        english: 'Start with "Hello! How can I help?". If the user says "billing", ask "What is your billing question?". If they say "support", ask "What is your support issue?".',
        code: `use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq)]
pub enum ChatState {
    Welcome,
    Billing,
    Support,
}

#[wasm_bindgen]
pub struct Chatbot {
    state: ChatState,
}

#[wasm_bindgen]
impl Chatbot {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self { state: ChatState::Welcome }
    }

    pub fn greet(&self) -> String {
        "Hello! How can I help?".to_string()
    }

    pub fn process(&mut self, input: &str) -> String {
        let lower = input.to_lowercase();
        match self.state {
            ChatState::Welcome => {
                if lower.contains("billing") {
                    self.state = ChatState::Billing;
                    "What is your billing question?".to_string()
                } else if lower.contains("support") {
                    self.state = ChatState::Support;
                    "What is your support issue?".to_string()
                } else {
                    "I didn't catch that. Say 'billing' or 'support'.".to_string()
                }
            }
            ChatState::Billing => "Connecting you to billing...".to_string(),
            ChatState::Support => "Connecting you to support...".to_string(),
        }
    }
}`,
      },
      {
        label: 'Lead Capture Bot',
        english: "Ask for the user's name, then their email, then their company. Finally confirm with \"Thanks {name}! We'll be in touch at {email}.\"",
        code: `use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq)]
pub enum LeadState {
    AskName,
    AskEmail,
    AskCompany,
    Confirm,
}

#[derive(Default)]
struct LeadContext {
    name: String,
    email: String,
    company: String,
}

#[wasm_bindgen]
pub struct LeadBot {
    state: LeadState,
    ctx: LeadContext,
}

#[wasm_bindgen]
impl LeadBot {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self { state: LeadState::AskName, ctx: LeadContext::default() }
    }

    pub fn greet(&self) -> String {
        "Hi! What's your name?".to_string()
    }

    pub fn process(&mut self, input: &str) -> String {
        match self.state {
            LeadState::AskName => {
                self.ctx.name = input.to_string();
                self.state = LeadState::AskEmail;
                "Great! What's your email?".to_string()
            }
            LeadState::AskEmail => {
                self.ctx.email = input.to_string();
                self.state = LeadState::AskCompany;
                "And your company?".to_string()
            }
            LeadState::AskCompany => {
                self.ctx.company = input.to_string();
                self.state = LeadState::Confirm;
                format!("Thanks {}! We'll be in touch at {}.",
                    self.ctx.name, self.ctx.email)
            }
            LeadState::Confirm => "We've captured your info!".to_string(),
        }
    }
}`,
      },
      {
        label: 'Order Status Bot',
        english: 'Ask for the order ID. Then call GET /api/orders/{id} and respond with "Your order status is {status}". If the API fails, say "Could not retrieve order."',
        code: `use wasm_bindgen::prelude::*;
use gloo_net::http::Request;

#[derive(Debug, Clone, PartialEq)]
pub enum OrderState {
    AskOrderId,
    FetchingStatus,
    Done,
}

#[wasm_bindgen]
pub struct OrderBot {
    state: OrderState,
}

#[wasm_bindgen]
impl OrderBot {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self { state: OrderState::AskOrderId }
    }

    pub fn greet(&self) -> String {
        "Please enter your order ID.".to_string()
    }

    pub async fn process(&mut self, order_id: &str) -> String {
        self.state = OrderState::FetchingStatus;
        let url = format!("/api/orders/{}", order_id);
        match Request::get(&url).send().await {
            Ok(resp) => {
                self.state = OrderState::Done;
                let body: serde_json::Value = resp.json().await
                    .unwrap_or_default();
                format!("Your order status is: {}",
                    body["status"].as_str().unwrap_or("unknown"))
            }
            Err(_) => {
                self.state = OrderState::AskOrderId;
                "Could not retrieve order.".to_string()
            }
        }
    }
}`,
      },
    ],
    sections: [
      {
        title: 'State Machine Architecture',
        body: 'The generated chatbot is a Rust enum representing conversation states, and a struct holding the current state. Transitions are implemented as pattern-matched arms on user input, ensuring exhaustive handling of all states at compile time.',
      },
      {
        title: 'WASM Compilation',
        body: 'The generated Rust crate targets wasm32-unknown-unknown and uses wasm-bindgen to expose the chatbot\'s public API to JavaScript. The final .wasm binary is typically under 100KB after optimization with wasm-opt.',
      },
      {
        title: 'Context / Memory',
        body: 'Multi-step conversations that capture user data (name, email, order ID) use a Context struct to store values across state transitions. The code generator creates this struct automatically based on the captured fields in the English description.',
      },
      {
        title: 'API Integration',
        body: 'Nodes can trigger async HTTP calls using gloo-net. The IR uses an apiCall property to specify the method, URL, and response mapping. The code generator produces an async Rust function that returns a Promise to JavaScript.',
      },
    ],
  },
  'english-to-api-go-spec': {
    lang: 'Go',
    color: '#26c6da',
    icon: '⚡',
    label: 'English → API',
    description: 'Compile natural language API descriptions into idiomatic, high-performance Go backend services with routing, models, and database integration.',
    examples: [
      {
        label: 'User CRUD API',
        english: 'Create a User API with name and email fields. Generate full CRUD endpoints at /users.',
        code: `// models/user.go
package models

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

// handlers/user.go
package handlers

import (
    "encoding/json"
    "net/http"
    "strconv"
    "github.com/gorilla/mux"
)

var users []models.User
var nextID = 1

func GetUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
    var u models.User
    json.NewDecoder(r.Body).Decode(&u)
    u.ID = nextID; nextID++
    users = append(users, u)
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(u)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
    id, _ := strconv.Atoi(mux.Vars(r)["id"])
    for _, u := range users {
        if u.ID == id {
            json.NewEncoder(w).Encode(u)
            return
        }
    }
    http.NotFound(w, r)
}

// main.go
package main

import (
    "log"
    "net/http"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/users", handlers.GetUsers).Methods("GET")
    r.HandleFunc("/users", handlers.CreateUser).Methods("POST")
    r.HandleFunc("/users/{id}", handlers.GetUser).Methods("GET")
    log.Fatal(http.ListenAndServe(":8080", r))
}`,
      },
      {
        label: 'Product API + PostgreSQL',
        english: 'Create a Product API with name (string) and price (float). Connect to PostgreSQL using GORM. Generate CRUD endpoints at /products.',
        code: `// models/product.go
package models

import "gorm.io/gorm"

type Product struct {
    gorm.Model
    Name  string  \`json:"name" gorm:"not null"\`
    Price float64 \`json:"price" gorm:"not null"\`
}

// database/db.go
package database

import (
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "os"
)

var DB *gorm.DB

func Connect() {
    dsn := os.Getenv("DATABASE_URL")
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil { panic("Failed to connect to database") }
    db.AutoMigrate(&models.Product{})
    DB = db
}

// handlers/product.go
package handlers

import (
    "encoding/json"
    "net/http"
)

func GetProducts(w http.ResponseWriter, r *http.Request) {
    var products []models.Product
    database.DB.Find(&products)
    json.NewEncoder(w).Encode(products)
}

func CreateProduct(w http.ResponseWriter, r *http.Request) {
    var p models.Product
    json.NewDecoder(r.Body).Decode(&p)
    database.DB.Create(&p)
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(p)
}`,
      },
      {
        label: 'Auth-Protected API',
        english: 'Create a Note API with title and content. GET /notes is public. POST /notes requires a Bearer token in the Authorization header.',
        code: `// middleware/auth.go
package middleware

import (
    "net/http"
    "strings"
    "os"
)

func BearerAuth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        auth := r.Header.Get("Authorization")
        token := strings.TrimPrefix(auth, "Bearer ")
        if token != os.Getenv("API_SECRET") {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}

// main.go
package main

import (
    "log"
    "net/http"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/notes", handlers.GetNotes).Methods("GET")
    r.Handle("/notes",
        middleware.BearerAuth(
            http.HandlerFunc(handlers.CreateNote),
        ),
    ).Methods("POST")
    log.Fatal(http.ListenAndServe(":8080", r))
}`,
      },
    ],
    sections: [
      {
        title: 'Generated File Structure',
        table: {
          headers: ['File', 'Purpose'],
          rows: [
            ['main.go', 'Server setup, router initialization, middleware'],
            ['models/user.go', 'Go struct with JSON tags for each model'],
            ['handlers/user.go', 'HTTP handler functions for each route'],
            ['database/db.go', 'Database connection and auto-migration'],
            ['middleware/auth.go', 'Bearer token authentication middleware'],
            ['go.mod', 'Module definition and dependency declarations'],
          ],
        },
      },
      {
        title: 'Supported Field Types',
        table: {
          headers: ['English Type', 'Go Type'],
          rows: [
            ['"string", "text"', 'string'],
            ['"number", "integer"', 'int'],
            ['"float", "decimal"', 'float64'],
            ['"boolean"', 'bool'],
            ['"date", "time"', 'time.Time'],
            ['"id", "uuid"', 'string'],
          ],
        },
      },
      {
        title: 'Database Support',
        body: 'The engine supports PostgreSQL, MySQL, and SQLite via GORM. When a database is specified, the generator creates a database/db.go file with connection logic and AutoMigrate calls, and updates all handler functions to use db.Find, db.Create, db.Save, and db.Delete.',
      },
    ],
  },
  'english-to-web-rust-spec': {
    lang: 'Rust/WASM',
    color: '#ab47bc',
    icon: '🦀',
    label: 'English → Web',
    description: 'Compile natural language web app descriptions into high-performance Rust/WASM single-page applications using the Yew component framework.',
    examples: [
      {
        label: 'Counter App',
        english: 'Create a counter app with a heading showing the count, an increment button, and a decrement button.',
        code: `use yew::prelude::*;

#[function_component(Counter)]
fn counter() -> Html {
    let count = use_state(|| 0i32);

    let on_increment = {
        let count = count.clone();
        Callback::from(move |_| count.set(*count + 1))
    };

    let on_decrement = {
        let count = count.clone();
        Callback::from(move |_| count.set(*count - 1))
    };

    html! {
        <div class="counter">
            <h1 class="count">{ *count }</h1>
            <div class="controls">
                <button onclick={on_decrement}>{ "−" }</button>
                <button onclick={on_increment}>{ "+" }</button>
            </div>
        </div>
    }
}

fn main() {
    yew::Renderer::<Counter>::new().render();
}`,
      },
      {
        label: 'To-Do List',
        english: 'Create a to-do list app with an input field and Add button. Show the list of items below. Each item should have a Delete button.',
        code: `use yew::prelude::*;

#[function_component(TodoApp)]
fn todo_app() -> Html {
    let todos: UseStateHandle<Vec<String>> = use_state(Vec::new);
    let input = use_state(String::new);

    let on_add = {
        let todos = todos.clone();
        let input = input.clone();
        Callback::from(move |_| {
            if !input.trim().is_empty() {
                let mut new_todos = (*todos).clone();
                new_todos.push((*input).clone());
                todos.set(new_todos);
                input.set(String::new());
            }
        })
    };

    let on_input = {
        let input = input.clone();
        Callback::from(move |e: InputEvent| {
            let el = e.target_unchecked_into::<web_sys::HtmlInputElement>();
            input.set(el.value());
        })
    };

    html! {
        <div class="todo-app">
            <h1>{ "To-Do List" }</h1>
            <div class="add-row">
                <input value={(*input).clone()} oninput={on_input}
                    placeholder="New task..." />
                <button onclick={on_add}>{ "Add" }</button>
            </div>
            <ul>
                { for todos.iter().enumerate().map(|(i, todo)| {
                    let todos = todos.clone();
                    html! {
                        <li key={i}>
                            { todo }
                            <button onclick={Callback::from(move |_| {
                                let mut t = (*todos).clone();
                                t.remove(i);
                                todos.set(t);
                            })}>{ "✕" }</button>
                        </li>
                    }
                })}
            </ul>
        </div>
    }
}`,
      },
      {
        label: 'Two-Page Router',
        english: 'Create a two-page app. Home page at / shows "Welcome Home". About page at /about shows "About Us". Add a nav bar with links to both pages.',
        code: `use yew::prelude::*;
use yew_router::prelude::*;

#[derive(Clone, Routable, PartialEq)]
enum Route {
    #[at("/")]
    Home,
    #[at("/about")]
    About,
}

#[function_component(Nav)]
fn nav() -> Html {
    html! {
        <nav>
            <Link<Route> to={Route::Home}>{ "Home" }</Link<Route>>
            <Link<Route> to={Route::About}>{ "About" }</Link<Route>>
        </nav>
    }
}

fn switch(routes: Route) -> Html {
    match routes {
        Route::Home  => html! { <h1>{ "Welcome Home" }</h1> },
        Route::About => html! { <h1>{ "About Us" }</h1> },
    }
}

#[function_component(App)]
fn app() -> Html {
    html! {
        <BrowserRouter>
            <Nav />
            <Switch<Route> render={switch} />
        </BrowserRouter>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}`,
      },
    ],
    sections: [
      {
        title: 'Yew Component Model',
        table: {
          headers: ['Concept', 'Yew Equivalent'],
          rows: [
            ['Component', '#[function_component(Name)]'],
            ['State', 'use_state(|| initial_value)'],
            ['Props', '#[derive(Properties, PartialEq)]'],
            ['Event Handler', 'Callback::from(move |e| { ... })'],
            ['Lifecycle', 'use_effect, use_effect_with'],
            ['Routing', 'yew-router BrowserRouter + Switch'],
          ],
        },
      },
      {
        title: 'Build Toolchain',
        body: 'The generated project uses Trunk as the build tool. Running trunk serve starts a local dev server with hot-reload. Running trunk build --release produces an optimized dist/ folder ready for static hosting on any CDN.',
      },
      {
        title: 'API Calls from WASM',
        body: 'The engine uses gloo-net for async HTTP requests from within the WASM module. Async actions are spawned with wasm_bindgen_futures::spawn_local, allowing non-blocking API calls that update component state on completion.',
      },
    ],
  },
  'english-to-swift-backend-spec': {
    lang: 'Swift/Vapor',
    color: '#4fc3f7',
    icon: '🚀',
    label: 'English → Backend',
    description: 'Compile natural language API descriptions into complete Swift/Vapor backend services with Fluent ORM database integration and async/await routing.',
    examples: [
      {
        label: 'Todo API',
        english: 'Create a Todo API with title and completed fields. Generate GET and POST endpoints at /todos.',
        code: `// Sources/App/Models/Todo.swift
import Vapor
import Fluent

final class Todo: Model, Content {
    static let schema = "todos"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "title")
    var title: String

    @Field(key: "completed")
    var completed: Bool

    init() {}
    init(id: UUID? = nil, title: String, completed: Bool = false) {
        self.id = id; self.title = title; self.completed = completed
    }
}

// Sources/App/Controllers/TodoController.swift
import Vapor

struct TodoController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let todos = routes.grouped("todos")
        todos.get(use: list)
        todos.post(use: create)
    }

    func list(req: Request) async throws -> [Todo] {
        try await Todo.query(on: req.db).all()
    }

    func create(req: Request) async throws -> Todo {
        let todo = try req.content.decode(Todo.self)
        try await todo.save(on: req.db)
        return todo
    }
}`,
      },
      {
        label: 'Blog API + Auth',
        english: 'Create a Blog Post API with title and content. GET /posts is public. POST /posts requires authentication.',
        code: `// Sources/App/Models/Post.swift
import Vapor
import Fluent

final class Post: Model, Content {
    static let schema = "posts"

    @ID(key: .id) var id: UUID?
    @Field(key: "title") var title: String
    @Field(key: "content") var content: String

    init() {}
    init(id: UUID? = nil, title: String, content: String) {
        self.id = id; self.title = title; self.content = content
    }
}

// Sources/App/Controllers/PostController.swift
import Vapor

struct PostController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let posts = routes.grouped("posts")
        posts.get(use: list)

        let protected = posts.grouped(
            UserToken.authenticator(),
            User.guardMiddleware()
        )
        protected.post(use: create)
    }

    func list(req: Request) async throws -> [Post] {
        try await Post.query(on: req.db).all()
    }

    func create(req: Request) async throws -> Post {
        _ = try req.auth.require(User.self)
        let post = try req.content.decode(Post.self)
        try await post.save(on: req.db)
        return post
    }
}`,
      },
      {
        label: 'Product API + Migration',
        english: 'Create a Product model with name and price. Store in PostgreSQL. Generate full CRUD and the database migration file.',
        code: `// Sources/App/Migrations/CreateProduct.swift
import Fluent

struct CreateProduct: AsyncMigration {
    func prepare(on database: Database) async throws {
        try await database.schema("products")
            .id()
            .field("name", .string, .required)
            .field("price", .double, .required)
            .create()
    }

    func revert(on database: Database) async throws {
        try await database.schema("products").delete()
    }
}

// Sources/App/Models/Product.swift
import Vapor
import Fluent

final class Product: Model, Content {
    static let schema = "products"

    @ID(key: .id) var id: UUID?
    @Field(key: "name") var name: String
    @Field(key: "price") var price: Double

    init() {}
    init(id: UUID? = nil, name: String, price: Double) {
        self.id = id; self.name = name; self.price = price
    }
}

// Sources/App/configure.swift
import Vapor
import Fluent
import FluentPostgresDriver

public func configure(_ app: Application) throws {
    app.databases.use(
        .postgres(url: Environment.get("DATABASE_URL")!),
        as: .psql
    )
    app.migrations.add(CreateProduct())
    try app.register(collection: ProductController())
}`,
      },
    ],
    sections: [
      {
        title: 'Generated Project Structure',
        table: {
          headers: ['File / Directory', 'Purpose'],
          rows: [
            ['Sources/App/Models/', 'Fluent model classes with @ID, @Field wrappers'],
            ['Sources/App/Migrations/', 'AsyncMigration structs for schema creation'],
            ['Sources/App/Controllers/', 'RouteCollection structs with handler methods'],
            ['Sources/App/configure.swift', 'Database, migrations, and route registration'],
            ['Sources/App/routes.swift', 'Top-level route definitions'],
            ['Package.swift', 'Swift Package Manager manifest'],
          ],
        },
      },
      {
        title: 'Fluent ORM Integration',
        body: 'Every generated model is a Fluent Model and Content. The engine generates the corresponding AsyncMigration struct automatically, including prepare(on:) to create the schema and revert(on:) to roll it back. Supported databases include PostgreSQL, MySQL, and SQLite.',
      },
      {
        title: 'Authentication',
        body: 'The engine recognizes phrases like "requires authentication" or "protected" and applies Vapor\'s UserToken.authenticator() middleware to those routes. Public routes are grouped separately and require no token.',
      },
    ],
  },
};

// ── Styles ────────────────────────────────────────────────────────────────────

const S = {
  page: { minHeight: '100vh', background: '#0e0e0e', color: '#f0f0f0', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
  nav: { position: 'sticky', top: 0, zIndex: 100, background: 'rgba(14,14,14,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 1.75rem', height: '50px', display: 'flex', alignItems: 'center', gap: '1.5rem' },
  logo: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '0.95rem', color: '#f5a623', textDecoration: 'none', letterSpacing: '0.1em' },
  navLink: { color: '#555', fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace", textDecoration: 'none' },
  split: { display: 'grid', gridTemplateColumns: '1fr 1fr', height: 'calc(100vh - 50px)', overflow: 'hidden' },
  left: { borderRight: '1px solid rgba(255,255,255,0.06)', overflowY: 'auto', padding: '2rem 2.25rem' },
  right: { background: '#080808', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  switcher: { padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', background: 'rgba(255,255,255,0.015)', flexShrink: 0 },
  switchLabel: { fontSize: '9px', fontWeight: 700, color: '#3a3a3a', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace", alignSelf: 'center', marginRight: '0.25rem' },
  switchBtn: (active, color) => ({ padding: '0.3rem 0.75rem', borderRadius: '5px', border: `1px solid ${active ? color : 'rgba(255,255,255,0.08)'}`, background: active ? `${color}18` : 'transparent', color: active ? color : '#666', fontSize: '0.75rem', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", cursor: 'pointer', transition: 'all 0.1s' }),
  englishBox: { padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 },
  englishLabel: { fontSize: '9px', fontWeight: 700, color: '#3a3a3a', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.6rem' },
  englishText: { background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '7px', padding: '0.9rem 1rem', fontSize: '0.88rem', lineHeight: 1.7, color: '#ccc', fontStyle: 'italic' },
  codeHeader: { padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 },
  codeLang: (color) => ({ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '3px', background: `${color}20`, color, letterSpacing: '0.05em' }),
  codeScroll: { flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' },
  pre: { fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', lineHeight: 1.8, color: '#c0c0c0', whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 },
  docTitle: { fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.4rem', lineHeight: 1.2 },
  docDesc: { fontSize: '0.88rem', color: '#777', lineHeight: 1.7, marginBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.25rem' },
  sectionWrap: { marginBottom: '1.75rem' },
  sectionTitle: { fontSize: '0.85rem', fontWeight: 700, color: '#e0e0e0', marginBottom: '0.6rem' },
  sectionBody: { fontSize: '0.83rem', color: '#999', lineHeight: 1.8 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', marginTop: '0.5rem' },
  th: { textAlign: 'left', padding: '0.4rem 0.65rem', background: 'rgba(255,255,255,0.03)', color: '#555', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.07)', fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase' },
  td: { padding: '0.4rem 0.65rem', borderBottom: '1px solid rgba(255,255,255,0.035)', color: '#aaa', verticalAlign: 'top' },
  mono: (color) => ({ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: color || '#e0c080' }),
  copyBtn: { fontSize: '10px', padding: '2px 7px', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#555', cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
};

// ── Section renderer ──────────────────────────────────────────────────────────

function Section({ sec, color }) {
  return (
    <div style={S.sectionWrap}>
      <div style={S.sectionTitle}>{sec.title}</div>
      {sec.body && <p style={S.sectionBody}>{sec.body}</p>}
      {sec.table && (
        <table style={S.table}>
          <thead>
            <tr>{sec.table.headers.map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {sec.table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={j === 0 ? { ...S.td, ...S.mono(color) } : j === 1 ? { ...S.td, ...S.mono('#e0c080') } : S.td}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function DocPage({ params }) {
  const { slug } = params;
  const doc = DOC_EXAMPLES[slug];
  const [activeEx, setActiveEx] = useState(0);
  const [copied, setCopied] = useState(false);

  const color = doc?.color || '#f5a623';
  const examples = doc?.examples || [];
  const ex = examples[activeEx];

  function copy() {
    if (ex) {
      navigator.clipboard?.writeText(ex.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  if (!doc) {
    return (
      <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
          <h2 style={{ color: '#f5a623' }}>Document not found</h2>
          <Link href="/docs" style={{ color: '#666', fontSize: '0.9rem' }}>← Back to Docs</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      {/* Nav */}
      <nav style={S.nav}>
        <Link href="/" style={S.logo}>MJX</Link>
        <Link href="/docs" style={S.navLink}>/docs</Link>
        <span style={{ color: '#2a2a2a', fontSize: '0.85rem' }}>/</span>
        <span style={{ color, fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
          {doc.icon} {doc.label}
        </span>
        <div style={{ flex: 1 }} />
        <Link href="/playground" style={{ ...S.navLink, color: '#555' }}>Playground</Link>
        <Link href="/app" style={{ ...S.navLink, color, fontWeight: 700 }}>WASM App ↗</Link>
      </nav>

      {/* Split layout */}
      <div style={S.split}>
        {/* ── Left: Docs ── */}
        <div style={S.left}>
          <h1 style={{ ...S.docTitle, color }}>{doc.icon} {doc.label}</h1>
          <p style={S.docDesc}>{doc.description}</p>
          {(doc.sections || []).map((sec, i) => (
            <Section key={i} sec={sec} color={color} />
          ))}
        </div>

        {/* ── Right: Code ── */}
        <div style={S.right}>
          {/* Example switcher */}
          <div style={S.switcher}>
            <span style={S.switchLabel}>Examples</span>
            {examples.map((e, i) => (
              <button key={i} style={S.switchBtn(i === activeEx, color)} onClick={() => setActiveEx(i)}>
                {e.label}
              </button>
            ))}
          </div>

          {ex && (
            <>
              {/* English input */}
              <div style={S.englishBox}>
                <div style={S.englishLabel}>English Input</div>
                <div style={S.englishText}>"{ex.english}"</div>
              </div>

              {/* Code header */}
              <div style={S.codeHeader}>
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#3a3a3a', fontFamily: "'JetBrains Mono', monospace" }}>Generated Output</span>
                <span style={S.codeLang(color)}>{doc.lang}</span>
                <div style={{ flex: 1 }} />
                <button style={S.copyBtn} onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>
              </div>

              {/* Code */}
              <div style={S.codeScroll}>
                <pre style={S.pre}>{ex.code}</pre>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
