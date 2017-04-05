// The Settings component is currently just a proof of concept. It does not have any functionality.
// If the project were to be extended, it would allow people to customise their application's colour scheme based on their visual needs such as colour blindness.
import React from 'react';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import FaLock from 'react-icons/lib/fa/lock';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import MdColorLens from 'react-icons/lib/md/color-lens';
import FaQuestionCircle from 'react-icons/lib/fa/question-circle';


import Style from 'style-it';

const Settings = () => (
  <Style>
    {`
      .settingsContainer {
        border: 1px solid #ccc;
        border-radius: .5em;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        background-color: #ffffff;
      }
      .settingsHeading {
        text-align: center;
        font-family: sans-serif;
        font-weight: 100;
        color: #4a4a4a;
      }
      .settingsList {
        margin: 0;
        padding: 0;
        list-style-type: none;
      }
      .settingsListItem {
        padding: .5em 1em;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .settingsListItem svg {
        margin-right: 1em;
        height: 1.5em;
        width: 1.5em;
        color: #4a4a4a;
      }
      .settingsListItem span {
        color: #5b5c5c;
        font-family: sans-serif;
      }
      .settingsListItem:first-of-type {
        border-top: 1px solid #ccc;
      }
      .settingsListItem:last-of-type {
        border: 0;
      }
    `}
    <div className="settingsContainer">
      <h1 className="settingsHeading">Settings</h1>
      <ul className="settingsList">
        <li className="settingsListItem">
          <MdColorLens />
          <span>Color-blindness options</span>
        </li>
        <li className="settingsListItem">
          <FaEnvelope />
          <span>Change email address</span>
        </li>
        <li className="settingsListItem">
          <FaLock />
          <span>Change password</span>
        </li>
        <li className="settingsListItem">
          <FaSignOut />
          <span>Sign out</span>
        </li>
        <li className="settingsListItem">
         <FaQuestionCircle />
         <span>Help</span>
        </li>
      </ul>
    </div>
  </Style>
)

export default Settings;
