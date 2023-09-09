'use client';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { setCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import { usePathname } from 'next/navigation';
import { getDivision } from '@/lib/api/filters';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Division() {
  const [data, setData] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getDivision().then((res) => {
      setData(res.data.data);
    });
  }, []);

  return (
    <>
      {data.length > 0 && (
        <Autocomplete
          className="w-full"
          multiple
          id="Division"
          options={data}
          defaultValue={getCookie('d') ? JSON.parse(getCookie('d')) : []}
          filterSelectedOptions
          onChange={(e, value) => {
            console.log(pathname);
            pathname !== '/products' && router.push('/products');
            setCookie('d', value);
            pathname === '/products' && router.refresh();
          }}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label="Division" placeholder="Division" />
          )}
        />
      )}
    </>
  );
}
