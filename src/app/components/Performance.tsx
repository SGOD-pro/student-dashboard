"use client";
import React, { lazy, Suspense } from "react";
const ChartBar = lazy(() => import("./ChartBar"));
import Link from "next/link";
import Empty from "./Empty";
import LazyLoading from "./LazyLoading";
LazyLoading;
const Performance = () => {
	return (
		<div className="">
			<h2 className="text-xl font-bold">Performance</h2>
			<Empty empty={false}>
				<>
					<div className="w-3/4 m-auto relative">
						<Suspense fallback={<LazyLoading />}>
							<ChartBar />
						</Suspense>
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
