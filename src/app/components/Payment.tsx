"use client";
import React from "react";
import { Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import ShowDialog from "./ShowDialog";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const PaymentInfo = () => {
	const button = (): React.ReactNode => {
		return (
			<Button variant="outline" size="icon">
				<Scan className="h-4 w-4" />
			</Button>
		);
	};
	const student = useSelector((state: RootState) => state.student);
	const Fees = useSelector((state: RootState) => state.fees);
	return (
		<div className="p-4 bg-slate-800 rounded-lg lg:rounded-2xl text-white h-full space-y-3">
			<h2 className="text-4xl font-bold">Fees:- {student?.fees}</h2>
			{Fees?.paidMonth ? (
				<>
					<p className="">Last Paid: {Fees.createdAt}</p>
					<p className="">Month Paid: {Fees.paidMonth}</p>
				</>
			) : (
				<p className="">Admission Date: {student?.admissionDate}</p>
			)}
			<p className="text-rose-600 font-bold">DUE: $1800</p>
			<div className="text-right">
				<ShowDialog button={button} title="Your payment details">
					<div className="border rounded-md mt-3">
						<Table className="">
							<TableHeader>
								<TableRow>
									<TableHead className=" font-semibold">Month</TableHead>
									<TableHead className="capitalize font-semibold">paying date</TableHead>
									<TableHead className="text-right capitalize font-semibold">Amount</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell className="font-medium">INV001</TableCell>
									<TableCell>Credit Card</TableCell>
									<TableCell className="text-right">$250.00</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</ShowDialog>
			</div>
		</div>
	);
};

export default PaymentInfo;
