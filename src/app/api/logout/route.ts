import { NextRequest,NextResponse } from "next/server";



export async function POST(req: NextRequest) {
	try {
		if (!req.cookies.get("id")) {
			return Response.json({ message: "User notlogin" }, { status: 409 });
		}
		const response = NextResponse.json(
			{ message: "Logout successfuly" },
			{ status: 200 }
		);
		response.cookies.set("id", "", {
			httpOnly: true,
			expires: new Date(0), // Set expiration to a past date
		});
		return response;
	} catch (error) {
		return Response.json({ message: error }, { status: 500 });
	}
}