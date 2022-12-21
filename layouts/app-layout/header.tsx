import Link from "next/link";
import { GdButton } from "../../components/buttons";

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-600 px-4">
      <nav className="max-w-6xl mx-auto">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-xl font-bold text-gray-200">
                Gia đình Lập Trình
              </span>
            </Link>
          </div>
          <div className="ml-10 space-x-4">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/@giadinhlaptrinh"
            >
              <GdButton variant="secondary">Watch on Youtube</GdButton>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
