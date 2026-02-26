import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Button from "../../../UI/Button";
import { updateUser } from "../../../store/userSlice";

export default function AdminUpdateUser({ user, onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch(
        updateUser({
          id: user.id,
          updates: formData,
        })
      ).unwrap();
      toast.success("User Details Updated!");
      onClose();
    } catch {
      toast.error("Failed to update data.");
    }
  }

  return (
    <div className="update-modal-backdrop">
      <div className="update-modal">
      <h3>Update User Details</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.firstName}
            required
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <input
            type="text"
            value={formData.lastName}
            required
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <input
            type="email"
            value={formData.email}
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Button type="submit">Update</Button>
          <Button type="type" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
}
