## External Dependencies

The project’s dependencies are declared in `edutech/package.json`.

### Runtime dependencies

| Dependency | How it is used |
|---|---|
| [Next.js](https://www.npmjs.com/package/next) `16.4.4` | The web framework. It provides the app’s routing, page structure, and server-side features. The project uses the App Router, navigation components, and `next/font` integration. |
| [React](https://www.npmjs.com/package/react) `19.3.0` | Builds the interface from reusable components and provides UI behavior such as component state. |
| [React DOM](https://www.npmjs.com/package/react-dom) `19.3.0` | Renders React components into the browser DOM and supports server rendering with Next.js. |

### Development dependencies

| Dependency | How it is used |
|---|---|
| [TypeScript](https://www.npmjs.com/package/typescript) `^5` | Adds static types to the project’s JavaScript and helps catch type errors during development and builds. |
| [ESLint](https://www.npmjs.com/package/eslint) `^9` | Checks source code for common errors and consistency issues. |
| [eslint-config-next](https://www.npmjs.com/package/eslint-config-next) `16.4.4` | Adds linting rules tailored to Next.js, including Core Web Vitals and TypeScript rules. |
| [@types/node](https://www.npmjs.com/package/@types/node) `^20` | TypeScript definitions for Node.js APIs. |
| [@types/react](https://www.npmjs.com/package/@types/react) `^19` | TypeScript definitions for React. |
| [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) `^19` | TypeScript definitions for React DOM. |

The app also loads the **Geist** and **Geist Mono** fonts using Next.js’s `next/font/google` integration in `edutech/app/layout.tsx`; these are fonts, not separate npm dependencies. **Bootstrap is not listed as a dependency**; the project uses its own CSS files.

## GitHub Repository

Repository URL: https://github.com/janani-prakash/EduTech
