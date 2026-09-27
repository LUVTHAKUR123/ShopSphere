import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/signin");
  }, [user]);

  if (!user) return null;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7">
          {/* Page Heading */}
          <div className="mb-4">
            <h2 className="fw-bold text-dark mb-2">My Profile</h2>
            <p className="text-secondary mb-0">
              Manage your personal information and account details.
            </p>
          </div>

          {/* Profile Card */}
          <div className="card border-0 shadow rounded-4 overflow-hidden">
            {/* Card Header */}
            <div className="bg-primary text-white p-4">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="bg-white text-primary rounded-circle d-flex
                  align-items-center justify-content-center fw-bold
                  shadow-sm"
                  style={{
                    width: "75px",
                    height: "75px",
                    fontSize: "30px",
                  }}
                >
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div>
                  <h4 className="fw-bold mb-1">{user.name}</h4>
                  <p className="mb-2 text-white-50">{user.email}</p>
                  <span className="badge bg-white text-primary rounded-pill px-3 py-2">
                    {user.is_admin ? "Admin Account" : "Customer Account"}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="card-body p-4 p-md-5">
              <h5 className="fw-bold text-dark mb-4">Personal Information</h5>

              {/* Name */}
              <div className="d-flex align-items-center border-bottom pb-4 mb-4">
                <div
                  className="bg-primary-subtle text-primary rounded-3
                  d-flex align-items-center justify-content-center me-3"
                  style={{ width: "55px", height: "55px" }}
                >
                  <i className="bi bi-person fs-4"></i>
                </div>

                <div>
                  <small className="text-secondary d-block mb-1">
                    Full Name
                  </small>
                  <h6 className="fw-semibold text-dark mb-0">{user.name}</h6>
                </div>
              </div>

              {/* Email */}
              <div className="d-flex align-items-center border-bottom pb-4 mb-4">
                <div
                  className="bg-success-subtle text-success rounded-3
                  d-flex align-items-center justify-content-center me-3"
                  style={{ width: "55px", height: "55px" }}
                >
                  <i className="bi bi-envelope fs-4"></i>
                </div>

                <div>
                  <small className="text-secondary d-block mb-1">
                    Email Address
                  </small>
                  <h6 className="fw-semibold text-dark mb-0 text-break">
                    {user.email}
                  </h6>
                </div>
              </div>

              {/* Account Type */}
              <div className="d-flex align-items-center">
                <div
                  className="bg-warning-subtle text-warning-emphasis rounded-3
                  d-flex align-items-center justify-content-center me-3"
                  style={{ width: "55px", height: "55px" }}
                >
                  <i className="bi bi-shield-check fs-4"></i>
                </div>

                <div>
                  <small className="text-secondary d-block mb-1">
                    Account Type
                  </small>
                  <h6 className="fw-semibold text-dark mb-0">
                    {user.is_admin ? "Admin" : "Customer"}
                  </h6>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="bg-light border-top px-4 py-3">
              <div className="d-flex align-items-center text-secondary small">
                <i className="bi bi-patch-check-fill text-success me-2"></i>
                Your account information
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
