import styleHeader from './header.module.css';
import dict from '../../assets/logo/dict-home.png';
import transparencySeal from '../../assets/logo/transparency-seal1.png';
import foi from '../../assets/logo/foi.png';
import bagongPilipinas from '../../assets/logo/bagong-pilipinas-dark.png';
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

export function Header() {
  return (
    <div className={styleHeader.mainContent}>
      {/* Horizontal Menu */}
      <div className={styleHeader.horizontalMenu}>
        <div className={styleHeader.imageContainer}>
          <img src={dict} alt="DICT" className={styleHeader.dict} />
        </div>

        <div className={styleHeader.rightSection}>
          {/* Contact Container */}
          <div className={styleHeader.contactContainer}>
            <ul>
              <li>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  style={{
                    color: 'rgba(13, 114, 185, 1)',
                    width: '1em',
                    height: '1em',
                    verticalAlign: 'middle',
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span>Trunkline: 8-920-0101</span>
              </li>
              <li>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  style={{
                    color: 'rgba(13, 114, 185, 1)',
                    width: '1em',
                    height: '1em',
                    verticalAlign: 'middle',
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>information@dict.gov.ph</span>
              </li>
            </ul>
          </div>

          {/* Logo Container */}
          <div className={styleHeader.logoContainer}>
            <img
              src={transparencySeal}
              alt="Transparency Seal"
              className={styleHeader.logo}
            />
            <img src={foi} alt="FOI" className={styleHeader.logo} />
            <img
              src={bagongPilipinas}
              alt="Bagong Pilipinas"
              className={styleHeader.logo}
            />
          </div>
        </div>

      </div>

      {/* Navigation Container */}
      <div className={styleHeader.navContainer}>
        <ul className={styleHeader.navList}>
          <li>
            <Link to="/home">HOME</Link>
          </li>
          <li>
            <a href="https://dict.gov.ph/pnpki">DCD</a>
          </li>
          <li>
            <a href="https://dict.gov.ph/cybersecurity">CIE-CSSD</a>
          </li>
          <li>
            <a href="https://www.ncert.gov.ph/">NCERT</a>
          </li>
          <li>
            <Link to="/request-form">REQUEST SPEAKER</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}