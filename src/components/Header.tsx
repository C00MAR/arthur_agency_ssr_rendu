import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="fixed top-8 left-1/2 w-full z-[100]">
        <div className="flex justify-between items-center px-6 md:px-12">
          <Link className="font-normal" href="/">
            AA.
          </Link>
          <nav>
            <Link
              href="/contact"
              className="text-xs font-thin bg-[#111111] py-2 px-5 rounded-full text-white block border border-black transition-all hover:bg-transparent hover:border-white"
            >
              Contact us
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
