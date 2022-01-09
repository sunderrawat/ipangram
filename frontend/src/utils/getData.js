import getCookie from './getCookie';
import apiUrl from './../apiUrl';

async function getData(url) {
  let token = getCookie('token');
  const res = await fetch(`${apiUrl}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    // console.log(res);
    return 'error';
  }
  const data = await res.json();
//   console.log(data);
  return data;
}

export default getData;
