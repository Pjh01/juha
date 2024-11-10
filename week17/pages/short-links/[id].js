import Head from "next/head";
import ShortLinkForm, { ShortLinkFormType } from "@/components/ShortLinkForm";
import styles from "@/styles/ShortLinkEditPage.module.css";
import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id } = context.query;
  await dbConnect();
  const shortLink = await ShortLink.findById(id);
  if (shortLink) {
    return {
      props: {
        // 순수한 JSON 객체가 아닌 자바스크립트 객체라 JSON 객체로 변환 필요
        shortLink: JSON.parse(JSON.stringify(shortLink)),
      },
    };
  }

  return {
    notFound: true,
  };
}

export default function ShortLinkEditPage({ shortLink }) {
  const router = useRouter();
  const { id } = router.query;

  // 이 함수는 클라이언트 쪽에서 실행되는 코드라 데이터베이스에 바로 접근 불가 -> axios로 리퀘스트 전송
  async function handleSubmit(values) {
    await axios.patch(`/short-links/${id}`, values);
    router.push("/short-links/");
  }

  return (
    <>
      <Head>
        <title>주소 수정하기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>수정하기</h1>
        <ShortLinkForm
          type={ShortLinkFormType.Edit}
          initialValues={shortLink}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
