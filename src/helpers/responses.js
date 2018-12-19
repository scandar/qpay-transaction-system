
const success = (data = [], message = 'success', code = 200) => ({ status: { code, message }, data });

const fail = (errors = [], message = 'failed', code = 400) => ({ status: { code, message }, errors });

export { success, fail };
