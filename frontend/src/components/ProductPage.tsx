import { useParams } from "react-router-dom";

type Props = {};

function ProductPage({}: Props) {
  let { productId } = useParams();
  return <div>Product #{productId}</div>;
}

export default ProductPage;
