import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomModal from "@/components/CustomModal";
import { BASE_URL } from "../../global/server";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";

interface UploadContentVideoModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  onVideoUploaded: () => void;
}

const UploadYTContentVideoModal: React.FC<UploadContentVideoModalProps> = ({
  isOpen,
  toggleModal,
  onVideoUploaded,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "meditation", // Default category
    video_url: "",
  });
  const auth = useSelector((state: RootState) => state.auth);

  const { title, description, category, video_url } = formData;

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        `${BASE_URL}/api/ytContentVideo/`,
        {
          title,
          description,
          category,
          video_url,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${auth.token}`,
          },
        }
      );

      onVideoUploaded();
      toggleModal();
    } catch (error) {
      console.error("Error uploading video", error);
      // Optionally handle error here if needed
    }
  };

  return (
    <CustomModal isOpen={isOpen} toggleModal={toggleModal}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Input
            value={description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="block w-full px-4 py-2 mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          >
            <option value="meditation">Meditation</option>
            <option value="education">Education</option>
            <option value="consultancy">Consultancy</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Video Url
          </label>
          <Input
            value={video_url}
            onChange={(e) => handleChange("video_url", e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Upload</Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default UploadYTContentVideoModal;
