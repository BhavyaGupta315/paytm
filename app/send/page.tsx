import SendPageClient from "./SendPageClient";
import dbConnect from "@/utils/dbconnect";
import { User } from "@/models/Schemas";

export default async function SendPage({ searchParams }: { searchParams: { id?: string; name?: string } }) {
    const { id, name } = searchParams;

    if (!id || !name) {
        return <h1>Wrong URL</h1>;
    }

    await dbConnect();  
    console.log(id);
    const targetUser = await User.findById(id);

    if (!targetUser) {
        return <h1>Wrong URL - User not found</h1>;
    }

    return <SendPageClient id={id} name={name} />;
}
