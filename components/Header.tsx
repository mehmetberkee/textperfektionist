import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function Header() {
  return (
    <div>
      <header className="flex justify-between py-5">
        <Link href="/" className="flex items-center">
          <div className="flex space-x-1 px-2 items-center">
            <div>
              <PencilSquareIcon className="sm:w-10 sm:h-10 w-8 h-8 text-white my-auto" />
            </div>
            <h3 className="sm:text-3xl text-xl font-bold text-white tracking-tight">
              TextPerfektionist
            </h3>
          </div>
        </Link>
        <div className="px-2 my-auto">
          <button className=" bg-[#2563EB] text-white rounded-md sm:px-6 sm:py-2 px-4 py-2">
            Star on Github
          </button>
        </div>
      </header>
      <hr />
    </div>
  );
}

export default Header;
