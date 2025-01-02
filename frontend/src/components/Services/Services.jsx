import IconsItem from "./ServicesItem";

function Icons() {
  return (
    <div className="w-full h-[500px] bg-gray-100">
      <ul className="w-full h-full flex justify-center items-center gap-56">
        <li className="flex flex-col items-center">
          <IconsItem
            icon="fa-solid fa-truck"
            title="FREE AND FAST DELIVERY"
            text="Free delivery for all orders over $140"
          />
        </li>
        <li className="flex flex-col items-center">
          <IconsItem
            icon="fa-solid fa-headphones-simple"
            title="24/7 CUSTOMER SERVICE"
            text="Friendly 24/7 customer service"
          />
        </li>
        <li className="flex flex-col items-center">
          <IconsItem
            icon="fa-solid fa-check"
            title="MONEY BACK GUARANTEE"
            text="We return money within 30 days"
          />
        </li>
      </ul>
    </div>
  );
}

export default Icons;
