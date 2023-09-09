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
import { getAstm } from '@/app/utils/libs/filters';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Astm() {
  const [data, setData] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getAstm().then((res) => {
      console.log(res);
      setData(res.data.data);
    });
  }, []);

  return (
    <>
      {/* {data.length > 0 && (
        <Autocomplete
          className="w-full"
          multiple
          id="Astm"
          options={data}
          defaultValue={getCookie('a') ? JSON.parse(getCookie('a')) : []}
          filterSelectedOptions
          onChange={(e, value) => {
            console.log(pathname);
            pathname !== '/pages/products' && router.push('/pages/products');
            setCookie('a', value);
            pathname === '/pages/products' && router.refresh();
          }}
          getOptionLabel={(option) => option._id}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option._id}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Astm" placeholder="Astm" />
          )}
        />
      )} */}
    </>
  );
}
