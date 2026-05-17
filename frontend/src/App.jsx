import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import Categories from "./components/Categories";
import TrendingProducts from "./components/TrendingProducts";
import Footer from "./components/Footer";

import CollectionBanner from "./components/CollectionBanner";
import Testimonials from "./components/Testimonials";
import CollectionQuote from "./components/CollectionQuote";
import PromoSection from "./components/PromoSection";
import StorySection from "./components/StorySection";
import ShowcaseSection from "./components/ShowcaseSection";
import BrandValuesSection from "./components/BrandValuesSection";
import NinthSection from "./components/NinthSection";

import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Faqs from "./pages/Faqs";

import ProtectedRoute from "./routes/ProtectedRoute";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <CollectionQuote />
      <Categories />
      <PromoSection />
      <StorySection />
      <ShowcaseSection />
      <BrandValuesSection />
      <NinthSection />
      <CollectionBanner />
      <Testimonials />
      <TrendingProducts />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/faqs" element={<Faqs />} />

      <Route path="/cart"     element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
    </Routes>
  );
}
