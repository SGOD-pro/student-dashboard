"use client";
import React from "react";
import { Input } from "@/components/ui/input";

import {
	UserRoundPen,
	ImageUp,
	LoaderCircle,
	Check,
	LogOut,
	CloudUpload,
	UserRoundCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Image from "next/image";
import ShowDialog from "./ShowDialog";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const ProfileCard = () => {
	const router = useRouter();
	const student = useSelector((state: RootState) => state.student);
	const [disabled, setDisabled] = React.useState(false);
	const button = (): React.ReactNode => {
		return (
			<Button variant="outline" size="icon" disabled={!student}>
				<UserRoundCog className="w-4 h-4" />
			</Button>
		);
	};

	const { toast } = useToast();
	const logout = async () => {
		try {
			setDisabled(true);
			await fetch("/api/logout", {
				method: "POST",
			});
			router.push("/");
		} catch (error) {
			setDisabled(false);
			toast({
				description: "Something went wrong",
				variant: "destructive",
				action: <ToastAction altText="Try again">Try again</ToastAction>,
			});
		}
	};
	const [input1, setinput1] = React.useState<string>(student?.phoneNo[0]||"")
	const [input2, setinput2] = React.useState<string>(student?.phoneNo[1]||"")
	React.useEffect(() => {
		if (student?.phoneNo[0]) {
			setinput1(student?.phoneNo[0])
		}
		if (student?.phoneNo[0]) {
			setinput2(student?.phoneNo[1])
		}
	
	  return () => {
		
	  }
	}, [student])
	
	const update = () => {
		
		const phoneNumberRegex = /^\d{10}$/;
		const numbers = [];

		if (phoneNumberRegex.test(input1)) {
			numbers.push(input1);
		} else {
			toast({
				description: "Invalid credentials",
				variant: "default",
			});
			return;
		}

		if (phoneNumberRegex.test(input2)) {
			numbers.push(input2);
		} else {
			toast({
				description: "Invalid credentials",
				variant: "default",
			});
			return;
		}

		setDisabled(true);

		fetch("/api/update-details", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ numbers }),
		})
			.then((response) => response.json())
			.then((data) => {
				toast({
					description: "Updated",
					variant: "default",
				});
			})
			.catch((error) => {
				console.error("Error:", error);
				toast({
					description: "Something went wrong",
					variant: "destructive",
					action: <ToastAction altText="Try again">Try again</ToastAction>,
				});
			})
			.finally(() => {
				setDisabled(false);
			});
	};
	return (
		<div className="p-4 bg-slate-800 rounded-lg lg:rounded-2xl h-full flex items-center justify-between md:justify-start gap-4 sm:gap-10">
			<label
				htmlFor="image"
				className="relative cursor-pointer space-x-4 w-32 h-32 sm:w-52 sm:h-52 rounded-full border-4 p-1 border-gray-500"
			>
				<Image
					src={student?.picture || "/girl1.jpg"}
					alt="Profile"
					className="w-full h-full object-cover object-top rounded-full"
					width={800}
					height={800}
				/>
			</label>
			<div className="">
				<div className="mb-4">
					<div className=" flex items-center gap-2">
						<h2 className=" text-xl sm:text-3xl font-bold text-white">
							{student?.name}
						</h2>
						<ShowDialog button={button} title="More details">
							<div className="border-2 border-slate-700 w-24 h-24 rounded-full p-1 relative m-auto">
								<Image
									src={student?.picture || "/girl1.jpg"}
									alt="Profile"
									className="w-full h-full object-cover object-top rounded-full"
									width={300}
									height={300}
								/>
								<Input
									type="file"
									className="absolute invisible"
									id="image"
									name="image"
									accept="image/*"
								/>
								<label
									htmlFor="image"
									className="absolute right-1 bottom-1 z-10 rounded-full bg-stone-700 p-1 text-white grid place-content-center cursor-pointer"
								>
									<ImageUp className="h-4 w-4" />
								</label>
							</div>
							<div className=" space-y-1">
								<h2 className="text-xl font-semibold text-center my-2">
									{student?.name}
								</h2>
								<h2 className="font-bold mt-1">
									Admission no{":"} {student?.admissionNo}
								</h2>
								<p className=" font-bold">
									Subjects{":"} {student?.subjects}
								</p>
								<ul className=" list-inside list-decimal">
									<h3 className="font-bold">Timings{":"}</h3>
									{student?.presentByBatch.map((item,index) => (
										<li className="text-sm" key={index}>
											<span className="text-basic font-bold">
												{item.subject} {":"}
											</span>{" "}
											{item.timing}
										</li>
									))}
								</ul>
								<ul className=" list-inside list-disc">
									<h3 className="font-bold">Presents{":"}</h3>
									{student?.presentByBatch.map((item, index) => (
										<li className="text-sm" key={index}>
											<span className="text-basic font-bold">
												{item.subject} {":"}
											</span>{" "}
											{item.presents}
										</li>
									))}
								</ul>
								<div className="">
									<label htmlFor="phone1" className="text-xs pl-2">
										Phone1
									</label>
									<Input
										value={input1}
										id="phone1"
										type="text"
										max={10}
										className="bg-stone-900"
										onChange={(e)=>{setinput1(e.target.value)}}
									/>

									<label htmlFor="phone2" className="text-xs pl-2">
										Phone2
									</label>
									<Input
										value={input2}
										id="phone2"
										type="text"
										max={10}
										className="bg-stone-900"
										onChange={(e)=>{setinput2(e.target.value)}}
									/>
								</div>
								<div className="text-right">
									<Button
										className="bg-green-500 mr-1"
										size={"icon"}
										onClick={update}
										disabled={disabled}
									>
										{" "}
										<CloudUpload className="h-4 w-4 pointer-events-none" />
									</Button>
									<Button
										variant="destructive"
										size={"icon"}
										onClick={logout}
										disabled={disabled}
									>
										{" "}
										<LogOut className="h-4 w-4 pointer-events-none" />
									</Button>
								</div>
							</div>
						</ShowDialog>
					</div>
					<p className="text-gray-400 text-sm">{student?.subjects}</p>
				</div>
				<div className="text-gray-400">
					<label htmlFor="" className="text-xs pl-2">
						Phone1
					</label>
					<div className="relative">
						<Input value={student?.phoneNo[0]} type="text" max={10} readOnly />
					</div>
				</div>
				<div className="text-gray-400">
					<label htmlFor="" className="text-xs pl-2">
						Phone2
					</label>
					<div className="relative">
						<Input
							id=""
							type="text"
							maxLength={10}
							minLength={10}
							value={student?.phoneNo[1]}
							readOnly
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
