"use client";
import React from "react";
import Calendar from "@/components/ui/calendar";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
const Presents = () => {
	const attendence=useSelector((state:RootState)=>state.attendance)
	const dates=attendence?.createdAt.map((date:Date)=>new Date(date));
	return (
		<div className="p-0 lg:p-4 bg-slate-800 rounded-lg lg:rounded-2xl text-white w-full h-full">
			<Calendar mode="multiple" selected={dates} className="rounded-md block"/>
		</div>
	);
};

export default Presents;
