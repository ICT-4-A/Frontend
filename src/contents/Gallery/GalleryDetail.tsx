//GalleryDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './gallery.module.css';
import { galleryItems } from './GalleryData';
import axios from 'axios';

interface galleryItem{
  num:number;
  title: string;
  contents: string;
  writer: string;
  reip: string;
  hit: number;
  gdate: string;
  getimglist: string[] | null;
}

const GalleryDetail: React.FC = () => {
  const {num} = useParams<{num:string}>();
  const[item, setItem] = useState<galleryItem | null>(null);
  const [loding, setLoading] =useState(true);

  useEffect(()=>{
    const fetchData = async () => {
      if (!num){
        console.log("num 파라미터가 없습니다.");
        setLoading(false);
        return;
      }
      try {
        const url = `${process.env.REACT_APP_BACK_END_URL}/gallery/gdetail`
        const response = await axios.get(url,{
          params:{num: parseInt(num)}
        });
        console.log(response.data);
        setItem(response.data);
      } catch (error) {
        console.error("데이터 요청 실패", error);
      }finally{
        setLoading(false);
      }
  };
  fetchData();
},[num]);

if(loding) return <p>로딩중...</p>;
if(!item) return <p>이미지를 찾을 수 없습니다.</p>

   return (
     <div className={styles.container}>
      <h2 className={styles.title}>{item.title}</h2>
      <div className={styles.detail}>
        <p><strong>작성자:{item.writer}</strong></p>
        <p><strong>내용:{item.contents}</strong></p>
        <p><strong>작성일: {item.gdate}</strong></p>
        <p><strong>조회수:{item.hit}</strong></p>
       <div className={styles.imageBOx}>
        {item.getimglist && item.getimglist.length > 0 ? (
          item.getimglist.map((img, idx) =>(
            <img key={idx} src={`${process.env.REACT_APP_BACK_END_URL}/imgfile/gallery/${img}`}
            alt={`img-${idx}`} className={styles.imge}/>
          ))
        ): (
          <p>이미지가 없습니다.</p>
        )}
       </div>
      </div>
    </div>
   );
};
export default GalleryDetail;
