// This is an example of how to access a session from an API route
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  res.send(JSON.stringify(session, null, 2));
}
