import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import './App.css'
import {  Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/actor/:id" element={<ActorPage />} />
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </div>
  );
}

export default App;
