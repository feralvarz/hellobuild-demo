import React from "react";
import { CalendarEvents } from "../CalendarEvents/CalendarEvents";
import { Repositories } from "../Repositories/Repositories";

export const Profile: React.FC = (props: any) => {
  return (
    <>
      <h1>Profile component</h1>
      <Repositories />
      <CalendarEvents />
    </>
  );
};
