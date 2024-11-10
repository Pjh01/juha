import Head from "next/head";
import QRCodeList from "@/components/QRCodeList";
import Button from "@/components/Button";
import Link from "@/components/Link";
import styles from "@/styles/QRCodeListPage.module.css";
import dbConnect from "@/db/dbConnect";
import QRCode from "@/db/models/QRCode";
import axios from "@/lib/axios";
import { useState } from "react";

export async function getServerSideProps() {
  await dbConnect(); // Connection 만들고
  // 모델의 find함수로 도큐먼트들을 가져옴
  const qrCodes = await QRCode.find();
  // 순수한 JSON 객체가 아닌 자바스크립트 객체
  return {
    props: {
      // 순수한 JSON 객체가 아닌 자바스크립트 객체라 JSON 객체로 변환 필요
      qrCodes: JSON.parse(JSON.stringify(qrCodes)),
    },
  };
}

export default function QRCodeListPage({ qrCodes: initialQrCodes }) {
  const [qrCodes, setQrCodes] = useState(initialQrCodes);

  async function handleDelete(id) {
    // 삭제된 후 화면이 다시 렌더링되기 위해 props로 받는 shortLinks을 state값으로 받음
    await axios.delete(`/qrcodes/${id}`);
    setQrCodes((prevQrCodes) =>
      prevQrCodes.filter((qrCode) => qrCode._id !== id)
    );
  }

  return (
    <>
      <Head>
        <title>QRCode 만들기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>QRCode 만들기</h1>
          <Button as={Link} href="/qrcodes/new">
            새로 만들기
          </Button>
        </header>
        <QRCodeList items={qrCodes} onDelete={handleDelete} />
      </div>
    </>
  );
}
