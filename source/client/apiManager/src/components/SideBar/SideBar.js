import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const SideBar = () => {
  return(
    <nav id="sidebar">
        <div className="sidebar-header">
          <h3>SoA Management</h3>
          <strong>BS</strong>
        </div>
        <ul className="list-unstyled components">
          <li className="active">
            <Link to="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
              <i className="fa fa-home" />
              Home
            </Link>
            <ul className="collapse list-unstyled" id="homeSubmenu">
              <li>
                <Link to="#">Home 1</Link>
              </li>
              <li>
                <Link to="#">Home 2</Link>
              </li>
              <li>
                <Link to="#">Home 3</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/admin/managementuser">
              <i className="fa fa-briefcase" />
              User Management
            </Link>
            <Link to="/admin/managementkey"  >
              <i className="fa fa-copy" />
              Key Management
            </Link>
          </li>
          <li>
            <Link to="/admin/managementmail">
              <i className="fa fa-image" />
              Mail Management
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-question" />
              FAQ
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-paper-plane" />
              Contact
            </Link>
          </li>
        </ul>
        {/* <ul className="list-unstyled CTAs">
          <li>
            <Link to="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Download source</Link>
          </li>
          <li>
            <Link to="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to article</Link>
          </li>
        </ul> */}
      </nav>
  )
}

export default SideBar