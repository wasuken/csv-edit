import Link from "next/link";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <h2>
          <Link href="/">
            <a className="navbar-brand">csv-edit</a>
          </Link>
        </h2>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/about">
                <a className="nav-link active" aria-current="page">
                  About
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
