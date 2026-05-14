# CineBrowse Lite 🎬

A modern, high-performance Movie Exploration Application built as a Single Page Application (SPA). The project demonstrates professional state management, optimized data fetching patterns, and a responsive component architecture.

🔗 **Live Demo:** [https://vercel.app](https://vercel.app)

## 🚀 Features

- **Infinite Scrolling:** Smooth, modern content loading using HTML5 Intersection Observer API instead of legacy pagination.
- **Smart Live Search:** Debounced search queries to minimize API overhead and prevent network flooding.
- **Dynamic Genre Filtering:** Powered by a customized, highly accessible Shadcn/ui Select component.
- **Advanced Dynamic Routing:** Parallel data fetching for movie details, movie credits, and user recommendations on a single page view.
- **Stale-While-Revalidate Caching:** Advanced query caching with instant back-navigation UX.
- **Skeleton Shimmer Loading:** Smooth UI placeholders during async data transactions for top-tier User Experience (UX).

## 🛠️ Tech Stack & Architecture

- **Core Framework:** React 18 (Vite boilerplate for optimized build times)
- **State Management & Data Fetching:** TanStack Query v5 (React Query)
- **Routing:** React Router DOM v6 (Declarative dynamic routes)
- **HTTP Client:** Axios (Centralized instance with automated headers and regional configurations)
- **Styling:** Tailwind CSS (Mobile-first utility classes, fluid grids, and custom animations)
- **UI Components:** Shadcn/ui (Built on top of Radix UI primitives)

## 🧠 React Hooks & Architectural Solutions Used

- `useInfiniteQuery`: Handled multi-page offset pagination state from the TMDB API.
- `useQuery`: Managed parallel, independent data streams for single movie profiles.
- `useDebounce`: Optimized input events by delaying state synchronization until the user finished typing.
- `useInView`: Monitored viewport intersection to programmatically trigger subsequent page evaluations.
- `useParams` & `useNavigate`: Derived runtime application states directly from the URL hierarchy, making application views fully shareable.
- **Component Isolation:** Decoupled business logic from presentational views by breaking layouts down into modular blocks (`MovieInfo`, `MovieCast`, `MovieRecommendations`).
