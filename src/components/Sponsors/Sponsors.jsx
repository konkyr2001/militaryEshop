import img1 from "../../assets/images/Rectangle 16.png";
import img2 from "../../assets/images/Rectangle 17.png";
import Container from "./SponsorContainer";

function Sponsors() {
  return (
    <div className="mt-40 border-t-2 border-gray-300 relative pt-40 flex justify-around">
      <div className="relative w-fit h-fit">
        <Container img={img1} title={"FAMOUS MUICHES"} buttonText={"SHOP NOW"} />
      </div>
      <div className="relative mt-40 w-fit h-fit">
        <Container img={img2} title={"SPECIAL COLLECTION"} buttonText={"SHOP NOW"} />
      </div>
    </div>
  );
}

export default Sponsors;
