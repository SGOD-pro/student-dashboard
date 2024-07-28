"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

import { Loader } from "lucide-react";
import axios from "axios";
function Page() {
	const { toast } = useToast();
	const route = useRouter();
	const [input, setInput] = React.useState<string>();
	const [loading, setLoading] = React.useState<boolean>(false);
	const submit = (e: React.FocusEvent<HTMLFormElement>) => {
		e.preventDefault();
		const regex = /^CA-\d{2}\/\d{2}-\d+$/;
		if (input && !regex.test(input)) {
			toast({
				title: "Invalid admission no",
				action: <ToastAction altText="Try again">Try again</ToastAction>,
			});

			return;
		}
		setLoading(true);
		axios
			.post("/api/",{input})
			.then((data) => {
				route.push("/dashboard");
			})
			.catch((error) => {
				console.error("Error:", error);
				setLoading(false);
				toast({
					description: error.response.data.message||"Something went wrong",
					variant: "destructive",
					action: <ToastAction altText="Try again">Try again</ToastAction>,
				});
			});
	};
	return (
		<main className="w-screen h-screen relative flex items-center">
			<div className="lg:w-1/2 h-full w-full">
				<Image
					src="/background.jpeg"
					width={3000}
					height={3000}
					alt="Computer acadamy"
					className="w-full h-full object-cover lg:rounded-r-3xl"
				></Image>
			</div>
			<div className="lg:w-1/2 lg:relative lg:top-0 lg:left-0 lg:-translate-x-0 lg:-translate-y-0  absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] min-w-72 ">
				<form
					action=""
					className="p-3 max-w-80 m-auto border rounded-xl space-y-3 bg-slate-800/50 backdrop-blur-sm shadow-md shadow-black  w-full"
					onSubmit={submit}
				>
					<h3 className="text-center text-3xl font-bold">Login</h3>
					<div className="">
						<label htmlFor="accountNo" className="text-sm font-medium">
							Admission no
						</label>
						<Input
							type="text"
							min={10}
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
					</div>
					{!loading ? (
						<Button>Log in</Button>
					) : (
						<Button size="icon" disabled>
							<Loader className=" animate-spin duration-3000" />
						</Button>
					)}
				</form>
			</div>
		</main>
	);
}

export default Page;
