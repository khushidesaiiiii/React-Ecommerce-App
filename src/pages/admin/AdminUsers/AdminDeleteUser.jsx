import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Button from "../../../UI/Button";
import { deleteUser } from "../../../store/userSlice";

export default function AdminDeleteUser({ user, onClose }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    try{
        
        dispatch(deleteUser(user.id)).unwrap();
        toast.success("User Deleted Successfully!");
        onClose();
    } catch {
        toast.error("Failed to delete user");
    }
  }

  return (
    <div className="delete-modal-backdrop">
      <div className="delete-modal">
        <h2>Delete User</h2>
        <h3>
          Delete{" "}
          <strong>
            {user.firstName} {user.lastName}?
          </strong>
        </h3>
        <p>
          Are you sure you want to delete this user? Once deleted, this action
          cannot be undone.
        </p>
        <Button type='type' onClick={handleDelete}>Delete</Button>
        <Button type='type' onClick={onClose}>Cancel</Button>
      </div>
    </div>
  );
}
