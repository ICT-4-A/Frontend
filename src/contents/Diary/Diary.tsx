import React from 'react'
import HTMLFlipBook from 'react-pageflip';

interface MyBookProps {
    //책디자인의 너비와 높이 (필수)
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string; //우리가 만들 클래스 속성 적용
    //showCover 가 true이면 첫번째 페이지를 표지로 사용하겠다 
    showCover?: boolean;
    autoSize?: boolean;
    //페이지를 넘길때 그림자의 투명도값 (기본값 1 , 0 ~ 1)
    maxShadowOpacity?: number;
    mobileScrollSupport?: boolean;// 모바일 장치에서 스크롤로 넘길 것이냐
}
const myData = [
    {
        // image: "images/wicked.jpg",
        movieimg: "images/wicked.jpg",
        summary: "최고의 명작! \n시간 가는 줄 모르고 봤어요",
        review: "개인적으로 위키드 캐릭터들의 매력은 히스테리에서 나온다고 생각해서...\n어설픈 글린다 연기가 꽤나 \n매력적으로 느껴졌다.",
        title: "위키드: 포 굿"
    },
    {
        // image: "images/toy3.jpg",
        movieimg: "images/toy3.jpg",
        summary: "재밌습니다 아주아주!",
        review: "어릴 때 봤을 때랑 지금 봤을 때\n느낌이 전혀 다른 영화.",
        title: "토이스토리 3"
    },
    {
        // image: "images/poster3.jpg",
        movieimg: "images/poster3.jpg",
        summary: "summary",
        review: "review...",
        title: "title"
    },
    {
        // image: "images/poster4.jpg",
        movieimg: "images/poster4.jpg",
        summary: "summary",
        review: "review...",
        title: "title"
    },
    {
        // image: "images/poster5.jpg",
        movieimg: "images/poster5.jpg",
        summary: "summary",
        review: "review...",
        title: "title"
    }
]


const Diary: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h2>Diary</h2>
            <div style={{
                width: '620px', margin: '20px auto',
                overflow: 'hidden', borderRadius: '10px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
            }}>
                {/* usePortrait={true} : 모바일에서 화면이 작으면 책이 한장(반응형웹) 
              {...({ style: {}, usePortrait: true } as any)} 
              기존의 스타일 인터페이스에 동적으로 추가 하기  
             */}
                <HTMLFlipBook width={300} height={400}
                    showCover={true}
                    {...({ style: {}, usePortrait: true } as any)}
                    autoSize={true} mobileScrollSupport={true}
                    maxShadowOpacity={0.2} usePortrait={true}
                    style={{ borderRadius: '10px' }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#faf7f2',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '30px',
                            boxSizing: 'border-box'
                        }}
                    >
                        <h1 style={{ marginBottom: '10px' }}>Movie Diary</h1>
                        <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '20px' }}>
                            User의 영화 기록
                        </p>
                        <p style={{ marginTop: '220px', fontSize: '13px' }}>
                            Next page →
                        </p>
                    </div>

                    {/* myData에서 flatMap 사용해서 데이터를 반복 배치하기 
                1. 즉시 실행함수 를 선언한다.(function(){})()
                ,(() => ))()
                HTMLFlipBook 에 데이터를 배치한다.
            */}
                    {
                        (() => myData.flatMap((entry, idx) => [
                            //이미지 페이지
                            // <div key={`img-${idx}`} style={{
                            //     width: '100%',
                            //     height: '100%',
                            //     backgroundColor: '#fff',
                            //     display: 'flex',
                            //     justifyContent: 'center',
                            //     alignItems: 'center',
                            //     overflow: 'hidden',
                            // }}>

                            //     <img src={entry.image} alt={`Diary Image ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            // </div>,

                            //텍스트 페이지
                            <div key={`txt-${idx}`}
                                style={{ width: '100%', height: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', padding: '20px', boxSizing: 'border-box', }}>

                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>

                                    <img src={entry.movieimg} alt="movie" style={{ width: '120px', height: '160px', objectFit: 'cover', borderRadius: '8px', marginRight: '10px', marginTop: '20px', marginLeft: '20px' }} />

                                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', textAlign: 'left' }}> {entry.title} </h3>
                                </div>
                                <div
                                    style={{
                                        textAlign: "left",
                                        borderRadius: '10px',
                                        padding: '15px',
                                        marginTop: '10px', marginLeft: '5px', marginRight: '5px',
                                    }} >
                                    <p style={{ fontWeight: "bold", whiteSpace: 'pre-line' }}>
                                        {entry.summary}
                                    </p>
                                    <p style={{ whiteSpace: 'pre-line', fontSize: '15px', lineHeight: '1.5', textAlign: 'left', margin: 0 }}> {entry.review} </p>

                                </div>
                            </div>

                        ]))()

                    }
                </HTMLFlipBook>
            </div>
        </div>
    )
}

export default Diary