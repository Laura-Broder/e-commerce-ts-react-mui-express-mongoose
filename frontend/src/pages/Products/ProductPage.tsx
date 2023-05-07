import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { ProductType } from "../../utils/types";

const useGetProductDetails = (productId: string | undefined) => {
  const [item, setItem] = useState<ProductType | undefined>(undefined);
  const { get } = useAxios();

  useEffect(() => {
    const getProductDetails = async () => {
      console.log(productId);

      try {
        const res = await get(`/products/${productId}`);
        if (res) {
          setItem(res.data.data);
        }
      } catch (error) {
        setItem(undefined);
      }
    };
    if (productId) getProductDetails();
  }, [get, productId]);
  return item;
};

type Props = {};

function ProductPage({}: Props) {
  let { productId } = useParams<{ productId: string }>();
  const item = useGetProductDetails(productId);

  return (
    <div>
      Product #{productId}
      <p>{item?.id}</p>
    </div>
  );
}

export default ProductPage;
