import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { getAllproduct } from "../../Api/product";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { getAllCategory } from "../../Api/category";

function Category() {
  let [searchParams] = useSearchParams();
  const [category, setCategory] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  let categoryName = searchParams.get("categoryName");

  useEffect(() => {
    getAllproduct(categoryName)
      .then((response) => {
        const categoryDetails = response.data.result.filter(
          (product) => product.categoryName === categoryName
        );
        setCategory(categoryDetails);
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, [categoryName]);

  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = () => {
    getAllCategory()
      .then((res) => {
        setCategorys(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCategoryClick = (data) => {
    setSelectedCategory(data);
    applyFilters(data);
    navigate(`/Category?categoryName=${data.categoryName}`);
  };

  const applyFilters = (categoryId) => {
    let filteredProducts = products;

    if (categoryId) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.categoryId === categoryId;
      });
    }

    setProducts(filteredProducts);
  };
  return (
    <>
      <Header />
      <div className="d-flex flex-wrap justify-content-center category_head category-img-head ">
        {categorys.map((data, index) => (
          <div
            key={categorys[index]._id}
            className={`text-center ${
              selectedCategory === data ? "selected-category" : ""
            }`}
            onClick={() => handleCategoryClick(data)}
          >
            <div className="rounded-circle p-3 border custom-bg-colour category_small mt-3">
              <img
                src={data?.categoryImage}
                width="80"
                height="80"
                className="rounded-circle shadow"
                alt="Power"
              />
            </div>
            <p className="cat_name">{data?.categoryName}</p>
          </div>
        ))}
      </div>
      <div className=" container bg-white mb-5">
        <div className="row">
          {category.map((product, index) => (
            <div className="col-6 col-md-4 col-lg-3 mb-3" key={product._id}>
              <Link
                to={`/ProductDetails?productId=${product._id}`}
                className="text-decoration-none"
              >
                <div className="card h-100 product_card">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <div className="img_size_fix position-relative">
                      <span className="TCbg badge position-absolute p-2">
                        Save {product.discountPercentage}%
                      </span>
                      <div className="product-container">
                        <div className="image-container">
                          <img
                            src={product.productGif}
                            alt="HS_P_1"
                            className="img-fluid product-gif"
                          />
                          <img
                            src={product.productImage}
                            alt="HS_P_1"
                            className="img-fluid product-img"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="fs-6 fw-bold mt-3 text-black">
                      {product.productName}
                    </div>
                    <div>
                      <span className="bi bi-currency-rupee text-black">
                        {product.discountedPrice}
                      </span>
                      <del className="bi bi-currency-rupee text-muted text-white">
                        {product.finalPrice}
                      </del>
                    </div>
                    <div>
                      {[0, 1, 2, 3, 4].map((starIndex) => (
                        <span
                          key={starIndex}
                          value={starIndex}
                          className={` star ${
                            starIndex < product.rating ? "filled" : ""
                          }`}
                        >
                          {starIndex < product.rating ? (
                            <BsStarFill />
                          ) : (
                            <BsStar />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Category;
