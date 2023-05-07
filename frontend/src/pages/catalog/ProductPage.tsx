import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { ProductType } from "../../utils/types";

const useGetProductDetails = (id: string | undefined) => {
  const [item, setItem] = useState<ProductType | undefined>(undefined);
  const { get } = useAxios();

  useEffect(() => {
    const getProductDetails = async () => {
      console.log(id);

      try {
        const res = await get(`/products/${id}`);
        if (res) {
          setItem(res.data.data);
        }
      } catch (error) {
        setItem(undefined);
      }
    };
    if (id) getProductDetails();
  }, [get, id]);
  return item;
};

type Props = {};

function ProductPage({}: Props) {
  const { id } = useParams<{ id: string }>();
  const item = useGetProductDetails(id);
  useEffect(() => {
    console.log("file: ProductPage.tsx:36 ~ useEffect ~ I render");
  });
  return (
    <div>
      Product #{id}
      <p>{item?.id}</p>
    </div>
  );
}

export default ProductPage;
