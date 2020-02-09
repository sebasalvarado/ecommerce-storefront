import { Message } from '@components/atoms';
import { AddToWishlistButton } from '@components/molecules';
import { useAddWishlistProductVariant, useRemoveWishlistProductVariant, useUserDetails } from '@sdk/react';
import { WishlistContext } from '@sdk/react/components/WishlistProvider/context';
import React from 'react';

const AddToWishlist: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { wishlist, update } = React.useContext(WishlistContext);
  const { data: user } = useUserDetails();

  const [showAddMessage, setShowAddMessage] = React.useState(false);
  const [showRemoveMessage, setShowRemoveMessage] = React.useState(false);
  const [showNotLoggedMessage, setShowNotLoggedMessage] = React.useState(false);
  const [showSelectVariantMessage, setShowSelectVariantMessage ] = React.useState(false);
  const isAddedToWishlist = () => {
    return wishlist && wishlist.some(({ id }) => id === variantId);
  };

  const [addedToWishlist, setAddedToWishlist] = React.useState(
    isAddedToWishlist()
  );

  React.useEffect(() => {
    const added = isAddedToWishlist();

    if (added !== addedToWishlist) {
      setAddedToWishlist(added);
    }
  }, [wishlist]);

  const [
    addWishlistProduct,
    { loading: addLoading, error: addError },
  ] = useAddWishlistProductVariant({ variantId });
  const [
    removeWishlistProduct,
    { loading: errorLoading, error: removeError },
  ] = useRemoveWishlistProductVariant({ variantId });

  const addOrRemoveFromWishlist = () => {
    if (!user) {
      setShowNotLoggedMessage(true);
      return;
    }
    if (addedToWishlist) {
      removeWishlistProduct({ variantId });
      update();
      setShowAddMessage(false);
      setShowRemoveMessage(true);
    } else if (variantId){
      addWishlistProduct({ variantId });
      update();
      setShowRemoveMessage(false);          
      setShowAddMessage(true);
    } else {
      // User needs to select variant
      setShowSelectVariantMessage(true);
    }
  };

  const handleRemoveSelectVariantMessageClose = () => {
    setShowSelectVariantMessage(false);
  }
  const handleRemoveMessageClose = () => {
    setShowRemoveMessage(false);
  };
  const handleAddMessageClose = () => {
    setShowAddMessage(false);
  };
  const handleNotLoggedMessageClose = () => {
    setShowNotLoggedMessage(false);
  };

  const getSelectVariantMessage = () => 
    "Selecciona una talla y color para agregar el producto a tus Favoritos."
  const getRemoveMessage = () =>
    !addError
      ? "Producto eliminado de tus Favoritos."
      : "Lo sentimos, hemos tenido un error eliminando este producto de tus Favoritos.";
  const getAddMessage = () =>
    !removeError
      ? "Producto agregado a tus Favoritos"
      : "Lo sentimos, hemos tenido un error agregando este producto a tus Favoritos.";

  return (
    <>
      <AddToWishlistButton
        added={addedToWishlist}
        onClick={addOrRemoveFromWishlist}
      />
      {showAddMessage && !addLoading && (
        <Message
          title={getAddMessage()}
          status={addError ? "error" : "success"}
          onClick={handleAddMessageClose}
        ></Message>
      )}
      {showRemoveMessage && !errorLoading && (
        <Message
          title={getRemoveMessage()}
          status={removeError ? "error" : "success"}
          onClick={handleRemoveMessageClose}
        ></Message>
      )}
      {showNotLoggedMessage && (
        <Message
          title="Por favor inicia sesión para agregar este producto."
          status="error"
          onClick={handleNotLoggedMessageClose}
        ></Message>
      )}
      {showSelectVariantMessage && (
        <Message
        title={getSelectVariantMessage()}
        status="error"
        onClick={handleRemoveSelectVariantMessageClose}
      ></Message>
      )}
    </>
  );
};

export default AddToWishlist;
