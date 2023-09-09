const { Client } = require('@elastic/elasticsearch');
const ELASTIC_URI = process.env.ELASTIC_URI;
const client = new Client({
  node: ELASTIC_URI,
});

// import { setCookie, hasCookie, getCookie } from 'cookies-next';
import { cache } from 'react';

import { cookies } from 'next/headers';

export const preload = async () => {
  void (await getHomeData());
};

export const getHomeData = cache(async () => {
  const result = await client.search(
    {
      index: 'products',
      from: 0,
      size: 40,
      query: {
        function_score: {
          functions: [
            {
              random_score: {},
            },
          ],
          boost_mode: 'replace',
        },
      },
    },
    {
      asStream: false,
    }
  );
  let total_count = result.hits.total.value;
  let count = 0;

  if (total_count > 0) {
    count = parseInt(total_count / 40);
  }

  const data = {
    isSuccess: true,
    message: 'succesfully',
    statusCode: 200,
    data: {
      products: result.hits.hits,
      count: count,
      total_count: total_count,
    },
  };

  return data;
});

export const getProductsData = cache(async (q, p) => {
  let limit = 40;
  let skip = 0;
  let queryObject = {};
  let filter = [];
  if (p > 0) {
    skip = parseInt(p);
    skip = (skip - 1) * limit;
  }
 
 

 
  if (cookies().get('c')) {
    let ids = JSON.parse(cookies().get('c').value);
    let certification_ids = [];
    ids.length > 0 &&
    ids.forEach((element) => {
        certification_ids.push(element.id);
      });
    
      certification_ids.length > 0 &&
    filter.push({
      terms: {
        certification_ids
      },
    });
  }

  if (cookies().get('m')) {
    let manufacturers = JSON.parse(cookies().get('m').value);
    let m_id = [];
    manufacturers.length > 0 &&
    manufacturers.forEach((element) => {
        m_id.push(element.id);
      }); 
      m_id.length > 0 &&
    filter.push({
      terms: {
        m_id,
      },
    });
  }

  if (cookies().get('d')) {
    let divisions = JSON.parse(cookies().get('d').value);
    let division_ids = [];
    divisions.forEach((element) => {
      division_ids.push(element.id);
    });
    division_ids.length > 0 &&
    filter.push({
      terms: {
        division_ids,
      },
    });
  }

  if (cookies().get('a')) {
    let astms = JSON.parse(cookies().get('a').value);
    let astm_ids = [];
    astms.forEach((element) => {
      astm_ids.push(element._id);
    }); 
    astm_ids.length > 0 &&
    filter.push({
      terms: {
        astm_ids,
      },
    });
  }

  queryObject = {
    bool: {
      must: {
        match_all: {},
      },
      filter,
    },
  };

 
 
  if (q) {
    queryObject = {
      multi_match: {
        query: q.toLowerCase(),
        fields: [
          '_id',
          'info',
          'name',
          'divisions',
          'certifications',
          'first_name',
          'last_name',
          'company_name',
        ],
      },
    };
  }
 
  const result = await client.search(
    {
      index: 'products',
      from: skip,
      size: limit,
      query: queryObject,
    },
    {
      asStream: false,
    }
  );
 

  let total_count = result.hits.total.value;
  let count = 0;

  if (total_count > 0) {
    count = parseInt(total_count / limit);
  }

  const data = {
    isSuccess: true,
    message: 'succesfully',
    statusCode: 200,
    data: {
      products: result.hits.hits,
      count: count,
      total_count: total_count,
    },
  };

  return data;
});
 
