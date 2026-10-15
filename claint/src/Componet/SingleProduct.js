import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Card } from 'primereact/card';

import AddShoppingCard from "./AddShoppingCard";

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const fetchId = async () => {

            const res = await Axios.get(`http://localhost:1004/api/product/${id}`);
            setProduct(res.data);
 
    };

    useEffect(() => {
        fetchId();
       
    }, []);


    if (!product) return <div>טוען מוצר...</div>;
    return (
        <div style={{ maxWidth: '400px', margin: '40px auto' }}>
            <Card
                header={
                    <div style={{ position: 'relative' }}>
                        <img
                            src={`http://localhost:1004/uploads/${product.image}`}
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: '250px',
                                objectFit: 'cover',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                transition: 'transform 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                backgroundColor: '#C89A42',
                                color: 'white',
                                padding: '5px 10px',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                            }}
                        >
                            <i className="pi pi-tags" style={{ fontSize: '1rem' }}></i>
                            {product.category}
                        </div>
                    </div>
                }
                title={product.name}
                subTitle={<span style={{ color: '#C89A42' }}>מק"ט: {product.code}</span>}
                style={{
                    textAlign: 'center',
                    backgroundColor: '#362C28',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    cursor: 'default',
                    paddingBottom: '1.5rem',
                }}
                className="hover:scale-105 transition-transform"
            >
                <p style={{ fontSize: '1.3rem', marginTop: '1rem', fontWeight: '600' }}>
                    מחיר: ₪ {product.price}
                </p>
            </Card>
        </div>
    );

};

export default SingleProduct;
