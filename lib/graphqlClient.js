import { request } from "graphql-request";

const MAX_intentos = 5;
const retraso = 1000;

export async function graphqlQuery(query) {
  let intentos = 0;

  while (intentos < MAX_intentos) {
    try {
      const data = await request({
        url: process.env.CMS_BASE + process.env.GRAPHQL_BASE,
        document: query
      });

      return data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log(`Recibimos error 429. Reintentamos en ${retraso}ms...`);
        await new Promise(resolve => setTimeout(resolve, retraso));
        intentos++;
      } else {
        throw error;
      }
    }
  }

  throw new Error(`Fallido despues de ${MAX_intentos} intentos`);
}
