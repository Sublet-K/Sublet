import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TestDB = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TEST_BACKEND_URL}/test/dblist`,
    );
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data.map((ele, i) => {
        return (
          <>
            <Link key={i} to={`/test/db/${ele}`}>
              {ele}
            </Link>
            <br />
          </>
        );
      })}
    </div>
  );
};

export default TestDB;
