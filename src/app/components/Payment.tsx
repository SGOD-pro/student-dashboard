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
import { Loader } from "lucide-react";
import { monthsDifference, parseDateDMY } from "@/app/helper/DateTime";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Empty from "./Empty";
interface TableRecord {
	paidMonth: string;
	month: string;
	time: string;
}
const PaymentInfo = () => {
	const [record, setRecord] = React.useState<TableRecord[]>([]);
	const { toast } = useToast();
	const differnce = React.useRef<string | undefined | Date>("");
	const student = useSelector((state: RootState) => state.student);
	const Fees = useSelector((state: RootState) => state.fees);

	differnce.current = Fees?.paidMonth ? Fees.paidMonth : student?.admissionDate;
	differnce.current = parseDateDMY(differnce.current);
	console.log("difference.current:", differnce.current);
	const [loading, setLoading] = React.useState(false);

	const fetchFeesRecord = async () => {
		if (record.length > 0) {
			return;
		}
		setLoading(true);
		await fetch("api/payment", { method: "GET" })
			.then((response) => response.json())
			.then((responseData) => {
				setRecord(responseData.data);
			})
			.catch((error) => {
				toast({
					title: "Invalid admission no",
					variant: "destructive",
					action: <ToastAction altText="Try again">Try again</ToastAction>,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const button = (): React.ReactNode => {
		return (
			<Button
				variant="outline"
				size="icon"
				onClick={fetchFeesRecord}
				disabled={!student}
			>
				<Scan className="h-4 w-4" />
			</Button>
		);
	};

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
			<p className="text-rose-600 font-bold">
				DUE:{" "}
				{differnce.current &&
					student?.fees &&
					monthsDifference(new Date(differnce.current), new Date()) *
						student.fees}
			</p>
			<div className="text-right">
				<ShowDialog button={button} title="Your payment details">
					<div className="border rounded-md mt-3">
						<Empty empty={record.length === 0}>
							<Table className="">
								<TableHeader>
									<TableRow>
										<TableHead className=" font-semibold">Month</TableHead>
										<TableHead className="capitalize text-center font-semibold">
											date
										</TableHead>
										<TableHead className="text-right capitalize font-semibold">
											time
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{loading ? (
										<TableRow className="text-center">
											<TableCell colSpan={3}>
												<Loader className="animate-spin duration-1000 m-auto" />
											</TableCell>
										</TableRow>
									) : (
										<>
											{record.map((item) => (
												<TableRow>
													<TableCell className="font-medium">
														{item.paidMonth}
													</TableCell>
													<TableCell className="text-center">
														{item.month}
													</TableCell>
													<TableCell className="text-right">
														{item.time}
													</TableCell>
												</TableRow>
											))}
										</>
									)}
								</TableBody>
							</Table>
						</Empty>
					</div>
				</ShowDialog>
			</div>
		</div>
	);
};

export default PaymentInfo;
