
import { Topic } from 'types/topics';
import axios from 'utils/axios';

// import { Topics, ProductsFilter } from 'types/e-commerce';

// ⬇️ this is the loader for the detail route
export async function loader() {
  try {
    //const response = await axios.get('/api/products/list');
    //return response.data.products as Products[];
    return [{
      "id": "ffe891d5-5cc6-4b01-9d4c-9b58781344a8",
      "solicitationId": "\"018c3998-833d-4615-8820-0b707db9d738\"",
      "topicId": null,
      "title": "test",
      "number": "123",
      "product_req_doc": null,
      "tech_spec": null,
      "proposal": null,
      "presentation": null,
      "status": null,
      "isDeleted": false,
      "createdDate": "2024-07-08T02:21:50.407Z",
      "updatedDate": "2024-07-08T02:21:50.407Z",
      "createdBy": null,
      "updatedBy": null
    }] as unknown as Topic[];
  } catch (error) {
    return error;
  }
}

// export async function filterProducts(filter: ProductsFilter) {
//   return await axios.post('/api/products/filter', { filter });
// }

// export async function productLoader({ params }: any) {
//   try {
//     const response = await axios.post('/api/product/details', { id: params.id });
//     return response.data as Products;
//   } catch (error) {
//     return error;
//   }
// }
