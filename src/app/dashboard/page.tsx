"use client";
import Presents from "../components/Presents";
import Profile from "../components/Profile";
import Payment from "../components/Payment";
import Assignment from "../components/Assignment";
import Exam from "../components/Exam";
import Performance from "../components/Performance";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
	setStudent,
	setAssignments,
	setFees,
	setExam,
	setAttendance,
} from "@/app/store/slices/Data";
import { useRouter } from "next/navigation";

export default function Home() {
	const { toast } = useToast();
	const dispatch = useDispatch();
	const router=useRouter();
	useEffect(() => {
		fetch("/api", {
			method: "get",
		})
			.then((response) => response.json())
			.then((data) => {
				dispatch(setStudent(data.data.student));
				dispatch(setAssignments(data.data.assignments || []));
				dispatch(setFees(data.data.fees || null));
				dispatch(setExam(data.data.exam || []));
				dispatch(setAttendance(data.data.attendence || null));
			})
			.catch((error) => {
				console.error("Error:", error);
				toast({
					description: "Something went wrong",
					variant: "destructive",
					action: <ToastAction altText="Try again">Try again</ToastAction>,
				});
				router.push('/')
			});

		return () => {};
	}, []);

	return (
		<main className="flex p-4 lg:p-6 max-w-screen w-screen lg:h-screen gap-4 lg:gap-6 flex-col lg:flex-row">
			<section className="md:w-full lg:w-[70%] grid grid-rows-[1fr,2fr] h-full gap-4 lg:gap-6 ">
				<div className=" flex lg:gap-6 gap-4 items-stretch flex-col md:flex-row">
					<section className="w-full md:w-[60%] min-w-64">
						<Profile />
					</section>
					<div className="w-full md:w-[40%] min-w-64">
						<Payment />
					</div>
				</div>
				<div className=" gap-4 lg:gap-6 flex flex-col md:flex-row">
					<section className="w-full md:w-1/2 h-full lg:max-h-[58vh] lg:min-w-64 scrollbar">
						<Assignment />
					</section>
					<section className="w-full md:w-1/2 h-full lg:max-h-[58vh] lg:min-w-64 scrollbar">
						<Performance />
					</section>
				</div>
			</section>
			<aside className="lg:w-[30%] h-full grid lg:grid-rows-[1.5fr,1.5fr] lg:grid-cols-1 grid-cols-1 md:grid-rows-1 sm:w-full  gap-4 lg:gap-6 lg:min-w-64 sm:grid-cols-2">
				<section className="h-fit md:h-[56vh]">
					<Presents />
				</section>
				<section className="h-fit max-h-[51.8vh] md:h-[34.4vh] rounded-lg lg:rounded-2x scrollbar overflow-auto bg-slate-800 p-4">
					<Exam />
				</section>
			</aside>
		</main>
	);
}
