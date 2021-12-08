
const advancedResults = (query, reqQuery) => {
  // Select fields
  if (reqQuery.select) {
    const fields = reqQuery.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (reqQuery.sort) {
    const sortBy = reqQuery.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt')
  }

  // Pagination
  const page = parseInt(reqQuery.page, 10) || 1;
  const limit = parseInt(reqQuery.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  query = query.skip(startIndex).limit(limit);

  const result = {
    query,
    page,
    limit
  }

  return result;
}

module.exports = advancedResults