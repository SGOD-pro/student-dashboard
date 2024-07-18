"use client"
import React from "react";
import ChartBar from "./ChartBar";
import Link from "next/link";
import Empty from "./Empty";

const Performance = () => {
	return (
		<div className="p-4 bg-slate-800 rounded-lg lg:rounded-2xl text-white h-full overflow-auto scrollbar">
			<h2 className="text-xl font-bold">Performance</h2>
			<Empty empty={true}>
				<>
					<div className="w-3/4 m-auto">
						<ChartBar />
					</div>
					<ul>
						<li className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60">
							<Link href="/">C++</Link>
							<span>69</span>
						</li>
						<li className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60">
							<Link href="/">Python</Link>
							<span>69</span>
						</li>
						<li className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60">
							<Link href="/">Java</Link>
							<span>69</span>
						</li>
					</ul>
				</>
			</Empty>
		</div>
	);
};

export default Performance;
