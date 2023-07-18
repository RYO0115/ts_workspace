import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

import styles from "./index.module.css";

type Props = {
  initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({initialImageUrl}) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImage().then((newImage) => {
        setImageUrl(newImage.url);
        setLoading(false);
    });
  }, []);
  // Reload ボタン作成
  const handleClick = async () => {
    setLoading(true); // 読込中フラグを立てる
    const newImage = await fetchImage();
    setImageUrl(newImage.url); // 画像URLの状態を更新する
    setLoading(false); // 読込中フラグを倒す
  };
  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>
        One more cat!
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.img} />}
      </div>
    </div>
  );

  return <div>{loading || <img src={imageUrl} />}</div>;
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return{
    props: {
      initialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images: unknown = await res.json();



  // 配列として表現されているか？
  if (!Array.isArray(images)) {
    throw new Error("猫の画像が取得できませんでした");
  }
  const image: unknown = images[0];
  // Imageの構造をなしているか？
  if (!isImage(image)) {
    throw new Error("猫の画像が取得できませんでした");
  }
  return image;
};
 
// 型ガード関数
const isImage = (value: unknown): value is Image => {
  // 値がオブジェクトなのか？
  if (!value || typeof value !== "object") {
    return false;
  }
  // urlプロパティが存在し、かつ、それが文字列なのか？
  return "url" in value && typeof value.url === "string";
};

fetchImage();