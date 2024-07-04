import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

 import "./ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [isPriceValid, setIsPriceValid] = useState(false);
  const [isQuantityValid, setIsQuantityValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (!/^\d+$/.test(value)) {
      setPriceError("Please enter a valid number for the price.");
      setIsPriceValid(false);
    } else {
      setPriceError("");
      setIsPriceValid(true);
      handleInputChange(e);
    }
  };

  const handleDescriptionChange = (value) => {
    if (value.trim().length > 0) {
      setIsDescriptionValid(true);
      setDescription(value);
    } else {
      setIsDescriptionValid(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (!/^\d+$/.test(value)) {
      setQuantityError("Please enter a valid number for the quantity.");
      setIsQuantityValid(false);
    } else {
      setQuantityError("");
      setIsQuantityValid(true);
      handleInputChange(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    let errors = [];

    // Check if any required field is empty
    if (!product?.name || !product?.category || !product?.price || !product?.quantity || description.trim().length === 0) {
      errors.push("Please fill all the inputs before submit.");
    }

    if (errors.length > 0) {
      // Display error message in red color
      alert(errors.join("\n"));
      return;
    }

    // If all required fields are filled, proceed with saving
    if (isPriceValid && isQuantityValid && isDescriptionValid) {
      try {
        await saveProduct(e); // Pass the event object to saveProduct if needed
      } catch (error) {
        console.error("Error saving product:", error);
      }
    } else {
      if (!isPriceValid) {
        errors.push("Please enter a valid number for the price.");
      }

      if (!isQuantityValid) {
        errors.push("Please enter a valid number for the quantity.");
      }

      if (!isDescriptionValid) {
        errors.push("Description is required.");
      }

      // Display errors
      if (errors.length > 0) {
        alert(errors.join("\n"));
      }
    }
  };

  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={handleSubmit} className="form">
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
              //required
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this product.</p>
            )}
          </Card>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
            required
          />

          <label>Product Category:</label>
          <input
            type="text"
            placeholder="Product category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
            required
          />

          <label>Product Price:</label>
          <input
            type="text"
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handlePriceChange}
            required
          />
          {isFormSubmitted && !isPriceValid && (
            <span className="error-message">{priceError}</span>
          )}

          <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleQuantityChange}
            required
          />
          {isFormSubmitted && !isQuantityValid && (
            <span className="error-message">{quantityError}</span>
          )}

          <label>Product Description:</label>
          <div>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={handleDescriptionChange}
              modules={ProductForm.modules}
              formats={ProductForm.formats}
              style={{
                backgroundColor: "white",
                borderColor:
                  isFormSubmitted && !isDescriptionValid ? "red" : "",
              }}
              required
            />
          </div>
          {isFormSubmitted && !isDescriptionValid && (
            <span className="error-message">Description is required.</span>
          )}

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
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
ProductForm.formats = [
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

export default ProductForm;
