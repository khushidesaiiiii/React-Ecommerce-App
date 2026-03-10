import { FaSpinner } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="loading">
      <p>
        <span className="spinner"><FaSpinner /></span> Loading...</p>
    </div>
  );
}