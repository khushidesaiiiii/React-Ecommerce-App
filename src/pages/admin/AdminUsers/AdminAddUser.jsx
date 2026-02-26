import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { CiShuffle } from "react-icons/ci";

import Button from "../../../UI/Button";
import { addUser } from "../../../store/userSlice";

function generateAvatar() {
  return `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70)}`;
}

export default function AminAddUser({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: {
      city: '',
      country: '',
    },
    role: '',
    image: generateAvatar(),
  });

  function regenrateAvatar() {
    setFormData((prev) => ({ ...prev, image: generateAvatar() }));
  }

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(addUser(formData)).unwrap();
      toast.success("User added successfully!");
      onClose();
    } catch {
      toast.error("Failed to add user.");
    }
  };

  return (
    <div className="add-modal-backdrop">
      <div className="add-modal">
        <h3>Add User</h3>
        <form onSubmit={handleSubmit}>
          <div className="user-avtar">
            <img src={formData.image} alt="User Avtar" />
            <Button type="type" onClick={regenrateAvatar}>
              <CiShuffle /> Regenerate
            </Button>
          </div>
          <input

            type="text"
            placeholder="Enter Firstname"
            required
            onChange={(e) => {
              setFormData({ ...formData, firstName: e.target.value });
            }}       
          />
          <input
            type="text"
            placeholder="Enter Lastname"
            required
            onChange={(e) => {
              setFormData({ ...formData, lastName: e.target.value });
            }}
          />
          <input
            type="email"
            placeholder="Enter Email"
            required
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Enter City"
            required
            value={formData.address.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  city: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            placeholder="Enter Country"
            required
            value={formData.address.country}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  country: e.target.value,
                },
              })
            }
          />
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <Button type="submit">Add</Button>
          <Button type="type" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
}
