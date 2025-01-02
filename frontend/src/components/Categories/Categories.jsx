import img1 from "../../assets/images/Rectangle 18.png";
import img2 from "../../assets/images/Rectangle 19.png";
import img3 from "../../assets/images/Rectangle 20.png";
import img4 from "../../assets/images/Rectangle 22.png";
import img5 from "../../assets/images/Rectangle 21.png";
import CategoryContainer from "./CategoryContainer";

function Categories() {
  return (
    <div className="mt-40 w-full">
      <ul className="flex flex-col w-full gap-2">
        <li className="w-full relative">
          <CategoryContainer img={img1} buttonText={"Kids"} />
        </li>
        <li className="flex w-full gap-2 max-h-[600px]">
          <CategoryContainer img={img2} buttonText={"WOMEN"} divClass={"flex-1"} />
          <CategoryContainer img={img3} buttonText={"SNEAKERS"} />
        </li>
        <li className="flex w-full gap-2 max-h-[600px]">
          <CategoryContainer img={img4} buttonText={"BOOTS"} lightMode={true} />
          <CategoryContainer img={img5} buttonText={"MEN"} divClass={"flex-1"} lightMode={true} />
        </li>
      </ul>
    </div>
  );
}

export default Categories;
