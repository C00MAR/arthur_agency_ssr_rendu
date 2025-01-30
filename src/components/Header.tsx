import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="fixed top-8 left-1/2 w-full z-[100]">
        <div className="flex justify-between items-center px-12">
          <p className="font-normal">AA.</p>
          <nav>
            <Link
              href="/contact"
              className="text-xs font-thin bg-[#111111] py-2 px-5 rounded-full text-white block"
            >
              <span className="block h-fit overflow-hidden">Contact us</span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
