export const SaveSubletImage = ({ image_id }) => {
  return (
    <img
      alt="Room"
      className="h-20 w-20 rounded-lg"
      height="80"
      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${image_id}.jpg`}
      style={{
        aspectRatio: '80/80',
        objectFit: 'cover',
      }}
      width="80"
    />
  );
};
