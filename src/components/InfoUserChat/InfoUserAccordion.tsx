import { User } from "@/interfaces";
import moment from "moment";
import React from "react";

type InfoUserAccordionProps = Omit<User, "userId" | "keyword" | "photoURL">;

const InfoUserAccordion: React.FC<InfoUserAccordionProps> = ({
  displayName,
  time,
  address,
  description,
  email,
  phoneNumber,
  timeStartJoin,
  dateOfBirth,
}) => {
  const info = [
    {
      field: "Name",
      value: displayName,
    },
    {
      field: "Email",
      value: email,
    },
    {
      field: "Description",
      value: description,
    },
    {
      field: "Address",
      value: address,
    },
    {
      field: "Phone number",
      value: phoneNumber,
    },
    {
      field: "Date of birth",
      value: dateOfBirth,
    },
    {
      field: "Join",
      value: moment(timeStartJoin).calendar(),
    },
    {
      field: "Time",
      value: moment(time).format("lll"),
    },
  ];

  return (
    <div className="px-4 py-2">
      {info
        .filter((item) => item.value)
        .map((item, index) => (
          <div key={index} className="font-medium mb-2">
            <span className="text-main-200">{item.field}</span>
            <p className="break-words">{item.value}</p>
          </div>
        ))}
    </div>
  );
};

export default InfoUserAccordion;
