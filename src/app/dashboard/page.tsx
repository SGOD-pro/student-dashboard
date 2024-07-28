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
		<main className="flex p-4 xl:p-6 max-w-screen w-screen xl:h-screen gap-4 xl:gap-6 flex-col xl:flex-row">
			<section className="lg:w-full xl:w-[70%] grid grid-rows-[1fr,2fr] h-full gap-4 xl:gap-6 ">
				<div className=" flex xl:gap-6 gap-4 items-stretch flex-col lg:flex-row">
					<section className="w-full lg:w-[60%] min-w-64">
						<Profile />
					</section>
					<div className="w-full lg:w-[40%] min-w-64">
						<Payment />
					</div>
				</div>
				<div className=" gap-4 xl:gap-6 flex flex-col lg:flex-row">
					<section className="w-full lg:w-1/2 h-full xl:max-h-[58vh] xl:min-w-64 scrollbar">
						<Assignment />
					</section>
					<section className="w-full lg:w-1/2 h-full xl:max-h-[58vh] xl:min-w-64 scrollbar">
						<Performance />
					</section>
				</div>
			</section>
			<aside className="xl:w-[30%] h-full grid xl:grid-rows-[1.5fr,1.5fr] xl:grid-cols-1 grid-cols-1 lg:grid-rows-1 md:w-full  gap-4 xl:gap-6 xl:min-w-64 md:grid-cols-2">
				<section className="">
					<Presents />
				</section>
				<section className="h-fit min-h-full md:h-max lg:h-[34.4vh] rounded-lg xl:rounded-2x scrollbar overflow-auto bg-slate-800 p-4">
					<Exam />
				</section>
			</aside>
		</main>
	);
}
