"use client";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import Empty from "./Empty";

const Assignments = () => {
	const assignment = useSelector((state: RootState) => state.assignments);

	return (
		<div className="">
			<h2 className="text-xl font-bold">Assignments</h2>
			<Empty empty={assignment&&assignment.length===0}>
				<ul className="w-full">
					{assignment?.map((item,index) => (
						<li className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60" key={index}>
							<Link href="/" className="flex gap-1">
								{item.subject||"empty"}
								<LinkIcon />
							</Link>
							<span>{item.submissionDate||"empty"}</span>
						</li>
					))}
					<li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li><li>
						<a
							href="/"
							className="textlg flex p-4 justify-between bg-slate-700/50 mt-2 shadow-sm shadow-black rounded-lg hover:bg-slate-700/60"
							target="_blank"
						>
							<p className="flex gap-1">
								Python
								<LinkIcon />
							</p>
							<span>1/4/2004</span>
						</a>
					</li>
				</ul>
			</Empty>
		</div>
	);
};

export default Assignments;
