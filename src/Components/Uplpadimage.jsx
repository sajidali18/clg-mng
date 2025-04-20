import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UploadImage() {
    const params = useParams();
    const [logoForm, setLogoForm] = useState({
        college_id: params.collegeId,
        file: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) {
            alert("File size must be less than 2MB");
            e.target.value = ""; 
            return;
        }
        setLogoForm((prev) => ({ ...prev, file: e.target.files[0] }));
    };
    const handleLogoUpload = async (e) => {
        e.preventDefault();
        if (!logoForm.file) {
            alert("Please select a file.");
            return;
        }
        const formData = new FormData();
        formData.append("college_id", logoForm.college_id);
        formData.append("myfile", logoForm.file);

        try {
            const res = await axios.post(
                "https://signup-api.zoskills.com:2083/college/admin/colleges/upload-profile",
                formData
            );
            alert(res.data.message);
            console.log(res)
        } catch (error) {
            alert(error.response?.data?.message || "Error occurred");
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center"> Upload College profile Image</h2>
            <form className="border p-4 rounded shadow-sm" onSubmit={handleLogoUpload}>
                {/* <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={logoForm.college_id}
                        readOnly
                    />
                </div> */}
                <div className="mb-3">
                    <label className="form-label">Select profile Image (Max 2MB)</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    Upload image
                </button>
            </form>
        </div>
    );
}
