export const Footer = () => (
  <footer className="border-t border-gray-800 bg-gray-950 mt-20 text-gray-500 text-sm">
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p>© {new Date().getFullYear()} CineBrowse Lite. Все права защищены.</p>
      <p className="text-xs text-gray-600">
        Powered by TMDB API & TanStack Query
      </p>
    </div>
  </footer>
);
