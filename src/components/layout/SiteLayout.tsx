"use client";
import React, { useEffect, useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineMenu,
} from "react-icons/hi";
import {
  MdWindow,
  MdSettings,
  MdOutlineCalendarToday,
  MdOutlineLogout,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { BsPeople } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { RiChat3Line, RiNotificationLine } from "react-icons/ri";
import { IoBagAddOutline } from "react-icons/io5";
import Logo from "../../assets/images/logo.png";
import Maia from "../../assets/images/maia.png";
import UserProfileIcon from "../../assets/images/user-icon.png";
import { useSelector } from "react-redux";
import { RootState } from "../../utlis/redux/store";
import { PiStethoscopeBold } from "react-icons/pi";
import { LuScrollText } from "react-icons/lu";
import "../../style/siteLayout.css";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { ClearData } from "@/utlis/Helper";
import { setToken } from "@/utlis/redux/slices/tokenSlice";
import { logout } from "@/utlis/apis/apiHelper";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const SiteLayout = ({ collapsed, setCollapsed, children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const navRef = useRef<HTMLDivElement | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // const headerValue = useSelector((state: RootState) => state.header.value);
  const { title, subtitle, image } = useSelector(
    (state: RootState) => state.header
  );
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: <MdWindow size={22} /> },

    {
      label: "Doctors",
      href: "/doctors",
      icon: <PiStethoscopeBold size={22} />,
    },
    { label: "Patients", href: "/patients", icon: <BsPeople size={22} /> },
    {
      label: "Appointments",
      href: "/appointments",
      icon: <MdOutlineCalendarToday size={22} />,
    },
    {
      label: "Treatment ",
      href: "/treatment",
      icon: <IoBagAddOutline size={22} />,
    },
    {
      label: "Invoice",
      href: "/invoice",
      icon: <LuScrollText size={22} />,
    },

    { label: "Settings", href: "/settings", icon: <MdSettings size={22} /> },
  ];
  console.log("Header subtitle:", subtitle);

  const handleScrollDown = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };

  // const handleLogout = () => {
  //   logout()
  //     .then(() => {
  //       ClearData();
  //       toast.success("Logout successfully");
  //       localStorage.clear();
  //       dispatch(setToken(""));
  //       router.push("/login");
  //     })
  //     .catch(() => {
  //       toast.error("Logout failed");
  //     });
  // };
  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Token already expired → ignore
    } finally {
      ClearData();
      localStorage.clear();
      toast.success("Logged out");
      router.replace("/login");
    }
  };
  return (
    <div className="layout">
      {/* ====== DESKTOP SIDEBAR ====== */}
      <aside
        className={`sidebar desktop-sidebar ${
          collapsed ? "sidebar--collapsed" : "sidebar--expanded"
        }`}
      >
        <button
          type="button"
          className="sidebar__toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <HiOutlineChevronDoubleRight />
          ) : (
            <HiOutlineChevronDoubleLeft />
          )}
        </button>

        <div className="sidebar__top">
          <Link href="/" className="sidebar__logo-link">
            {collapsed ? (
              <img
                src={Logo.src}
                alt="Collapsed Logo"
                className="sidebar__logo"
              />
            ) : (
              <img
                src={Maia.src}
                alt="Expanded Logo"
                className="sidebar__logo"
              />
            )}
          </Link>
          <hr className="sidebar__divider" />
          <Nav className="sidebar__nav" ref={navRef}>
            {navItems.map((item, i) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href + i}
                  href={item.href}
                  className={`sidebar__nav-item ${isActive ? "is-active" : ""}`}
                >
                  <span className="sidebar__icon">{item.icon}</span>
                  <span className="sidebar__text">{item.label}</span>
                </Link>
              );
            })}
          </Nav>
        </div>
        {/* <div
          className="sidebar__nav-item d-flex align-items-center justify-content-center mb-2"
          onClick={handleLogout}
        >
          <MdOutlineLogout size={20} />
        </div> */}
        <div className="sidebar__bottom">
          <div
            role="button"
            className="sidebar__collapse"
            onClick={handleScrollDown}
          >
            <FaChevronDown size={20} />
          </div>
          <div className="sidebar__user cursor-pointer">
            <img
              src={UserProfileIcon.src}
              alt="User"
              className="sidebar__user-avatar"
              onClick={() => router.push("/profile")}
            />
            <span className="sidebar__text">John Doe</span>
          </div>
        </div>
      </aside>

      {/* ====== OFFCANVAS SIDEBAR (MOBILE/TABLET) ====== */}
      <div
        className={`offcanvas-backdrop ${showOffcanvas ? "show" : ""}`}
        onClick={() => setShowOffcanvas(false)}
      ></div>
      <aside
        className={`sidebar offcanvas-sidebar ${showOffcanvas ? "open" : ""}`}
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="sidebar__toggle"
            onClick={() => setShowOffcanvas(false)}
          >
            <HiOutlineChevronDoubleLeft size={18} />
          </button>
        </div>
        <div className="sidebar__top">
          <Link
            href="/"
            className="sidebar__logo-link"
            onClick={() => setShowOffcanvas(false)}
          >
            <img src={Maia.src} alt="Expanded Logo" className="sidebar__logo" />
          </Link>
          <hr className="sidebar__divider" />
          <Nav className="sidebar__nav">
            {navItems.map((item, i) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href + i}
                  href={item.href}
                  className={`sidebar__nav-item ${isActive ? "is-active" : ""}`}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <span className="sidebar__icon">{item.icon}</span>
                  <span className="sidebar__text">{item.label}</span>
                </Link>
              );
            })}
          </Nav>
        </div>
        {/* <div
          className="sidebar__nav-item d-flex align-items-center justify-content-start mb-2"
          onClick={handleLogout}
        >
          <MdOutlineLogout size={20} />
          <span className="sidebar__text">Logout</span>
        </div> */}
        <div className="sidebar__bottom">
          <div
            role="button"
            className="sidebar__collapse"
            onClick={handleScrollDown}
          >
            <FaChevronDown size={20} />
          </div>
          <div
            className="sidebar__user cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            <img
              src={UserProfileIcon.src}
              alt="User"
              className="sidebar__user-avatar"
            />
            <span className="sidebar__text">John Doe</span>
          </div>
        </div>
      </aside>

      <main className="layout__content">
        <header className="layout__header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            {/* ☰ menu button visible only on mobile/tablet */}
            <button
              className="mobile-menu-btn"
              onClick={() => setShowOffcanvas(true)}
            >
              <HiOutlineChevronDoubleRight size={18} />
            </button>
            {/* back button */}
            {image && (
              <img
                src={typeof image === "string" ? image : image.src}
                alt="Header"
                className="header-image-wrapper"
                onClick={() => router.back()}
              />
            )}
            {/* <div>
              <h2 className="layout__title">{title}</h2>
              <h4 className="layout__subtitle mt-1">{subtitle}</h4>
            </div> */}
            <div>
              <h2 className="layout__title">{title}</h2>

              {typeof subtitle === "string" ? (
                <span className="layout__subtitle">{subtitle}</span>
              ) : (
                <div className="header__breadcrumb">
                  <span className="header__text__left">{subtitle.left}</span>

                  {subtitle.image && (
                    <img
                      src={
                        typeof subtitle.image === "string"
                          ? subtitle.image
                          : subtitle.image.src
                      }
                      alt="arrow"
                      className="header-subtitle-image"
                    />
                  )}

                  <span className="header__text__right">{subtitle.right}</span>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            {/* Notification */}
            <Link
              href="/notifications"
              className={`header-icon-container ${
                pathname === "/notifications" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              <RiNotificationLine size={18} />
            </Link>
            {/* logout */}
            <Button
              className="sidebar__nav-item text-white d-flex align-items-center justify-content-center consultation-button "
              onClick={handleLogout}
            >
              <MdOutlineLogout size={20} />
              Logout
            </Button>
           
          </div>
        </header>
        <div className="layout__body">{children}</div>
      </main>
    </div>
  );
};

export default SiteLayout;
