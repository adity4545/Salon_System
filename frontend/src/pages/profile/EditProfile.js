import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loder";
import { selectUser } from "../../redux/features/auth/authSlice";
import "./Profile.scss";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";
import ChangePassword from "../../components/changePassword/ChangePassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Phone number validation
      if (profile.phone.length !== 10) {
        toast.error("Phone number must be 10 digits.");
        setIsLoading(false);
        return;
      }

      let imageURL = profile.photo; // Default to current photo URL

      if (profileImage) {
        // Handle Image upload only if a new image is selected
        const imageFormData = new FormData();
        imageFormData.append("file", profileImage);
        imageFormData.append("cloud_name", "dkofrgzyg");
        imageFormData.append("upload_preset", "fr4re4bj");

        const imageUploadResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dkofrgzyg/image/upload",
          { method: "POST", body: imageFormData }
        );
        const imageData = await imageUploadResponse.json();
        imageURL = imageData.url;
      }

      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: imageURL,
      };

      const response = await updateUser(formData);
      console.log(response);
      toast.success("User updated");
      navigate("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label style={{ fontWeight: "Bold" }}>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
                style={{ fontWeight: "bold" }}
              />
            </p>
            <p>
              <label style={{ fontWeight: "Bold" }}>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code style={{ fontWeight: "bold", color:"red" }}>Email cannot be changed.</code>
            </p>
            <p>
              <label style={{ fontWeight: "Bold" }}>Phone:</label>
              <input
                type="Number"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
                style={{ fontWeight: "bold" }}
              />
            </p>
            <p>
              <label style={{ fontWeight: "Bold" }}>Bio:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
                style={{fontWeight:"bold"}}
              ></textarea>
            </p>
            <p>
              <label style={{ fontWeight: "Bold" }}>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <div>
              <button className="--btn --btn-success">Update Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
