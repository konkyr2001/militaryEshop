function CategoryContainer({ img, buttonText, divClass, lightMode }) {
  let color = "text-white bg-black";
  if (lightMode) {
    color = "text-black bg-white";
  }
  return (
    <div className={`relative ${divClass}`}>
      <img className="flex-1 object-cover w-full h-full" src={img} />
      <button
        className={`${color} py-3 px-6 font-cabinet tracking-wideaf font-bold text-md absolute bottom-16 left-1/2 -translate-x-1/2`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default CategoryContainer;
