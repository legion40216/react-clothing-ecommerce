import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import { Home, Collection, Products, Checkoutpage, Pagenotfound } from "./pages";
import { ScrollToTop } from "./components";
import products from "./data/products";

const collectionData = {
  categories: [
    { categorie: "summer" },
    { categorie: "spring" },
    { categorie: "fall" },
    { categorie: "winter" },
  ],
};

function App() {
  const [userData, setUserData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("userData")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const navlinks = collectionData.categories;

  function handleAddCart(productQuantity, productId, discountPrice, placeProduct) {
    if (!productId) return;

    if (productQuantity === 0) {
      setUserData((current) => current.filter((item) => item.id !== productId));
      return;
    }

    if (productQuantity > 0 && placeProduct) {
      const product = products.find((item) => item.id === productId);
      if (!product) return;

      setUserData((current) => {
        const alreadyInCart = current.some((item) => item.id === productId);
        if (alreadyInCart) {
          return current.map((item) =>
            item.id === productId
              ? { ...item, quantity: productQuantity }
              : item
          );
        }
        return [
          ...current,
          { ...product, quantity: productQuantity, discountPrice: discountPrice || 0 },
        ];
      });
    }
  }

  // Demo checkout only: it clears the browser cart but does not submit or save an order.
  function handleCheckout() {
    setUserData([]);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route
              path="/"
              element={<Layouts userData={userData} handleAddCart={handleAddCart} navlinks={navlinks} />}
            >
              <Route index element={<Home collectionData={collectionData} RealData={products} />} />
              <Route path="collection/:id" element={<Collection RealData={products} />} />
              <Route
                path="products/:coll/:ids"
                element={<Products handleAddCart={handleAddCart} userData={userData} RealData={products} />}
              />
            </Route>
            <Route path="/checkout" element={<Checkoutpage userData={userData} handleCheckout={handleCheckout} />} />
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
