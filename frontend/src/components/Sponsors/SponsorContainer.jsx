function Container({ img, title, buttonText }) {
  return (
    <>
      <img src={img} />
      <h1 className="absolute bottom-40 left-10 text-white text-2xl font-cabinetMedium font-bold">
        {title}
      </h1>
      <button className="absolute bottom-24 left-10 text-white font-cabinet border-[1px] py-1 px-3 border-white">
        {buttonText}
      </button>
    </>
  );
}

export default Container;
