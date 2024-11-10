import Head from "next/head";
import ShortLinkList from "@/components/ShortLinkList";
import Button from "@/components/Button";
import Link from "@/components/Link";
import styles from "@/styles/ShortLinkListPage.module.css";
import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";
import axios from "@/lib/axios";
import { useState } from "react";

export async function getServerSideProps() {
  await dbConnect(); // Connection 만들고
  // 모델의 find함수로 도큐먼트들을 가져옴
  const shortLinks = await ShortLink.find();
  // 순수한 JSON 객체가 아닌 자바스크립트 객체
  return {
    props: {
      // 순수한 JSON 객체가 아닌 자바스크립트 객체라 JSON 객체로 변환 필요
      shortLinks: JSON.parse(JSON.stringify(shortLinks)),
    },
  };
}

export default function ShortLinkListPage({ shortLinks: initialShortLinks }) {
  const [shortLinks, setShortLinks] = useState(initialShortLinks);

  async function handleDelete(id) {
    // 삭제된 후 화면이 다시 렌더링되기 위해 props로 받는 shortLinks을 state값으로 받음
    await axios.delete(`/short-links/${id}`);
    setShortLinks((prevShortLinks) =>
      prevShortLinks.filter((shortLink) => shortLink._id !== id)
    );
  }

  return (
    <>
      <Head>
        <title>주소 줄이기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>주소 줄이기</h1>
          <Button as={Link} href="/short-links/new">
            새로 만들기
          </Button>
        </header>
        <ShortLinkList items={shortLinks} onDelete={handleDelete} />
      </div>
    </>
  );
}
