import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CollegeDashboard() {
    const [formData, setFormData] = useState({
        name: "",
        short_code: "",
        website_url: "",
        is_active: "true",
        street: "",
        area: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        contact_designation: "",
    });

    const [colleges, setColleges] = useState([]);
    const [activeTab, setActiveTab] = useState("create");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateCollege = async (e) => {
        e.preventDefault();
        const payload = { ...formData, is_active: formData.is_active === "true" };
        try {
            const res = await axios.post(
                "https://signup-api.zoskills.com:2083/college/admin/colleges",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            alert(res.data.message);
            const createdCollegeId = res.data.data._id;
            if (createdCollegeId) {
                navigate(`/image/${createdCollegeId}`);
            } else {
                alert("College created but ID not found.");
            }
        } catch (error) {
            alert(error?.response?.data?.message || "Something went wrong.");
        }
    };

    const fetchColleges = async () => {
        try {
            const res = await axios.get("https://signup-api.zoskills.com:2083/college/admin/colleges");
            setColleges(res.data.data || []);
        } catch (error) {
            alert("Failed to fetch colleges.");
        }
    };

    const handleDeleteCollege = async (collegeId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this college?");
        if (!confirmDelete) return;

        try {
            const res = await axios.delete(`https://signup-api.zoskills.com:2083/college/admin/colleges/${collegeId}`);
            alert(res.data.message || "College deleted successfully.");
            fetchColleges();
        } catch (error) {
            alert(error?.response?.data?.message || "Failed to delete college.");
        }
    };

    useEffect(() => {
        if (activeTab === "list") fetchColleges();
    }, [activeTab]);

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center">College Management Dashboard</h2>

            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "create" ? "active" : ""}`} onClick={() => setActiveTab("create")}> Create College</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "list" ? "active" : ""}`} onClick={() => setActiveTab("list")}> List Colleges</button>
                </li>
            </ul>

            {activeTab === "create" && (
                <form className="row g-3 border p-4 rounded shadow-sm" onSubmit={handleCreateCollege}>
                    <h5>College Info</h5>
                    <div className="col-md-6">
                        <input className="form-control" name="name" placeholder="College Name *" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" name="short_code" placeholder="Short Code *" value={formData.short_code} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-12">
                        <input className="form-control" name="website_url" placeholder="Website URL" value={formData.website_url} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-3">
                        <select name="is_active" className="form-select" value={formData.is_active} onChange={handleInputChange}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                   <h5 className="mt-4">Address</h5>
                    {["street", "area", "city", "state", "country", "pincode"].map((field, i) => (
                        <div className="col-md-4" key={i}>
                            <input className="form-control" name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} value={formData[field]} onChange={handleInputChange} />
                        </div>
                    ))}

                    <h5 className="mt-4">Contact Person</h5>
                    {["contact_name", "contact_email", "contact_phone", "contact_designation"].map((field, i) => (
                        <div className="col-md-4" key={i}>
                            <input className="form-control" name={field} placeholder={field.replace("_", " ")} value={formData[field]} onChange={handleInputChange} />
                        </div>
                    ))}

                    <div className="col-12 text-end mt-3">
                        <button type="submit" className="btn btn-primary">Create College</button>
                    </div>
                </form>
            )}
            {activeTab === "list" && (
                <div className="table-responsive border p-3 rounded shadow-sm">
                    <h5 className="mb-3">All Colleges</h5>
                    <table className="table table-bordered table-hover align-middle text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Logo</th>
                                <th>College Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {colleges.length === 0 ? (
                                <tr><td colSpan="4">No colleges found.</td></tr>
                            ) : (
                                colleges.map((college, index) => (
                                    <tr key={college._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {college.logo_url ? (
                                                <img src={college.logo_url} alt="logo" width="100" height="60" style={{ objectFit: "cover", borderRadius: "8px" }} />
                                            ) : (
                                                <span className="text-muted">No Image</span>
                                            )}
                                        </td>
                                        <td>{college.name}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary me-2">Edit</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCollege(college._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
