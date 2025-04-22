import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ClgList() {
    const navigation = useNavigate(); // ✅ Fixed missing 'const'
    const [college, setCollege] = useState([]);
    const[loading, setLoading] = useState(true)

    const btnclick = (id) => {
        navigation(`/college/${id}`);
        console.log("college id ", id);
    };

    // const handleAddCollege = () => {
    //     navigation('/addcollege'); // ✅ Navigate to add-college page
    // };

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const res = await axios.get("https://signup-api.zoskills.com:2083/college/admin/colleges");
                const collegesData = res.data.data || [];
                setCollege(collegesData);
                setLoading(false);
                // console.log("Fetched colleges:", collegesData);
            } catch (error) {
                console.log("Failed to fetch colleges");
                setLoading(false);
            }
        };

        fetchColleges();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="">
                <header style={{ backgroundColor: "#EA6A2B" }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://s3-alpha-sig.figma.com/img/25bd/ea01/8d16d9096b072a7cba46f333db0c77cb?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DkpsutrN~pNrJzXZTSLcIQAILGxHnHONKe9mWn5lbAcqzlZW13PzXMkK4KaOQmQ7jjSQ3hDWmKo30p3TYPC7ORmWgn~AJlGrKU46LJOSvU3hrHkq33FosxmLRTFO8-MvXkNGm2vGBXvEopheoPEQjzvuucWEajeH7ZOBxPWjoZTeUvbhD8rWS0kW~p9bzGqbSVVJgsjIAGz47LhSkjTMEQs3xsNekooCs2hFMuKcmzNrog2MRACzTd4jmWeZ174Ll4IBwnFq1jR0ZA4AuXvEBKX4UzmN8OtvQXY38vMP1IqiD-qDjiXqtrtfHsmiWS730itAHjg8YHKxPrMK92iYSQ__"
                                        alt="PushGrade Logo"
                                        width={120}
                                        height={40}
                                        style={{ objectFit: "contain" }}
                                    />
                                    <div className="d-none d-sm-block"
                                        style={{
                                            width: 0,
                                            height: 0,
                                            borderTop: "15px solid transparent",
                                            borderBottom: "15px solid transparent",
                                            borderLeft: "25px solid white",
                                        }}
                                    ></div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </header>

                <div className="text-center mb-5">
                    <h1 className="fw-bold text-primary mt-4">Explore  Colleges</h1>
                </div>

                <div className='container'>
                    {/* ✅ Add College Button */}
                    <div className="row mb-4 align-items-center">
                        <div className="col-md-8">
                            <input
                                type="text"
                                className="form-control rounded-pill px-4 py-2 shadow-sm"
                                placeholder="Search colleges by name, city, or program..."
                            />
                        </div>
                    </div>


                    <div className="row g-4">
                        {college.map((item, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card college-card h-100">
                                    <img src={item.logo_url} className="card-img-top college-img" alt="College" />
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">{item.name}</h5>
                                        <p className="card-text text-muted mb-1">
                                            <i className="bi bi-geo-alt-fill text-danger" /> {item.address.city}, {item.address.state}
                                        </p>
                                        <p className="small text-secondary">
                                            Private university offering UG, PG, and doctoral programs in Engineering, Management, and more.
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white border-top-0">
                                        <button className="btn btn-outline-primary w-100" onClick={() => btnclick(item._id)}>
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClgList;
