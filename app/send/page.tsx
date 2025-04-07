import SendPageClient from "./SendPageClient";

interface SendPageProps {
    searchParams: {
      id: string;
      name: string;
    };
  }

export default function SendPage({ searchParams }: SendPageProps) {
    const { id, name } = searchParams;

    return <SendPageClient id={id} name={name} />;
}
