import {
  DetailParagraph,
  Horizon,
  SecondHead,
} from '@shared/components/styles/Public.styles';

export function RequestByPostKeyInfo({ Post }) {
  return (
    <div className="mb-4">
      <SecondHead>응답 현황</SecondHead>
      <Horizon />
      {Post.map(res => {
        const imageLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${res.image_id[0]}.jpg`;
        return (
          <>
            <div className="mt-2 grid grid-cols-4">
              <div>
                <img
                  src={imageLink}
                  className="object-cover s-23 h-13 rounded-lg rounded-lg"
                  alt="request post image"
                />
              </div>
              <div className="ml-2 col-span-3">
                <SecondHead>{res.title}</SecondHead>

                <DetailParagraph>호스트:</DetailParagraph>
                <DetailParagraph>
                  비용: {priceToString(res.price)}
                </DetailParagraph>
                <DetailParagraph>
                  위치: {res.city + ' ' + res.gu + ' ' + res.dong}
                </DetailParagraph>
                <NormalButton>메세지 보내기</NormalButton>
              </div>
            </div>
            <Horizon className="mt-2" />
          </>
        );
      })}
    </div>
  );
}
