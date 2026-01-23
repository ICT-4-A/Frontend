import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './gallery.module.css';
import { galleryItems } from './GalleryData';
import { totalmem } from 'os';
import axios from 'axios';

interface GalleryVO{
  NUM: number;
  TITLE: string;
  WRITER: string;
  CONTENTS: string;
  REIP?: string;
  HIT?: number;
  GDATE: string;
  IMAGENAME: string;
}

const Gallery: React.FC = () => {
  const [gallerylist, setGalleryList] = useState<GalleryVO[]>([]);
  const[totalItems,setTotalItems] = useState(0);
  const[totalPage,setTotalPage] = useState(0);
  const[startPage,setStartPage] = useState(0);
  const[currenetPage,setCurrenetPage] = useState(1);
  const[endPage,setEndPage] = useState(1);

  const[searchType,setSrarchType] = useState('1');
  const[searchValue,setSearchValue] = useState('');
 const imageBasePath = `${process.env.REACT_APP_BACK_END_URL}/imgfile/gallery/`;

  const fetchGalleryList = async (page: number) => {

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/gallery/galleryList`,{
        params:{cPage:page, searchType: searchType ,searchValue : searchValue}
      });
      setGalleryList(response.data.data);
      setTotalItems(response.data.totalItems);
      setTotalPage(response.data.totalPage);
      setStartPage(response.data.startPage);
      setCurrenetPage(response.data.currenetPage);
      setEndPage(response.data.endPage);
    } catch (error) {
      console.log('데이터 가져오기 실패' + error);
    }
    
  }
  useEffect(()=>{
      fetchGalleryList(currenetPage);
    },[currenetPage]);

    const pageChange = (page: number)=> {
      setCurrenetPage(page);
    }
    const searchFunction = () => {
      fetchGalleryList(1);
    }
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>갤러리</h2>
      <div style={{ textAlign: 'right', marginBottom: '15px' }}>
        <Link to="/gallery/write" className={styles.button}>이미지 추가</Link>
      </div>

      <div className={styles.grid}>
        {gallerylist.map(item => (
          <Link to={`/gallery/gdetail/${item.NUM}`} key={item.NUM} style={{ textDecoration: 'none' }}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>{item.NUM}</div>
              <img src={imageBasePath + item.IMAGENAME} alt={item.TITLE} />
              <div className={styles.cardTitle}>{item.TITLE}</div>
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
};

export default Gallery;