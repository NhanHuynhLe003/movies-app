import React from "react";
import Navbar from "../components/Navbar";
import footerCss from "../styles/footer.module.css";
import { Link, useParams } from "react-router-dom";
export default function MainLayout({ children, paramUrl }) {
  return (
    <div>
      <header>
        <Navbar navSelected={"movies"} param={paramUrl} />
      </header>
      <main>{children}</main>
      <footer className={footerCss.footer}>
        <div className={footerCss["footer-content"]}>
          <h3>Movie Center</h3>
          <p>Discover movies, watch trailers, and more</p>
          <ul className={footerCss["footer-links"]}>
            <li>
              <a href="#!">About</a>
            </li>
            <li>
              <a href="#!">Privacy</a>
            </li>
            <li>
              <a href="#!">Contact</a>
            </li>
          </ul>
        </div>
        <div className={footerCss["footer-bottom"]}>
          <p>
            &copy;{new Date().getFullYear()} MovieCenter, Inc. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
