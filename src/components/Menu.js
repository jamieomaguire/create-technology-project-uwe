import React from 'react';
import { Link } from 'react-router';

import Style from 'style-it';

import FaPieChart from 'react-icons/lib/fa/pie-chart'
import FaAreaChart from 'react-icons/lib/fa/area-chart'
import MdSettings from 'react-icons/lib/md/settings'

const Menu = () => (
    <Style>
        {`
            .nav-container {
                box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                background-color: #b10dc9;
                color: #FFF;
            }
            .nav-list {
                margin: 0;
                padding: 0;
                list-style-type: none;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .nav-listItem {
                flex: 1;
            }
            .nav-link {
                text-decoration: none;
                color: #FFF;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 1em;
                font-family: sans-serif;
                transition: all 300ms ease-out;
            }
            .nav-link svg {
                height: 2em;
                width: 2em;
                margin-bottom: .2em;
                transition: all 300ms ease-out;
            }
            .nav-heading {
                margin: 0;
                font-weight: 100;
                font-size: .8em;
            }
            .nav-selected {
                background-color: #9800B0;
            }
            .nav-selected svg {
                transform: scale(1.2);
            }
        `}
        <nav className="nav-container">
            <ul className="nav-list">
                <li className="nav-listItem">
                    <Link to='/' activeClassName="nav-selected" className="nav-link">
                        <FaPieChart />
                        <h3 className="nav-heading">Today</h3>
                    </Link>
                </li>
                <li className="nav-listItem">
                    <Link to='/overview' activeClassName="nav-selected" className="nav-link">
                        <FaAreaChart />
                        <h3 className="nav-heading">Overview</h3>
                    </Link>
                </li>
                <li className="nav-listItem">
                    <Link to='/settings' activeClassName="nav-selected" className="nav-link">
                        <MdSettings />
                        <h3 className="nav-heading">Settings</h3>
                    </Link>
                </li>
            </ul>
        </nav>
    </Style>
)

export default Menu;