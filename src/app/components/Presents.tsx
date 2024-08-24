"use client";
import React from "react";
import Calendar from "@/components/ui/calendar";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
const Presents = () => {
	const attendence=useSelector((state:RootState)=>state.attendance)
	const dates=attendence?.createdAt.map((date:Date)=>new Date(date));
	return (
		<div className="h-fit">
			<Calendar mode="multiple" selected={dates} className="rounded-md block h-fit"/>
		</div>
	);
};

export default Presents;
