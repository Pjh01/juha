import Head from "next/head";
import QRCodeForm, { QRCodeFormType } from "@/components/QRCodeForm";
import styles from "@/styles/QRCodeEditPage.module.css";
import dbConnect from "@/db/dbConnect";
import QRCode from "@/db/models/QRCode";
import { useRouter } from "next/router";
import axios from "@/lib/axios";

export async function getServerSideProps(context) {
  const { id } = context.query;
  await dbConnect();
  const qrcode = await QRCode.findById(id);
  if (qrcode) {
    return {
      props: {
        // 순수한 JSON 객체가 아닌 자바스크립트 객체라 JSON 객체로 변환 필요
        qrcode: JSON.parse(JSON.stringify(qrcode)),
      },
    };
  }

  return {
    notFound: true,
  };
}

export default function QRCodeEditPage({ qrcode }) {
  const router = useRouter();
  const { id } = router.query;

  // 이 함수는 클라이언트 쪽에서 실행되는 코드라 데이터베이스에 바로 접근 불가 -> axios로 리퀘스트 전송
  async function handleSubmit(values) {
    await axios.patch(`/qrcodes/${id}`, values);
    router.push("/qrcodes/");
  }

  return (
    <>
      <Head>
        <title>QRCode 수정하기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>QRCode 수정하기</h1>
        <QRCodeForm
          type={QRCodeFormType.Edit}
          initialValues={qrcode}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
