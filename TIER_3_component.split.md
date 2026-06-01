3.2:

1.  File src/components/Header.jsx

        function Header() {
        return (
        < header style={{ padding: "20px", background: "#2c3e50", color: "white", textAlign: "center" }}>
        < h1>Cửa hàng công nghệ 2026</>
        < nav>
        < a href="#" style={{ color: "white", margin: "0 10px" }}>Trang chủ</>
        < a href="#" style={{ color: "white", margin: "0 10px" }}>Sản phẩm</>
        </>
        </>
        );
        }
        export default Header;

2.  File src/components/Footer.jsx

        function Footer() {
            return (
                < footer style={{ marginTop: "20px", padding: "10px", textAlign: "center", borderTop: "1px solid #eee" }}>
                    < p>© 2026 Tech Store - All rights reserved</>
                </>
            );
        }
        export default Footer;

3.  File App.jsx

        import Header from "./components/Header";
        import Footer from "./components/Footer";
        import ProductCard from "./components/ProductCard";

        function App() {
            const products = [
                { id: 1, name: "iPhone 15", price: "25.000.000", image: "https://via.placeholder.com/200" },
                { id: 2, name: "Samsung S24", price: "22.000.000", image: "https://via.placeholder.com/200" }
            ];

            return (
                <div>
                    <Header />
                    <main style={{ padding: "20px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        {products.map(p => (
                            <ProductCard key={p.id} name={p.name} price={p.price} image={p.image} />
                        ))}
                    </main>
                    <Footer />
                </div>
            );
        }
        export default App;

3.3:

1.Thành phần UserCard

    function UserCard({ name, email, avatar }) {
        return (
            < div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px", width: "200px", textAlign: "center" }}>
                < img src={avatar} alt={name} style={{ borderRadius: "50%", width: "80px" }} />
                < h4>{name}</>
                < p style={{ fontSize: "12px", color: "gray" }}>{email}</>
            </>
        );
    }

2.Thành phần PriceTag

    function PriceTag({ originalPrice, salePrice }) {
        return (
            < div>
                < span style={{ textDecoration: "line-through", color: "#999", marginRight: "10px" }}>
                    {originalPrice}đ
                </>
                < span style={{ color: "red", fontWeight: "bold", fontSize: "1.2em" }}>
                    {salePrice}đ
                </>
            </>
        );
    }
