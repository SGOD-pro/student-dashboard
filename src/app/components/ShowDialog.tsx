"use client"
import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
interface ShowDialogProps {
	button: () => React.ReactNode;
	children: React.ReactNode;
	title?: string;
}
function ShowDialog({ button, children, title }: ShowDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{button()}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{children}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default ShowDialog;
