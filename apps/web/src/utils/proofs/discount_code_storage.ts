import { db } from 'apps/web/src/utils/datastores/rds';

const publicTableName = 'public.basenames_discount_codes';

export async function getDiscountCode(code: string) {
  let query = db.selectFrom(publicTableName).where('code', 'ilike', code);
  return query.selectAll().limit(1).execute();
}

export async function incrementDiscountCodeUsage(code: string) {
  const tableName = publicTableName;

  // Perform the update and return the updated row in a single query
  const result = await db
    .updateTable(tableName)
    .set((eb) => ({
      usage_count: eb('usage_count', '+', 1),
    }))
    .where('code', 'ilike', code)
    .executeTakeFirst();

  return result;
}
