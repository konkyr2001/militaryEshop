import Dialog from "./Dialog";
import { removeFromCart } from "../../../services/user";

function FavouritesDialog({ imageRef, setIsDialogOpen, cart }) {
  return (
    <Dialog
      imageRef={imageRef}
      setIsDialogOpen={setIsDialogOpen}
      productsList={cart}
      remove={removeFromCart}
      emptyText={"No products added to cart!"}
      modalType={"Cart"}
      icon={"fa-trash fa-solid text-gray-500 hover:text-orange-500 text-base"}
    />
  );
}

export default FavouritesDialog;
