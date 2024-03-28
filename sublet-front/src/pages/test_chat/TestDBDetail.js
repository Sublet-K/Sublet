import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const JsonDisplay = ({ json }) => {
  return (
    <div>
      {json ? (
        Object.keys(json).map((ele, i) => {
          return (
            <>
              <span key={i}>{'[' + ele + ': ' + json[ele] + ']'}</span>
              <br />
            </>
          );
        })
      ) : (
        <span></span>
      )}
    </div>
  );
};

const TestDBDetail = () => {
  const [data, setData] = useState([]);

  const { name } = useParams();

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TEST_BACKEND_URL}/test/db/${name}`,
    );
    const data = await res.json();
    setData(data);
  };

  const deleteData = async id => {
    await fetch(
      `${process.env.NEXT_PUBLIC_TEST_BACKEND_URL}/test/db/${name}/${id}`,
      {
        method: 'DELETE',
      },
    );
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ul>
      {data.map((ele, i) => {
        return (
          <li key={i}>
            <JsonDisplay json={ele}></JsonDisplay>
            <button
              onClick={() => {
                deleteData(ele.id);
              }}>
              Delete!
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TestDBDetail;
