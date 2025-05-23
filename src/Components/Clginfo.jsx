import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UniversityProfile() {
    const params = useParams();
    const collegeId = params.collegeId;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        const getcollege = async () => {
            try {
                const res = await axios.get(`https://signup-api.zoskills.com:2083/college/admin/colleges/${collegeId}`);
                const collegesData = res.data.data || [];
                setData(collegesData)
                setLoading(false);
                // console.log("Fetched colleges:", collegesData); // Log here instead of after setState
            } catch (error) {
                console.log("Failed to fetch colleges");
                setLoading(false);
            }
        };
        getcollege();
    }, [collegeId]);

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
        
        <div className="d-flex flex-column min-vh-100">
           <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 container">
  {/* <div class="container"> */}
  <div classname="row align-items-center">
    <div classname="col-6">
      <div classname="d-flex align-items-center">
        <img src="https://s3-alpha-sig.figma.com/img/25bd/ea01/8d16d9096b072a7cba46f333db0c77cb?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sHA3x1JgHFDOMppRvaOY6byIoshM~aRubcHVlv3DDOdHW-elF8zpC4-f3LShzY1OrvF9grTHjmjSh26vRszgH-2ob4fNLRLYsnokdwfXIBNgFf1JecUkhgJjuzkelyodmaEZITYHPWQ7YFgKkSRDGqr0uTTBe2CQq~RHrlDhnE7pEBeK0QUb-hiQItB-MRIXf8Br3qv5oTYaVRAgtaujQLvmpYpG1OJ3z2afHbDUahn03O79gOI8CclwEPefTCDXyUir7gt2RALtk8NPOaanZH1-W3-WQbxL1RBJuFogUSwMCrcyCttZNXMBO-Rwa32hNo-sVNkTs9ZJ4pB2dihOnA__" alt="PushGrade Logo" width={120} height={40} style={{objectFit: 'contain'}} />
      </div>
    </div>
  </div>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav me-auto mx-4">
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
          Product
        </a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
          Teams
        </a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
          Individuals
        </a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
          Download
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Pricing</a>
      </li>
    </ul>
    {/* <div className="d-flex align-items-center">
      <a href="#" className="me-3 nav-link">Campus Connect</a>
      <a href="#" className="me-3 nav-link">Log in</a>
      <a href="#" className="btn btn-dark rounded-3 px-4">Sign Up</a>
    </div> */}
  </div>
                 </nav>



              <main className="flex-grow-1 py-4">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-8">
                            {console.log(data)}
                            <div className="d-flex gap-3 mb-4">
                                <div>
                                    <img
                                        src={data.logo_url}
                                        alt="University Logo"
                                        width={80}
                                        height={80}
                                        className="rounded-circle border"
                                    />
                                </div>
                                <div>
                                    <h1 className="fs-3 fw-bold">{data.name}</h1>

                                    <div className="d-flex gap-4 align-items-center mb-1">
                                        <p className="text-secondary small mb-0">Private university in Vidhani</p>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="badge bg-warning text-dark fw-bold">8.4</span>
                                            <a href="#" className="text-primary small text-decoration-none">1 Review</a>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center small text-secondary mb-2">
                                        <i className="bi bi-geo-alt me-1"></i>
                                        <span>{data.address.state} ,{data.address.city }</span>
                                    </div>

                                    <p className="small text-secondary">
                                        Poornima University in Jaipur, Rajasthan is a private university offering a wide range of
                                        undergraduate, postgraduate, and doctoral programs.
                                    </p>
                                </div>

                            </div>

                            {/* University Image */}
                            <div className='container'>
                                <div className="position-relative mb-4">
                                    <div className='container'>     
                                <img src={data.profile_image_url}
                                    alt="University Campus"
                                    className="img-fluid rounded w-100"
                                            style={{ height: "300px", objectFit: "cover" }} />
                                    </div>
                                <div className="position-absolute bottom-0  start-0 end-0 d-flex justify-content-center gap-1 ">
                                    <div className="rounded-circle bg-warning" style={{ width: "8px", height: "8px" }}></div>
                                    <div className="rounded-circle bg-white opacity-75" style={{ width: "8px", height: "8px" }}></div>
                                    <div className="rounded-circle bg-white opacity-75" style={{ width: "8px", height: "8px" }}></div>
                                </div>
                            </div>
                            </div>
                            {/* Overview */}
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h2 className="fs-4 fw-bold mb-3">{data.name} Overview</h2>
                                    <p className="small text-secondary mb-3">
                                        {data.name} University, established in 2012, is a private university in{" "}
                                        <a href="#" className="text-primary text-decoration-none">
                                            Jaipur, Rajasthan
                                        </a>
                                        . The university was established by Rajasthan State Legislature vide Act No. 16/2012 and is
                                        recognized under section 22(1) of the{" "}
                                        <a href="#" className="text-primary text-decoration-none">
                                            University Grants Commission (India)
                                        </a>{" "}
                                        Act, 1956.
                                    </p>
                                    <button className="btn btn-link text-primary p-0 small d-flex align-items-center">
                                        Show More <i className="bi bi-chevron-down ms-1"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Mission */}
                            <div className="mb-4">
                                <h2 className="fs-4 fw-bold mb-3">Mission</h2>
                                <ul className="list-unstyled">
                                    {[
                                        "Transform yourself from a fresher into a skilled professional with the right opportunities",
                                        "Build Your Profile",
                                        "Join Professional Organizations",
                                    ].map((item, idx) => (
                                        <li className="d-flex mb-3" key={idx}>
                                            <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                                            <span className="small " style={{ fontSize: "16px", fontWeight: "500" }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Why Us */}
                            <div>
                                <h2 className="fs-4 fw-bold mb-3">Why Us</h2>
                                <ul className="list-unstyled">
                                    {[
                                        "Transform yourself from a fresher into a skilled professional with the right opportunities",
                                        "Benchmark your skills from Inter-college Tech Events",
                                        "Sponsored Funded R & D Projects",
                                        "Paid Internships",
                                        "Freelance Projects",
                                        "Dream Job Opportunities",
                                        "Get into the world of Entrepreneurship",
                                        "Any other stream & interested in programming or non-tech domains",
                                        "Zero to Outstanding - From beginner to expert.",
                                    ].map((item, idx) => (
                                        <li className="d-flex mb-3" key={idx}>
                                            <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                                            <span className="" style={{ fontSize: "16px", fontWeight: "500" }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        <p className="mb-1" style={{ fontSize:"18px" }} >
                                            <span style={{ color:"#EA6A2B", fontWeight:"700"}} className="fw-medium">Push Your Boundaries</span> <br/>  A platform for career and
                                            skill- <br/>
                                            building.
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <div className="dropdown w-100">
                                            <button
                                                className="btn btn-outline-secondary w-100 d-flex justify-content-between align-items-center"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                style={{marginTop:"60px"}}
                                            >
                                                <span>Programs</span>
                                                <i className="bi bi-chevron-down"></i>
                                            </button>
                                            <ul className="dropdown-menu w-100">
                                                {["Engineering", "Management", "Science"].map((prog, i) => (
                                                    <li key={i}>
                                                        <a className="dropdown-item" href="#">
                                                            {prog}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <button className="btn btn-primary w-100 mb-3">Apply Now</button>
                                    <button
                                        className="btn w-100 mb-3"
                                        style={{
                                            boxShadow: '0px -1px 0px 1px rgba(4, 21, 71, 0.05) inset, 0px 2px 0px 1px rgba(255, 255, 255, 1) inset, 0px 1px 0px 1px rgba(247, 248, 249, 1) inset',
                                        }}
                                    >
                                        Request More Info
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="fs-5 fw-bold mb-3">Why Apply on PushGrade?</h3>
                                <ul className="list-unstyled">
                                    {[
                                        {
                                            icon: "bi-star-fill",
                                            text: "Boost Your Acceptance Rate with industry's no.1 admissions review and feedback",
                                        },
                                        { icon: "bi-info-circle-fill", text: "Easy Online Application" },
                                        {
                                            icon: "bi-star-fill",
                                            text: (
                                                <>
                                                    Thousands of international students use Global Admissions with{" "}
                                                    <a href="#" className="">
                                                        4.9 star reviews
                                                    </a>
                                                </>
                                            ),
                                        },
                                        {
                                            icon: "bi-check-circle-fill",
                                            text: (
                                                <>
                                                    Free Service to{" "}
                                                    <a href="" className="">
                                                        Partner Universities
                                                    </a>{" "}
                                                    or upgrade to our{" "}
                                                    <a href="#" className="">
                                                        Guaranteed Service
                                                    </a>
                                                </>
                                            ),
                                        },
                                    ].map((item, i) => (
                                        <li className="d-flex mb-3" key={i}>
                                            <i className={`bi ${item.icon}  me-2 mt-1`}></i>
                                            <div className="">
                                                <p className="mb-0" style={{ fontSize: "14px", fontWeight: "500" }}>{item.text}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            

            <footer style={{
                backgroundColor: "#EA6A2B"
            }} className=" py-3 text-white mt-4">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0">
                            <p className="small mb-0">© 2025 PushGrade</p>
                        </div>
                        <div className="col-md-4 mb-2 mb-md-0 text-md-center">
                            <div className="d-flex gap-3 justify-content-md-center">
                                <a href="#" className="text-white text-decoration-none small">
                                    Terms
                                </a>
                                <a href="#" className="text-white text-decoration-none small">
                                    Privacy
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <div className="d-flex gap-3 justify-content-md-end">
                                {["linkedin", "facebook", "instagram", "twitter", "youtube"].map((icon, i) => (
                                    <a href="#" key={i} className="text-white">
                                        <i className={`bi bi-${icon}`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
