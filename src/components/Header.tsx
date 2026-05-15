import { Link } from "react-router-dom";
import { Film } from "lucide-react";

export const Header = () => (
  <header className="border-b border-gray-800 bg-gray-950/50 backdrop-blur sticky top-0 z-50 mb-5">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <Film className="w-6 h-6 text-red-600" />
        <span className="font-black text-xl tracking-wider uppercase">
          CineBrowse
        </span>
      </Link>

      <nav className="flex gap-6 text-sm font-medium text-gray-400">
        <Link to="/" className="hover:text-white transition-colors">
          Главная
        </Link>
        {/* Сюда позже мы добавим кнопку "Войти" для авторизации */}
        <span className="cursor-pointer hover:text-white transition-colors">
          О проекте
        </span>
      </nav>
    </div>
  </header>
);
