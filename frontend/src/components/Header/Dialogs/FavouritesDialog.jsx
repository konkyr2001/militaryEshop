import Dialog from "./Dialog";
import { removeFromFavourites } from "../../../services/user";

function FavouritesDialog({ imageRef, setIsDialogOpen, favourites }) {
  return (
    <Dialog
      imageRef={imageRef}
      setIsDialogOpen={setIsDialogOpen}
      productsList={favourites}
      remove={removeFromFavourites}
      emptyText={"No favourite products yet!"}
      modalType={"Favourites"}
      icon={"fa-heart fa-solid text-red-500 text-base"}
    />
  );
}

export default FavouritesDialog;
