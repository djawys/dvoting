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
import { getCertificate } from '@/app/utils/libs/filters';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Certificate() {
  const [data, setData] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getCertificate().then((res) => {
      setData(res.data.data);
    });
  }, []);

  return (
    <>
      {/* {data.length > 0 && (
        <Autocomplete
          className="w-full"
          multiple
          id="Certificate"
          options={data}
          defaultValue={getCookie('c') ? JSON.parse(getCookie('c')) : []}
          filterSelectedOptions
          onChange={(e, value) => {
            console.log(pathname);
            pathname !== '/pages/products' && router.push('/pages/products');
            setCookie('c', value);
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
            <TextField
              {...params}
              label="Certificate"
              placeholder="Certificate"
            />
          )}
        />
      )} */}
    </>
  );
}
