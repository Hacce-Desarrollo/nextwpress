import {GraphQLClient} from "graphql-request";

const MAX_intentos = 100;
const retraso = 1000;

export async function graphqlQuery( query ){
  let intentos = 0;
  const endpoint = `${process.env.CMS_BASE}${process.env.GRAPHQL_BASE}`;
  const username = process.env.HTPASSWD_USER;
  const password = process.env.HTPASSWD_PASS;
  const credentials = Buffer.from(`${username}:${password}`).toString('base64');
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  });


  while (intentos < MAX_intentos) {
    try {
      const data = await client.request(query);

      return data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        await new Promise(resolve => setTimeout(resolve, retraso));
        intentos++;
      } else {
        throw error;
      }
    }
  }

  throw new Error(`Fallido despues de ${MAX_intentos} intentos`);
}
