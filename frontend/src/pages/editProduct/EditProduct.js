import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../components/card/Card";
import axios from "axios";

import "./editProduct.scss";

const EditProductForm = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [isPriceValid, setIsPriceValid] = useState(false);
  const [isQuantityValid, setIsQuantityValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false); // Define isDescriptionValid state variable
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProduct(data);
        setDescription(data.description);
        setImagePreview(data.image);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (!/^\d+$/.test(value)) {
      setPriceError("Please enter a valid number for the price.");
      setIsPriceValid(false);
    } else {
      setPriceError("");
      setIsPriceValid(true);
    }
    handleInputChange(e);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (!/^\d+$/.test(value)) {
      setQuantityError("Please enter a valid number for the quantity.");
      setIsQuantityValid(false);
    } else {
      setQuantityError("");
      setIsQuantityValid(true);
    }
    handleInputChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    // Validation checks...
    // Assuming isDescriptionValid should be set based on the description length
    setIsDescriptionValid(description.trim().length > 0);

    // Define updatedProductData with the updated product data
    const updatedProductData = {
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      description: description,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        updatedProductData
      );

      if (response.status === 200) {
        console.log("Product updated successfully:", response.data);
        alert("Product updated successfully!");
        // Redirect user to dashboard after successful update
        // Replace the below line with your actual redirection logic
        window.location.href = "/dashboard";
      } else {
        throw new Error(
          "Failed to update product. Status code: " + response.status
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="edit-product">
      <Card cardClass={"card"}>
        <form onSubmit={handleSubmit} className="form">
          <Card cardClass={"group"}>
            <label style={{fontWeight:"bold"}}>Product Image</label>
            {imagePreview ? (
              <div className="image-preview">
                <img src={imagePreview.filePath} alt="product" />
              </div>
            ) : (
              <p>Loading image...</p>
            )}
          </Card>

          <label style={{fontWeight:"bold"}}>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
            disabled // Disable editing for product name
            required
          />

          <label style={{fontWeight:"bold"}}>Product Category:</label>
          <input
            type="text"
            placeholder="Product category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
            disabled // Disable editing for product category
            required
          />

          <label style={{fontWeight:"bold"}}>Product Price:</label>
          <input
            type="Number"
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handlePriceChange}
            required
          />
          {isFormSubmitted && !isPriceValid && (
            <span className="error-message">{priceError}</span>
          )}

          <label style={{fontWeight:"bold"}}>Product Quantity:</label>
          <input
            type="Number"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleQuantityChange}
            required
          />
          {isFormSubmitted && !isQuantityValid && (
            <span className="error-message">{quantityError}</span>
          )}

          <label style={{fontWeight:"bold"}}>Product Description:</label>
          <div>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={handleDescriptionChange}
              style={{
                backgroundColor: "white",
                borderColor:
                  isFormSubmitted && !isDescriptionValid ? "red" : "",
              }}
              required
            />
          </div>
          {isFormSubmitted && !isDescriptionValid && (
            <span className="error-message" style={{fontWeight:"bold"}}>Description is required.</span>
          )}

          <div className="--my">
            <button type="submit" className="--btn --btn-success">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

EditProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
EditProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default EditProductForm;
