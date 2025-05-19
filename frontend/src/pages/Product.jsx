import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Item from "../components/Shared/Item";

function Product() {
  const item = JSON.parse(localStorage.getItem("info"));

  return (
    <div className="w-3/5 m-auto mt-40">
      <div className="flex">
        <Item
          id={item.id}
          icon={item.icon}
          title={item.title}
          oldPrice={item.oldPrice}
          currentPrice={item.currentPrice}
          discount={item.discount}
          ratingValue={item.ratingValue}
          ratingAmount={item.ratingAmount}
          containerClass={
            "bg-gray-200 h-[270px] w-[250px] ml-16 flex justify-center items-center relative"
          }
          listClass={"flex flex-col gap-2 pt-3 ml-auto text-xl mr-10"}
          titleClass={"text-[40px] font-normal mb-10"}
          singlePost={true}
        />
      </div>
      <div className="flex-1 text-gray-800 space-y-6 mt-16">
        <h2 className="text-4xl font-semibold border-b pb-2">Product Description</h2>
        <p className="leading-relaxed text-lg tracking-wide text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </div>
  );
}

export default Product;
