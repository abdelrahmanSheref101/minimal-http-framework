# Minimalist Node.js HTTP Framework

A lightweight, educational HTTP server and router built from scratch in Node.js.  
Implements a middleware pipeline, parameterized routing (TODO), error handling, and body parsing—no Express or third‑party frameworks required.

## Project Status

> **In development** — core features are implemented and the server is fully functional.  
> Upcoming improvements:
>
> - Parameterized routes (path params)
> - Query parsing & URL param extraction
> - CORS & security headers middleware
> - Configurable logging and metrics

## Overview

This project showcases:

- A `Server` class that manages a stack of async middlewares
- A `Router` class for registering and resolving handlers by HTTP method & path
- Built‑in body parser for JSON and URL‑encoded payloads
- Customizable error handler
- Factory functions for validation and dispatch

it demonstrats how high‑level frameworks (Express/Koa) work under the hood.

## Installation

```bash
# Clone the repo
git clone https://github.com/your‑username/minimal-http-framework.git
cd minimal-http-framework

# Install dependencies
npm install
```
