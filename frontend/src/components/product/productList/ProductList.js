import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loder";
import "./productList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import jsPDF from "jspdf"; // Import jsPDF for PDF generation
import "jspdf-autotable"; // Import jspdf-autotable for creating tables in PDF
import salonLogo from "../../../assets/salonLogo.png";

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  // Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  // Report generation function
  const generateReport = () => {
    const doc = new jsPDF(); // Create a new jsPDF instance
    const currentDate = new Date(); // Get current date and time
    const formattedDate = currentDate.toLocaleString(); // Format date and time as a string

    // Salon address lines
    const salonAddressLines = ["E3, Isurupura", "Malabe", "Sri Lanka"];

    // Add salon logo
    doc.addImage(salonLogo, "JPEG", 10, 10, 50, 50); // Add salon logo to the PDF

    // Add salon address
    doc.setFontSize(12);
    salonAddressLines.forEach((line, index) => {
      const yPos = 30 + index * 10; // Adjust spacing between lines
      doc.text(line, 150, yPos); // Add each line of the address (align right)
    });

    // Add table title "Inventory Table"
    doc.setFontSize(14);
    const titleText = "Inventory Table";
    const titleWidth =
      (doc.getStringUnitWidth(titleText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2; // Center the title horizontally
    const titleY = 70; // Vertical position for the title
    doc.text(titleText, titleX, titleY); // Add table title in the middle of the page

    // Add current date and time
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, 10, 280); // Add current date and time at bottom left

    // Define table headers
    const headers = [
      "#",
      "Name",
      "Category",
      "Price",
      "Quantity",
      "Total Price",
    ];

    // Define table rows
    const rows = currentItems.map((product, index) => [
      index + 1,
      product.name,
      product.category,
      `Rs.${product.price}`,
      product.quantity,
      `Rs.${product.price * product.quantity}`,
    ]);

    // Set table position and styling
    const tableProps = {
      startY: titleY + 20, // Adjust startY value to move the table further down from the title
      margin: { horizontal: 10 },
      styles: { cellPadding: 5, fontSize: 10, cellWidth: "auto" },
      headStyles: { fillColor: [100, 100, 100], textColor: [255, 255, 255] },
      bodyStyles: { textColor: [0, 0, 0] },
    };

    // Add table to PDF
    doc.autoTable(headers, rows, tableProps);

    // Add manager's signature placeholder
    const signatureText = "Manager's Signature:";
    doc.text(".................................", 168, 280);
    const textWidth =
      (doc.getStringUnitWidth(signatureText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const textX = doc.internal.pageSize.width - textWidth - 10; // Align to right, with margin
    const textY = doc.internal.pageSize.height - 10; // Bottom margin
    doc.text(textX, textY, signatureText);

    // Save the PDF with filename "product_report.pdf"
    doc.save("product_report.pdf");
  };

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <h3 style={{fontSize: "25px"}}>Inventory Items</h3>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
          {/* Add the Generate Report button */}
          <button className="--btn --btn-primary" onClick={generateReport}>
            Generate Report
          </button>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>-- No product found, please add a product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"Rs."}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {"Rs."}
                        {price * quantity}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-details/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
