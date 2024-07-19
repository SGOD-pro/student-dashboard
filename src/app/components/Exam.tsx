"use client";
import { Link as LinkIcon } from "lucide-react";
import React from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import Empty from "./Empty";
const Exams = () => {
	const exam = useSelector((state: RootState) => state.exam);
	console.log(exam);
	return (
		<div className="p-4 bg-slate-800 rounded-lg lg:rounded-2xl text-white h-full">
			<h2 className="text-xl font-bold">Exam</h2>
			<Empty empty={exam && exam.length === 0}>
				<ul>
					{exam.map((item,index) => (
						<li key={index}>
							<a
								href="/"
								className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
								target="_blank"
							>
								<p className="flex gap-1">
									{item.subject}
									<LinkIcon />
								</p>
								<span>{item.date}</span>
							</a>
						</li>
					))}
				</ul>
			</Empty>
		</div>
	);
};

export default Exams;
