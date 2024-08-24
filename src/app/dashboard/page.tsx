"use client";
const Presents = lazy(() => import("../components/Presents"));
const Profile = lazy(() => import("../components/Profile"));
const Payment = lazy(() => import("../components/Payment"));
const Assignment = lazy(() => import("../components/Assignment"));
const Exam = lazy(() => import("../components/Exam"));
const Performance = lazy(() => import("../components/Performance"));
import { lazy, useEffect, Suspense } from "react";
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
import LazyLoading from "../components/LazyLoading";

export default function Home() {
	const { toast } = useToast();
	const dispatch = useDispatch();
	const router = useRouter();
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
				router.push("/");
			});

		return () => {};
	}, []);

	return (
		<main className=" lg:grid lg:grid-cols-[2fr,1fr] h-[100dvh] scrollbar-hidden gap-4 p-4 ">
			<section className="sm:h-[100dvh] grid md:grid-rows-[1fr,1.8fr] overflow-auto scrollbar-hidden gap-4 ">
				<div className="grid md:grid-cols-[1.5fr,1fr] gap-4">
					<div className="p-4 bg-slate-800/50 rounded-lg shadow-md  shadow-black">
						<Suspense fallback={<LazyLoading />}>
							<Profile />
						</Suspense>
					</div>
					<div className="p-4 bg-slate-800/50 rounded-lg shadow-md  shadow-black">
						<Suspense fallback={<LazyLoading />}>
							<Payment />
						</Suspense>
					</div>
				</div>
				<div className="space-y-4 sm:space-y-0 md:grid md:grid-cols-2 overflow-auto h-[100vh] md:h-auto gap-4">
					<div className="overflow-auto h-[48%] md:h-auto scrollbar p-4 bg-slate-800/50 rounded-lg shadow-md  shadow-black">
						<Suspense fallback={<LazyLoading />}>
							<Assignment />
						</Suspense>
					</div>
					<div className="overflow-auto h-[48%] md:h-auto scrollbar p-4 bg-slate-800/50 rounded-lg shadow-md  shadow-black">
						<Suspense fallback={<LazyLoading />}>
							<Performance />
						</Suspense>
					</div>
				</div>
			</section>

			<section className="lg:mt-0 md:mt-4 grid sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[1.5fr,1fr] overflow-auto max-h-[100dvh] gap-4 lg:mt-0">
				<div className="bg-slate800/40 overflow-auto scrollbar max-h-[50dvh] lg:max-h-fit p-4 bg-slate-800/50 rounded-lg shadow-md  shadow-black">
					<Suspense fallback={<LazyLoading />}>
						<Presents />
					</Suspense>
				</div>
				<div className="bg-slate800/40 overflow-auto scrollbar max-h-[50dvh] lg:max-h-fit p-4 bg-slate-800/50 rounded-lg shadow-md  shadow-black">
					<Suspense fallback={<LazyLoading />}>
						<Exam />
					</Suspense>
				</div>
			</section>
		</main>
	);
}
{
	/* <Suspense fallback={<LazyLoading />}>
							<Profile />
						</Suspense>
						<Suspense fallback={<LazyLoading />}>
							<Payment />
						</Suspense>
						<Suspense fallback={<LazyLoading />}>
							<Assignment />
						</Suspense>
						<Suspense fallback={<LazyLoading />}>
							<Performance />
						</Suspense>
						<Suspense fallback={<LazyLoading />}>
						<Presents />
					</Suspense>
					<Suspense fallback={<LazyLoading />}>
						<Exam />
					</Suspense> */
}
