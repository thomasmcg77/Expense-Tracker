import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { categories } from "../../constants/add-expense";
import { addExpense } from "../../redux/actions/expenses";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./add-form.css";
import SuccessModal from "./success-modal";

const AddForm = () => {
  const cat = categories;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAmount = (e) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val)) {
      setAmount("");
      return;
    } else {
      setAmount(val);
    }
  };

  const handleCategory = (category) => {
    setCategory(category);
    setDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (title === "" || amount === "" || !category) {
      const notify = () => toast("Please enter valid data");
      notify();
      return;
    }
    const data = {
      title,
      amount,
      category,
      createdAt: new Date(),
    };

    dispatch(addExpense(data));
    setModalOpen(true);
  };

  return (
    <div className="add-form">
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
      <SuccessModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <div className="form-item">
        <label>Title</label>
        <input
          placeholder="Name of expense"
          value={title}
          onChange={(e) => handleTitle(e)}
        />
      </div>
      <div className="form-item">
        <label>Amount $</label>
        <input
          className="amount-input"
          placeholder="Price of expense"
          value={amount}
          onChange={(e) => handleAmount(e)}
        />
      </div>
      <div className="category-container-parent">
        <div className="category">
          <div
            className="category-dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <label>{category ? category.title : "Category"}</label>
            <i class="fi fi-rr-angle-down"></i>
          </div>
          {dropdownOpen && (
            <div className="category-container">
              {cat.map((item) => (
                <div
                  className="category-item"
                  style={{
                    borderRight: `5px solid ${item.color}`,
                  }}
                  key={item.id}
                  onClick={() => handleCategory(item)}
                >
                  <label>{item.title}</label>
                  <img src={item.icon.default} alt={item.title} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="form-submit-button">
        <div onClick={handleSubmit}>
          <label>Submit</label>
          <i class="fi fi-rs-paper-plane"></i>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
