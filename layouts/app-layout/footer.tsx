const Footer: React.FC = () => {
  return (
    <footer className="px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex flex-col lg:flex-row-reverse">
          <p className="text-lg">
            Made with ❤️ © 2022{" "}
            <a
              className="text-indigo-800 font-semibold"
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/@giadinhlaptrinh"
            >
              @GiaDinhLapTrinh
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
