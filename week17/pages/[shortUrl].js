import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";

export async function getServerSideProps(context) {
  const { shortUrl } = context.query;
  await dbConnect();
  const shortLink = await ShortLink.findOne({ shortUrl });

  // 해당 페이지있으면 그 페이지로 리다이렉트
  if (shortLink) {
    return {
      redirect: {
        destination: shortLink.url,
        permanent: false,
      },
    };
  }

  // 해당 페이지 없으면 404페이지로
  return {
    notFound: true,
  };
}

export default function ShortUrlPage() {
  return null;
}
