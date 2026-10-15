import Axios  from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DeletProduct from "./DeletProduct";
import AddShoppingCard from "./AddShoppingCard";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SingelShoppingCard from "./SingelShoppingCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SingleCategory=()=>{
    const location = useLocation();
    const title = location.state?.title
    console.log(title);
    const [products,setProducts]=useState([])
    const [visible, setVisible] = useState(false);
    const navigate=useNavigate()
    // const [user, setUser] = useState();
    // const [err, setErr] = useState();
const fetchData=async()=>{
    const {data}=await Axios.get("http://localhost:1004/api/product")
    const filtered=data.filter((product)=>{
        // console.log(product.category+"  "+title);
        return product.category===title
    })
    setProducts(filtered)
}
useEffect(()=>{
    fetchData()
    // decodeToken()
},[title])
 
// const decodeToken = () => {
//     const rawToken = localStorage.getItem("usernow");
//     if (!rawToken) return;

//     try {
//         const decoded = jwtDecode(rawToken);
//         setUser(decoded);
//     } catch (e) {
//         console.error("JWT decode failed:", e);
//         setErr("טוקן משתמש לא חוקי");
//     }
// };
// const isAdmin = user?.roles === "מנהל"
const roles = useSelector(state => state.sum.roles);
const [visible1, setVisible1] = useState(false);
const enter = (res) => {
    if (res){
        setVisible1(false);
        navigate("/Register"); }
    else{
        setVisible1(false);
        navigate("/")}
};

const footerContent = (
    <div>
        <Button label="ביטול" icon="pi pi-times" onClick={() => enter(false)} autoFocus  className="p-button-text mt-2 custom-transparent-button"  />
        <Button label="התחברות" icon="pi pi-user" onClick={() => enter(true)} autoFocus />
    </div>
)

const goToCart = () => {
    try {
        const token = localStorage.getItem("userNow");
        if (!token) throw new Error("יש להתחבר לפני שניתן לצפות בעגלה");
        navigate("/allSCard");
    } catch (err) {
        console.log("פתיחת דיאלוג שגיאה");  
        setVisible1(true);
    }
}
const handleDelete = (id) => {
    setProducts(prev => prev.filter(product => product._id !== id));
}
return (

    <div style={{ position: 'relative', minHeight: '100vh' }}>
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
                padding: '20px',
                lineHeight: 0
            }}
        >
            {products.map((product) => (
                <div key={product._id} style={{ flex: '0 0 calc(33.33% - 20px)', justifyContent: "space-around", maxWidth: 'calc(25% - 20px)' }}>
                    <Card
                        header={
                            <Link to={`/all/${product._id}`}>
                                <img
                                    src={`http://localhost:1004/uploads/${product.image}`}
                                    alt={product.name}
                                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                            </Link>
                        }
                        style={{
                            textAlign: 'center',
                            backgroundColor: '#362C28',
                            color: 'white',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s',
                            cursor: 'pointer',
                            height: '300px',
                            border: '1.5px solid #C89A42',
                            lineHeight: 0


                        }}
                        className="hover:scale-105 transition-transform"
                    >
                          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                <div  style={{ paddingTop: "80px" , flexShrink: "0" }}>
                                    {roles ? <DeletProduct id={product._id} onDelete={handleDelete} /> : null}
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1px", flexGrow: "1", margin: '0 10px' }}>
                                    <p style={{ fontSize: "10px", color: "#C89A42" }}>מק"ט: {product.code}</p>
                                    <h3> {product.name}</h3>
                                    <p> {product.price}₪</p>
                                    <div className="flex justify-content-between align-items-center mb-2">
                                        <div className="flex align-items-center gap-0" style={{paddingLeft:"10%",lineHeight:"20px"}}>
                                            <i className="pi pi-tag"></i>
                                            <span className="font-semibold" >{product.category}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <div style={{ paddingTop: "20px", flexShrink: "0"}}>
                                        <AddShoppingCard product={product} price={product.price*product.count} degel={visible} setDegel={setVisible} />
                                    </div>
                                </div>
                    </Card>
                </div>
            ))}
        </div>

        {/* הכפתור מוצמד לתחתית ימין */}
        <Button
            onClick={() => setVisible(true)}
            icon="pi pi-shopping-cart"
            className="p-button-rounded"
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                backgroundColor: '#C89A42',
                color: 'white',
                borderColor: 'white',
                zIndex: 999,
                height: "50px",
                width: "50px",
                border: "2px solid white"
            }}
        />

<Button
    onClick={() => {
        const token = localStorage.getItem("userNow");
        if (!token) {
            setVisible1(true); 
        } else {
            setVisible(true); 
        }
    }}
    icon="pi pi-shopping-cart"
    className="p-button-rounded"
    style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        backgroundColor: '#C89A42',
        color: 'white',
        borderColor: 'white',
        zIndex: 999,
        height: "50px",
        width: "50px",
        border: "2px solid white"
    }}
/>

            <Dialog
                dismissableMask
                onClick={goToCart}
                position="left"
                visible={visible}
                style={{ width: '30vw', height: "100vh" }}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}
            >
                <SingelShoppingCard visible={visible} />
            </Dialog>
            <Dialog
            header="שגיאה בגישה לעגלה"
            visible={visible1}
            modal={true}
            style={{ width: '40vw', zIndex: 1000 }}
            onHide={() => setVisible1(false)}
            footer={footerContent}
        >
            <p>כדי לצפות בעגלת הקניות יש להתחבר למערכת.</p>
        </Dialog>
    </div>
);
}
export default SingleCategory