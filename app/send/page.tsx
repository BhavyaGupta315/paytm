import SendPageClient from "./SendPageClient";

type SendPageProps = Promise<{
      id: string;
      name: string;
}>

export default async function SendPage({ searchParams }: {searchParams : SendPageProps}) {
    const { id, name } = await searchParams;

    return <SendPageClient id={id} name={name} />;
}
