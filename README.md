# Visual Wall

Visual Wall is a responsive visual discovery platform that allows users to search, explore, download, and bookmark photos, videos, and GIFs from multiple online media platforms.

### Tech Stack
- **Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
- **State Management:** Redux Toolkit, React Redux
- **API Integration:** Axios, Fetch API, REST APIs
- **React Concepts:** Functional Components, React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`), React Router

### API Integrations
- **Unsplash API** – Photo search and discovery.
- **Wallhaven API** – Wallpaper search and discovery.
- **Pexels API** – Video search and discovery.
- **Giphy API** – GIF search and discovery.

### Key Features
- Search and explore photos, videos, and GIFs from multiple APIs.
- Centralized application state management using Redux Toolkit.
- Redux slices and actions for managing search queries, active tabs, media results, bookmarks, loading states, and pagination.
- Infinite scrolling with `IntersectionObserver`.
- Alternating photo batches from Unsplash and Wallhaven.
- Paginated video and GIF fetching.
- Balanced responsive masonry grid layout.
- Bookmark and collection management using Redux and local storage.
- Media downloading with quality fallbacks.
- Skeleton loaders, lazy loading, reserved media dimensions, and smooth fade-in effects.
- Responsive user interface with modern animations and interactive components.

### Highlights
The main focus of this project is implementing **centralized state management with Redux Toolkit** and integrating multiple REST APIs into a unified React application. Redux helps maintain consistent application state across components, while asynchronous API requests, pagination, and infinite scrolling provide a seamless media discovery experience.
