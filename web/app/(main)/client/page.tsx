import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import StreamView from "@/components/StreamView";

// const creatorId = "3ce10574-0396-43ac-8274-02882cde607b";

export default async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const creatorId = session?.user?.id || "";

  return <StreamView creatorId={creatorId} playVideo={true} />;
}
