import React from "react";
import { BiCopyright } from "react-icons/bi";
const Footer = () => {
  return (
    <div className="flex justify-center">
      <h3 className="flex font-bold text-gray-600 my-2">
        <span className="text-blue-500 text-xl mr-1 pt-0.5 ">
          <BiCopyright />
        </span>
        2023 Ariful Islam.All Rights Reserved.
      </h3>
    </div>
  );
};

export default Footer;
