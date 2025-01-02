function IconsItem({ icon, title, text }) {
  return (
    <>
      <span className="rounded-[50%] border-[8px] border-grayStroke">
        <i
          className={`${icon} text-xl text-white bg-black rounded-[50%] w-12 h-12 flex items-center justify-center `}
        ></i>
      </span>
      <h2 className="font-cabinetMedium text-xl font-bold mt-4">{title}</h2>
      <p className="font-cabinet text-[0.85rem]">{text}</p>
    </>
  );
}

export default IconsItem;
