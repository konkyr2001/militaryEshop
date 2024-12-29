function Footer() {
  return (
    <div className="w-full h-[500px] bg-blacky px-20 py-20 relative flex justify-center">
      <div className="w-full h-full bg-red-50s0 border-b-2 border-grayLine relative">
        <ul className="text-white absolute left-0 h-full flex flex-col gap-8 justify-center">
          <li>
            <h1 className="font-cabinetMedium font-bold text-3xl">Logo</h1>
          </li>
          <li>
            <h5 className="font-cabinetMedium">Address:</h5>
            <p className="font-cabinet">USA, California</p>
          </li>
          <li>
            <h5 className="font-cabinetMedium">Contact:</h5>
            <p className="underline">1800 123 4567</p>
            <p className="underline">javaria.y2b@gmail.com</p>
          </li>
          <li className="flex gap-4">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-x-twitter"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-youtube"></i>
          </li>
        </ul>
        <ul className="text-white absolute right-0 h-full flex flex-row gap-16 text-sm">
          <li className="flex flex-col gap-5">
            <span>Link One</span>
            <span>Link Two</span>
            <span>Link Three</span>
            <span>Link Four</span>
            <span>Link Five</span>
          </li>
          <li className="flex flex-col gap-5">
            <span>Link One</span>
            <span>Link Two</span>
            <span>Link Three</span>
            <span>Link Four</span>
            <span>Link Five</span>
          </li>
          <li className="flex flex-col gap-5">
            <span>Link Six</span>
            <span>Link Seven</span>
            <span>Link Eight</span>
            <span>Link Nine</span>
            <span>Link Ten</span>
          </li>
        </ul>
      </div>
      <p className="absolute text-white font-cabinet bottom-6 text-xs">
        © 2023 Javaria. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
