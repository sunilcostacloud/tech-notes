import { useNavigate, useParams } from "react-router-dom"

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <h1>EditUser</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center", padding: "5px" }}>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }} >
                <div>
                    <h2>Username: </h2>
                    <h3>Status: </h3>
                </div>
            </div>
        </div>
    )
}

export default EditUser