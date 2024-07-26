"use  client"
import React from "react";
function Empty({
	children,
	empty,
}: {
	children: React.ReactNode;
	empty: boolean;
}) {
	return (
		<div className="relative w-full h-[90%] mt-3">
			{empty ? (
				<h2 className="opacity-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					Nothing to show
				</h2>
			) : (
				children
			)}
		</div>
	);
}

export default Empty;
