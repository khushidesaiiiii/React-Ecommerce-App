import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IoIosArrowRoundBack } from "react-icons/io";

import Button from "../../UI/Button";

export default function Profile() {
  const authUser = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!authUser?.id) {
      return;
    }

    fetch(`https://dummyjson.com/users/${authUser.id}`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => <p>{err.message}</p>);
  }, [authUser]);

  function handleNavigation() {
    if (authUser.role === "admin") {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }

  if (!profile) return <p className="para">Loading...</p>;

  return (
    <div className="profile-wrapper">
      {authUser.role !== 'admin' && <Button type="type" onClick={handleNavigation}>
        <IoIosArrowRoundBack /> Back
      </Button>}
      <h2>{profile.role} Profile</h2>
      <div className="profile-header">
        <div className="user-img">
          <img src={profile.image} alt="profile.firstName" />
        </div>
        <div className="header-info">
          <h3>
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="role">{profile.role}</p>
          <p className="loaction">
            {profile.address.city}, {profile.address.country}
          </p>
        </div>
      </div>
      <div className="info-card">
        <h4>Personal Information</h4>
        <hr />
        <div className="info-grid">
          <div>
            <span>Username</span>
            <p>{profile.username}</p>
          </div>
          <div>
            <span>Contact</span>
            <p>{profile.phone}</p>
          </div>
          <div>
            <span>Date of Birth</span>
            <p>{profile.birthDate}</p>
          </div>
          <div>
            <span>Age</span>
            <p>{profile.age}</p>
          </div>
          <div>
            <span>Gender</span>
            <p>{profile.gender}</p>
          </div>
        </div>
      </div>
      <div className="info-card">
        <h4>Address</h4>
        <hr />
        <div className="info-grid">
          <div>
            <span>Street</span>
            <p>{profile.address.address}</p>
          </div>
          <div>
            <span>City</span>
            <p>{profile.address.city}</p>
          </div>
          <div>
            <span>Country</span>
            <p>{profile.address.country}</p>
          </div>
          <div>
            <span>Postal Code</span>
            <p>{profile.address.postalCode}</p>
          </div>
        </div>
      </div>
      <div className="info-card">
        <h4>My Measurements</h4>
        <hr />
        <div className="info-grid">
          <div>
            <span>Height</span>
            <p>{profile.height}</p>
          </div>
          <div>
            <span>Weight</span>
            <p>{profile.weight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
