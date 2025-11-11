"use client";

import { Container} from "react-bootstrap";
import { setHeaderData } from "../utlis/redux/slices/headerSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Logo from "@/assets/images/maia.png";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderData({ title: "Home", subtitle: "Welcome to Maiacare" }));
  }, [dispatch]); // ✅ Run once after initial render
  // dispatch(setHeaderData({ title: "Home", subtitle: "Welcome to Maiacare" }));

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img src={Logo.src} alt="logo" />
      </div>
    </Container>
  );
}
